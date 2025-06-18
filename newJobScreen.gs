function jobCreationCard(e) {
  try {
    const client = getSavedClient();
    const card = CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("Create New Job"));

    const section = CardService.newCardSection()
      .addWidget(CardService.newTextInput()
        .setFieldName("jobTitle")
        .setTitle("Job Title"))
      .addWidget(CardService.newTextInput()
        .setFieldName("jobDescription")
        .setTitle("Job Description"));

    if (client.properties) {
      const propertyDropdown = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setTitle("Select Property")
        .setFieldName("propertyId");

      client.properties.forEach(property => {
        const address = property.address;
        const displayAddress = `${address.street || ''}, ${address.city || ''}`;
        propertyDropdown.addItem(displayAddress, property.id, false);
      });

      section.addWidget(propertyDropdown);
    }

    const createAction = CardService.newAction()
      .setFunctionName("createNewJob")
      .setParameters({
        clientId: client.id,
      });

    section.addWidget(CardService.newTextButton()
      .setText("Save Job")
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
      .setOnClickAction(createAction));

    card.addSection(section);

    return card.build();

  } catch (error) {
    Logger.log("Error in jobCreationCard: " + error);
    return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("❌ Error"))
      .addSection(CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText("An error occurred while building the Job Creation card."))
        .addWidget(CardService.newTextParagraph().setText(`<i>${error.message}</i>`)))
      .build();
  }
}
