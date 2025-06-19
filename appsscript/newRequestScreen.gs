function newRequestCard(e) {
  try {
    const client = getSavedClient();

    const card = CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("Create New Request"));

    const section = CardService.newCardSection()
      .addWidget(CardService.newTextInput()
        .setFieldName("requestTitle")
        .setTitle("Request Title"));

    const createAction = CardService.newAction()
      .setFunctionName("createNewRequest")
      .setParameters({
        clientId: client.id,
      });

    section.addWidget(CardService.newTextButton()
      .setText("Save Request")
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
      .setOnClickAction(createAction));

    card.addSection(section);

    return card.build();

  } catch (error) {
    Logger.log("Error in newRequestCard: " + error);

    return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle("❌ Error"))
      .addSection(CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText("An error occurred while building the Request Creation card."))
        .addWidget(CardService.newTextParagraph()
          .setText(`<i>${error.message}</i>`)))
      .build();
  }
}

