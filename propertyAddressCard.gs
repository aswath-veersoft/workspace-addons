
async function propertyAddressCard(e) {
  try {
    const gmail = sessionGmail();
    const client = getSavedClient();
    Logger.log("One Client: " + JSON.stringify(getSavedClient()));

    const card = CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("🏠 Property Address"));

    // Create the country dropdown
    const countryDropdown = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.DROPDOWN)
      .setFieldName("country")
      .setTitle("Country");

    countries().forEach(function(name) {
      countryDropdown.addItem(name, name, false);
    });

    // Create the address section
    const addressSection = CardService.newCardSection()
      .addWidget(CardService.newTextInput().setFieldName("street1").setTitle("Address Line 1"))
      .addWidget(CardService.newTextInput().setFieldName("street2").setTitle("Address Line 2"))
      .addWidget(CardService.newTextInput().setFieldName("city").setTitle("City"))
      .addWidget(CardService.newTextInput().setFieldName("state").setTitle("Province"))
      .addWidget(CardService.newTextInput().setFieldName("zipCode").setTitle("Postal Code"))
      .addWidget(countryDropdown);

    // Save button with action
    const saveAction = CardService.newAction()
      .setFunctionName("onSaveProperty")
      .setParameters({
        clientId: client.id
      });

    const saveButton = CardService.newTextButton()
      .setText("➕ Save Property Address")
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
      .setOnClickAction(saveAction);

    addressSection.addWidget(saveButton);
    card.addSection(addressSection);

    return card.build();

  } catch (error) {
    Logger.log("Error in propertAddressCard: " + error.message);

    const errorCard = CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("❌ Error"))
      .addSection(CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText("Something went wrong while loading the Property Address form. Please try again.")))
      .build();

    return errorCard;
  }
}