async function onSaveProperty(e) {

    if (!e || !e.parameters || !e.formInput) {
    Logger.log("Missing event object or required fields");
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Internal error. Missing form data."))
      .build();
  }
  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const jobberToken = getSavedAccessToken();
  const baseUrl = scriptProps.BASE_URL;
  const clientId = e.parameters.clientId;
  const gmail = e.parameters.gmail;
  const street1 = e.formInput.street1 || '';
  const street2 = e.formInput.street2 || '';
  const street = street1 + street2;
  const city = e.formInput.city || '';
  const state = e.formInput.state || '';
  const zipCode = e.formInput.zipCode || '';
  const country = e.formInput.country || '';

  const params = {
  gmail: gmail,
  clientId: clientId,
  address: {
      street1: street1,
      street2: street2,
      street: street,
      city: city,
      province: state,
      postalCode: zipCode,
      country: country,
  },
  token: jobberToken
};

const options = {
  method: "post",
  contentType: "application/json",
  payload: JSON.stringify(params)
};
  const url = `${baseUrl}/create-property`
  try {
    const response = UrlFetchApp.fetch(url, options);

    Logger.log("Response code: " + response.getResponseCode());
    Logger.log("Response body: " + response.getContentText());

    const checkAuth = checkAuthentication(response, e);
    if (response.getResponseCode() !== 200 ) {
            return CardService.newActionResponseBuilder()
        .setNotification(CardService.newNotification().setText("❌ Failed to save property address."))
        .build();
    }
    const updatedCard = await buildAddOn(e);
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(updatedCard[0]))
      .setNotification(CardService.newNotification().setText("✔️ Property address saved!"))
      .build();

  } catch (err) {

    const checkAuth = checkAuthentication(err, e);

    Logger.log("Exception caught: " + err.toString());
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Error while saving property address."))
      .build();
  }
}