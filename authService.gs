/**
 * Attempts to access a non-Google API using a constructed service
 * object.
 *
 * If your add-on needs access to non-Google APIs that require OAuth,
 * you need to implement this method. You can use the OAuth1 and
 * OAuth2 Apps Script libraries to help implement it.
 *
 * @param {String} url         The URL to access.
 * @param {String} method_opt  The HTTP method. Defaults to GET.
 * @param {Object} headers_opt The HTTP headers. Defaults to an empty
 *                             object. The Authorization field is added
 *                             to the headers in this method.
 * @return {HttpResponse} the result from the UrlFetchApp.fetch() call.
 */
function accessProtectedResource(url, method_opt, headers_opt) {
  var service = getOAuthService();
  var maybeAuthorized = service.hasAccess();
  if (maybeAuthorized) {
    // A token is present, but it may be expired or invalid. Make a
    // request and check the response code to be sure.

    // Make the UrlFetch request and return the result.
    var accessToken = service.getAccessToken();
    var method = method_opt || 'get';
    var headers = headers_opt || {};
    headers['Authorization'] =
        Utilities.formatString('Bearer %s', accessToken);
    var resp = UrlFetchApp.fetch(url, {
      'headers': headers,
      'method' : method,
      'muteHttpExceptions': true, // Prevents thrown HTTP exceptions.
    });

    var code = resp.getResponseCode();
    if (code >= 200 && code < 300) {
      return resp.getContentText("utf-8"); // Success
    } else if (code == 401 || code == 403) {
       // Not fully authorized for this action.
       maybeAuthorized = false;
    } else {
       // Handle other response codes by logging them and throwing an
       // exception.
       console.error("Backend server error (%s): %s", code.toString(),
                     resp.getContentText("utf-8"));
       throw ("Backend server error: " + code);
    }
  }

  if (!maybeAuthorized) {
    // Invoke the authorization flow using the default authorization
    // prompt card.
    CardService.newAuthorizationException()
        .setAuthorizationUrl(service.getAuthorizationUrl())
        .setResourceDisplayName("Login to ....")
        .throwException();
  }
}

/**
 * Create a new OAuth service to facilitate accessing an API.
 * This example assumes there is a single service that the add-on needs to
 * access. Its name is used when persisting the authorized token, so ensure
 * it is unique within the scope of the property store. You must set the
 * client secret and client ID, which are obtained when registering your
 * add-on with the API.
 *
 * See the Apps Script OAuth2 Library documentation for more
 * information:
 *   https://github.com/googlesamples/apps-script-oauth2#1-create-the-oauth2-service
 *
 *  @return A configured OAuth2 service object.
 */
function getOAuthService() {
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  return OAuth2.createService('auth')
      .setAuthorizationBaseUrl('https://api.getjobber.com/api/oauth/authorize')
      .setTokenUrl('https://api.getjobber.com/api/oauth/token')
      .setClientId(scriptProps.GETJOBBER_CLIENT_ID)
      .setClientSecret(scriptProps.GETJOBBER_CLIENT_SECRET)
      .setScope('read write')
      .setCallbackFunction('authCallback')
      .setCache(CacheService.getUserCache())
      .setPropertyStore(PropertiesService.getUserProperties())
      .setParam('access_type', 'offline') // ✅ important
      .setParam('prompt', 'consent');     // ✅ forces refresh_token on every auth;
}

/**
 * Boilerplate code to determine if a request is authorized and returns
 * a corresponding HTML message. When the user completes the OAuth2 flow
 * on the service provider's website, this function is invoked from the
 * service. In order for authorization to succeed you must make sure that
 * the service knows how to call this function by setting the correct
 * redirect URL.
 *
 * The redirect URL to enter is:
 * https://script.google.com/macros/d/<Apps Script ID>/usercallback
 *
 * See the Apps Script OAuth2 Library documentation for more
 * information:
 *   https://github.com/googlesamples/apps-script-oauth2#1-create-the-oauth2-service
 *
 *  @param {Object} callbackRequest The request data received from the
 *                  callback function. Pass it to the service's
 *                  handleCallback() method to complete the
 *                  authorization process.
 *  @return {HtmlOutput} a success or denied HTML message to display to
 *          the user. Also sets a timer to close the window
 *          automatically.
 */
function authCallback(callbackRequest) {
  var service = getOAuthService();
  var authorized = service.handleCallback(callbackRequest);

  if (authorized) {
    var token = service.getAccessToken();
      const tokenInfo = service.getToken();
  Logger.log('Token Info: %s', JSON.stringify(tokenInfo));
    // Save to User Properties (or ScriptProperties if shared across users)
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('JOBBER_ACCESS_TOKEN', token);
    return HtmlService.createHtmlOutput(
      `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Authentication Successful!</h2>
        <p>You can now close this window.</p>
      </div>
     `
    );
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}

/**
 * Unauthorizes the non-Google service. This is useful for OAuth
 * development/testing.  Run this method (Run > resetOAuth in the script
 * editor) to reset OAuth to re-prompt the user for OAuth.
 */
function resetOAuth() {
  getOAuthService().reset();
}

/**
 * Load environment-specific configuration
 */
function getConfig() {
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const env = scriptProps.ENV || "dev"; // default to 'dev' if not set

  // Auto-detect keys and build env-based config
  const config = {};
  for (let key in scriptProps) {
    const prefix = env.toUpperCase() + "_";
    if (key.startsWith(prefix)) {
      const configKey = key.replace(prefix, ""); // Strip ENV_ prefix
      config[configKey] = scriptProps[key];
    }
  }
  Logger.log("Config:" + JSON.stringify(config, null, 2));
  return config;
}
