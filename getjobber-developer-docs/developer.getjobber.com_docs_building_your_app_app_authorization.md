---
url: "https://developer.getjobber.com/docs/building_your_app/app_authorization"
title: "Jobber's Developer Center"
---


# App Authorization (OAuth 2.0)

Jobber uses OAuth 2.0 to authorize an app's access to a Jobber user's account.

OAuth 2.0 is an authorization framework. It provides authorization flows for web
applications, desktop applications, and mobile devices. Some apps that use OAuth
are Facebook, GitHub, and Jobber.

OAuth 2.0 gives applications limited access to user accounts on an HTTP service.
It delegates user authentication to the service that hosts the user's account.
It then authorizes third-party apps to access the user's account.

## [oauth 20 roles permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#oauth-20-roles) OAuth 2.0 Roles

OAuth 2.0 defines four roles:

- Resource Owner
- Client
- Resource Server
- Authorization Server

### [the resource owner is a user permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#the-resource-owner-is-a-user) The Resource Owner is a User

The resource owner is the Jobber admin user who authorizes your application to
access their Jobber Account. The application is granted an access level
corresponding to the scopes specified when the app was created.

### [the client is an application permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#the-client-is-an-application) The Client is an Application

The client is the app that you want to give access to the user’s Jobber account.
Two things must happen before the client gains access:

- The API must authenticate the user
- The user must authorize the client

### [the resource  authorization server is the api permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#the-resource--authorization-server-is-the-api) The Resource & Authorization Server is the API

The resource server hosts the protected user accounts. The authorization server
verifies the identity of the user and gives access tokens to the client.
Jobber’s API fulfills both the resource and authorization server roles. We will
refer to both of these roles combined, as the Service or API role.

## [oauth 20 protocol flow permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#oauth-20-protocol-flow) OAuth 2.0 Protocol Flow

1. The client requests authorization from the user.
2. The client receives an authorization grant from the authorization server.
3. The client requests an access token from the authorization server. It
presents authentication of its own identity. The client also presents the
authorization grant.
4. The authorization server issues an access token and refresh token to the
client.
5. The client requests resource from the resource server. It presents access
token for authentication.
6. The resource server serves the resource to the client.
7. If the access token expires, the client requests a new one. (See below
refresh token flow)

## [client id and client secret permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#client-id-and-client-secret) Client ID and Client Secret

