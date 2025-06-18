function contactDetails(e) {
  const {client} = newClientSection(e);
  const card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Client Details"))
    .addSection(client)
    .build();

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().pushCard(card))
    .build();
}
