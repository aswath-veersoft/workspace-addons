function newClientSection(e) {
  const { senderFirstName, senderLastName, senderEmail, signedBy, senderPhone } = extractSenderInfo(e);
  const clientSection = CardService.newCardSection()
    .setHeader("👤 New Client")
    .addWidget(CardService.newTextInput().setFieldName("contactFirstName").setTitle("First Name").setValue(senderFirstName || ""))
    .addWidget(CardService.newTextInput().setFieldName("contactLastName").setTitle("Last Name").setValue(senderLastName || ""))
    .addWidget(CardService.newTextInput().setFieldName("companyName").setTitle("Company").setValue(signedBy || ""))
    .addWidget(CardService.newTextInput().setFieldName("contactEmail").setTitle("Email").setValue(senderEmail || ""))
    .addWidget(CardService.newTextInput().setFieldName("contactPhone").setTitle("Phone").setValue(senderPhone || ""))
  
  const saveAction = CardService.newAction()
    .setFunctionName("onSaveContact")

  const saveButton = CardService.newTextButton()
    .setText("➕ Save Client")
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
    .setOnClickAction(saveAction);

  clientSection.addWidget(saveButton);

  return { client: clientSection };
}