After you [add your app](https://developer.getjobber.com/apps), Jobber will give you a client identifier and a
client secret. The client ID is a publicly exposed string. Jobber uses it to
identify the application. It's also used to build authorization URLs that are
presented to users.

Jobber uses the client secret to authenticate the identity of the application.
You must keep it private between the application and the API.

## [authorization grant permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#authorization-grant) Authorization Grant

In the Protocol Flow above, the first four steps cover obtaining an
authorization grant and access token. Jobber implements the authorization code
grant type.

### [authorization code grant type permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#authorization-code-grant-type) Authorization Code Grant Type

The authorization code grant type is the most commonly used because it is
optimized for server-side applications, where source code is not publicly
exposed, and Client Secret confidentiality can be maintained. This is a
redirection-based flow, which means that the application must be capable of
interacting with the user-agent (i.e. the user's web browser) and receiving API
authorization codes that are routed through the user-agent.

### [authorization code flow permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#authorization-code-flow) Authorization Code Flow

#### [step 1 authorization code link permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#step-1-authorization-code-link) Step 1: Authorization Code Link

There are two ways for the Authorization Code Flow to begin. Either the Jobber
admin user clicks on the `Connect` button from the app listing in Jobber's App
Marketplace, or the admin user accesses an authorization link of the form:

```
https://api.getjobber.com/api/oauth/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<CALLBACK_URL>&state=<STATE>

```

Here is an explanation of the authorization link components:

- `https://api.getjobber.com/api/oauth/authorize` is the API authorization
endpoint
- `<CLIENT_ID>` is where the app inserts its Client ID value that can be looked
up from the Developer Center

  - This is how the API identifies the app
- `<CALLBACK_URL>` is where Jobber will redirect the user immediately after the
authorization code is granted

  - This is set by the developer in the Developer Center and must be URL encoded
- `<STATE>` is a random string that the client has the option of generating so
that it's possible to confirm that the same `<STATE>` string is returned with
the granted authorization code (see Step 3)

  - When the authorization flow is started from Jobber's App Marketplace, there
    is no `<STATE>` string provided

#### [step 2 user authorizes application permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#step-2-user-authorizes-application) Step 2: User Authorizes Application

When the user clicks the link above or clicks on the `Connect` button from
Jobber's App Marketplace, they will be prompted to authorize the scopes of the
app (as configured in the Developer Center) and they must click on the
`Allow Access` button to proceed. If the user was not already logged in to their
Jobber account in the current browser, then they will first be prompted to log
in before seeing the screen below:

[![OAuth screen](https://developer.getjobber.com/static/efea48cad6c9089ef60bd39fe9672f83/e5715/oauth-allow-access.png)](https://developer.getjobber.com/static/efea48cad6c9089ef60bd39fe9672f83/e5715/oauth-allow-access.png)

#### [step 3 application receives authorization code permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#step-3-application-receives-authorization-code) Step 3: Application Receives Authorization Code

If the user chooses to approve the access request, Jobber redirects the
user-agent to your application's redirect URI, along with an authorization code.
The redirect would look something like this (assuming the application is
"yourapplication.com"):

`https://yourapplication.com/callback?code=AUTHORIZATION_CODE&state=STATE`

At this point the client should check that the state parameter matches the value
set in step 1 (if applicable).

If the user chooses to deny the access request, Jobber redirects the user-agent
to your application's redirect URI with no additional parameters:

`https://yourapplication.com/callback`

#### [step 4 application requests access token permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#step-4-application-requests-access-token) Step 4: Application Requests Access Token

The application requests an access token from the API, by passing the
authorization code along with authentication details, including the client
secret, to the API token endpoint. Your application must use HTTPS, rather than
HTTP, for this request. Here is an example POST request to Jobber's token
endpoint:

```
POST /api/oauth/token HTTP/1.1
Host: api.getjobber.com
Content-Type: application/x-www-form-urlencoded

client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=REDIRECT_URI

```

The result will look something like

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ...MH0.FAz4g5Q-UugrsjU4OuSB0PwHXDqsxcc-mRa4BW2lNJw",
  "refresh_token": "5dd9bed1bd99b837cd3acaf2f59fb8fa"
}

```

This example does not contain a complete access token. The actual access token
contains three components:

```
encodeBase64(header) + '.' +
encodeBase64(payload) + '.' +
encodeBase64(signature)

```

where the payload may be of interest as it contains an `exp` value that encodes
the expiry time of the token. These are standard [JWT tokens](https://jwt.io/)
with signatures that are only verifiable by Jobber.

#### [step 5 application receives access token permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#step-5-application-receives-access-token) Step 5: Application Receives Access Token

If the authorization is valid, the API will return a JSON response containing
the "access\_token" and a "refresh\_token" to your app.

Your app is now authorized. It may use the access token to make
[GraphQL queries or mutations](https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations/)
against Jobber's API. It is highly recommended to use the `account` query to
collect the account name and id for easier tracking of which Jobber account the
access token can be used for. This will also be important for tracking app
disconnects in the future.

The access token can continue to be used until it expires (default expiration
time is 60 minutes) or until the app is disconnected. The refresh token may be
used at any time to request a new access token.

## [refresh token flow permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#refresh-token-flow) Refresh Token Flow

After an access token expires, using it to make a request from the API will
result in a 401 "Invalid Token Error". At this point the refresh token can be
used to request a fresh access token from the authorization server. Note: You do
not need to wait for the access token to expire to use the refresh token. It may
be used at any time.

There are a few cases where the refresh token may expire:

- App is disconnected from the account via either:
  - Admin user disconnecting the app using the `Disconnect` button on the App
    Marketplace listing
  - `appDisconnect` mutation getting used
  - Automatic disconnection as a result of account churn, plan downgrade, or
    admin user deactivation
- Client Secret is rolled (note this cannot be done manually at this time)
- The app connection is re-authorized after a scope change
  - After [this process](https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app/) the
    new Authorization Code can be used to request a new access token and refresh
    token

If both the access and refresh token are expired for whatever reason, an admin user
will need to start the OAuth flow again. The app will prompt them to do so by
sending them to Jobber and redirecting back to the app's Callback URL.

Here is an example POST request to obtain a new access token via the refresh
token:

```
POST /api/oauth/token HTTP/1.1
Host: api.getjobber.com
Content-Type: application/x-www-form-urlencoded

client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=refresh_token&refresh_token=REFRESH_TOKEN

```

In return you will receive the access token and a refresh token. It is important
to note that when [Refresh Token Rotation](https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation)
is `OFF`, then the above POST request will return the same refresh token as before.
In this configuration, the refresh token is meant to be long-lived.

If Refresh Token Rotation is `ON`, then the returned refresh token will be a new
one every time. This new refresh token should always be saved, as it is the one
to be used on the next request for a fresh access token. The same refresh token
should never be sent to the API more than once in this Refresh Token Rotation
configuration.

## [example access token usage permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#example-access-token-usage) Example Access Token Usage

Once the application has an access token, it may use the token to access the
user's account via the API until the token expires or is revoked.Here is an
example of an API request using curl. Note that it includes the access token:

`curl -X POST -H "Authorization: Bearer ACCESS_TOKEN" "https://api.getjobber.com/api/graphql"`

Assuming the access token is valid, the API will process the request according
to its API specifications. If the access token is invalid, the API will return a
401 "invalid\_request" error.

## [handling app disconnects permalink](https://developer.getjobber.com/docs/building_your_app/app_authorization\#handling-app-disconnects) Handling App Disconnects

In order to be published in Jobber's App Marketplace, it is required that your
app properly handles disconnects. After a Jobber account connects to an app
(meaning the authorization code has been granted), there are two mechanisms for
the account to disconnect the app:

1. A Jobber admin user in the account clicks the `Disconnect` button from the app listing
page in Jobber's App Marketplace

   - This will immediately invalidate all Access and Refresh Tokens and will also trigger
     the `APP_DISCONNECT` webhook for that account
   - As part of the [App Review Process](https://developer.getjobber.com/docs/publishing_your_app/app_review_process/),
     Jobber will always confirm that an app is subscribed and properly responding to this
     webhook before publishing in the App Marketplace

     - If your software tool has an interface that indicates whether the app/integration
is connected or not, it is critical that the app appears as disconnected after this
webhook fires
2. A user disconnects the app/integration from another system outside of Jobber
   - If this workflow is supported, it is required that your app use the `appDisconnect`
     GraphQL mutation to notify Jobber that the account has been disconnected

     - This will ensure that the app properly shows as disconnected on the Jobber side
     - API Access and Refresh Tokens will also be invalidated using this process

See below for an example of using the `appDisconnect` mutation:

```
  mutation Disconnect {
    appDisconnect {
    app {
        name
        author
    }
    userErrors {
        message
    }
  }
}

```