async function createNewRequest(e) {
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const jobberToken = getSavedAccessToken();
  const baseUrl = scriptProps.BASE_URL;
  
  // Make sure propertyId is available from the form or parameters
  const params = {
    clientId: e.parameters.clientId,
    requestTitle: e.formInput.requestTitle,
    token: jobberToken
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(params),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(`${baseUrl}/create-request`, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      throw new Error(`Failed to create request: ${responseText}`);
    }

    const responseData = JSON.parse(responseText);
    
    if (!responseData.success) {
      throw new Error(responseData.error || 'Failed to create request');
    }
    const updatedCard = await buildAddOn(e);
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(updatedCard[0]))
      .setNotification(CardService.newNotification().setText("✔️ Request created successfully!"))
      .build();

  } catch (err) {
    Logger.log("Error creating job: " + err.toString());
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Error while creating request."))
      .build();
  }
}
