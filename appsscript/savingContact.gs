async function onSaveContact(e) {
  // Validate event object
  if (!e?.parameters || !e?.formInput) {
    Logger.log("❌ Missing event object or required fields.");
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Internal error. Missing form data."))
      .build();
  }

  const scriptProps = PropertiesService.getScriptProperties().getProperties();
  const jobberToken = getSavedAccessToken();
  const baseUrl = scriptProps.BASE_URL;
  const { gmail } = e.parameters;
  const {
    contactFirstName,
    contactLastName = "",
    contactEmail,
    companyName = "",
    contactPhone = ""
  } = e.formInput;

  // Required fields check
  if (!contactFirstName || !contactEmail) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Please enter both name and email."))
      .build();
  }

  const payload = {
    gmail,
    firstName: contactFirstName,
    lastName: contactLastName,
    email: contactEmail,
    company: companyName,
    companyPhone: contactPhone,
    token: jobberToken
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  const url = `${baseUrl}/newclient`;

  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();

    Logger.log("✅ Response Code: " + responseCode);
    Logger.log("✅ Response Body: " + responseBody);

    checkAuthentication(response, e); // may throw

    if (responseCode !== 200) {
      return CardService.newActionResponseBuilder()
        .setNotification(CardService.newNotification().setText("❌ Failed to save contact."))
        .build();
    }

    const responseData = JSON.parse(responseBody);
    const clientData = responseData.client;

    if (clientData) {
      // Save client in cache for 6 hours
      CacheService.getUserCache().put("savedClient", JSON.stringify(clientData), 21600);
      Logger.log("✅ Cached Client: " + getSavedClient());
    }

    const updatedCard = await propertyAddressCard(e);
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(updatedCard))
      .setNotification(CardService.newNotification().setText("✔️ Client created successfully!"))
      .build();

  } catch (err) {
    checkAuthentication(err, e);
    Logger.log("❌ Exception caught: " + err.toString());

    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("❌ Error while saving contact."))
      .build();
  }
}

