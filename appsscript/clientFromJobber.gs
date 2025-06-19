async function getClientsFromJobber(gmail, e) {
  const { senderEmail } = extractSenderInfo(e);
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const jobberToken = getSavedAccessToken();
  const baseUrl = scriptProps.BASE_URL;
  
  const params = {
    gmail: gmail,
    email: senderEmail,
    token: jobberToken
  };

  const options = {
    method: "post", // ✅ Use POST for JSON body — GET with payload doesn't work reliably
    contentType: "application/json",
    payload: JSON.stringify(params),
    muteHttpExceptions: true
  };

  const url = `${baseUrl}/checkExistingClient`;

  try {
    const response = UrlFetchApp.fetch(url, options);

    Logger.log("Response code: " + response.getResponseCode());
    Logger.log("Response body: " + response.getContentText());
    const responseCode = (response.getResponseCode()).toString();
    if (responseCode == "500" || responseCode == "401" || responseCode == "400") {
    await checkAuthentication(response.getContentText(), e); // optional
    }

    const responseData = JSON.parse(response.getContentText());

    if (responseData && typeof responseData === "object") {
      const clientData = {
        isExists: responseData.exists || false,
        existedClient: responseData.client || null // 🔁 match destructure style
      };
            // ✅ Save to CacheService if client exists
      if (clientData.isExists && clientData.existedClient) {
        CacheService.getUserCache().put("savedClient", JSON.stringify(clientData.existedClient), 21600);
        Logger.log("Client cached successfully.");
      }
      Logger.log("ClientDataExport:" + JSON.stringify(clientData));
      return clientData;
    }

    return { isExists: false, existedClient: null };

  } catch (err) {
    await checkAuthentication(err, e);
    console.error("check existing error", err);
    return { isExists: false, existedClient: null }; // fallback
  }
}