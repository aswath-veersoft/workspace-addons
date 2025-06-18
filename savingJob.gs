async function createNewJob(e) {
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const jobberToken = getSavedAccessToken();
  const baseUrl = scriptProps.BASE_URL;
  
  // Make sure propertyId is available from the form or parameters
  const params = {
    clientId: e.parameters.clientId,
    propertyId: e.formInput.propertyId, // This needs to be passed from the previous step
    jobTitle: e.formInput.jobTitle,
    jobDescription: e.formInput.jobDescription || '',
    token: jobberToken
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(params),
    muteHttpExceptions: true
  };

  try {
    if (!e.formInput.propertyId || !e.formInput.jobTitle) {
      return CardService.newActionResponseBuilder()
        .setNotification(CardService.newNotification().setText("❌ Required title and property address"))
        .build();
    }
    const response = UrlFetchApp.fetch(`${baseUrl}/create-job`, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      throw new Error(`Failed to create job: ${responseText}`);
    }

    const responseData = JSON.parse(responseText);
    
    if (!responseData.success) {
      throw new Error(responseData.error || 'Failed to create job');
    }

    const updatedCard = await buildAddOn(e);
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(updatedCard[0]))
      .setNotification(CardService.newNotification().setText("✔️ Job created successfully!"))
      .build();

  } catch (err) {
    Logger.log("Error creating job: " + err.toString());
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Error while creating job."))
      .build();
  }
}
