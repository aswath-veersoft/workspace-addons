function buildHomepage(e) {
  var cardBuilder= CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("GetJobber Dashboard"))
    .addSection(CardService.newCardSection().addWidget(
    CardService.newTextParagraph().setText("Welcome to the GetJobber Add-on Homepage!")
    ))
    var service = getOAuthService();
  if (!service.hasAccess() || isStaleView()) {
    var authSection = CardService.newCardSection();
    var loginAction = CardService.newAction().setFunctionName("checkAuth");
    var loginButton = CardService.newTextButton()
      .setText('Login to Jobber')
      .setOnClickAction(loginAction);
    authSection.addWidget(CardService.newButtonSet().addButton(loginButton));
    cardBuilder.addSection(authSection);
  } else {

        cardBuilder.addSection(CardService.newCardSection().addWidget(
        CardService.newTextParagraph().setText("You are successfully connected to GetJobber. Open a message and start creating new clients directly from your inbox. ")))
      }
  if (e && e.parameters && e.parameters.state) {
    Logger.log("Homepage state param: " + e.parameters.state);
  }
  return cardBuilder.build();
}


async function buildAddOn(e) {
  var service = getOAuthService();
  CacheService.getUserCache().remove("savedClient");
  var cardBuilder = CardService.newCardBuilder()
  var authSection = CardService.newCardSection();

  if (!service.hasAccess() || isStaleView()) {
    var loginAction = CardService.newAction().setFunctionName("checkAuth");
    var loginButton = CardService.newTextButton()
      .setText('Login to GetJobber')
      .setOnClickAction(loginAction);
    authSection.addWidget(CardService.newButtonSet().addButton(loginButton));
  } else {
    const contactSections = await buildContactDetailsSection(e);
    Logger.log("contactSections: " + JSON.stringify(contactSections));
    contactSections.forEach(section => {
      if (section && typeof section.addWidget === 'function') {
        cardBuilder.addSection(section);
      } else {
        Logger.log("Invalid section skipped: " + JSON.stringify(section));
      }
    });
    var logoutAction = CardService.newAction().setFunctionName("logout").setLoadIndicator(CardService.LoadIndicator.SPINNER);
    var logoutButton = CardService.newTextButton()
      .setText('Logout')
      .setOnClickAction(logoutAction);
    authSection.addWidget(CardService.newButtonSet().addButton(logoutButton));
  }

  cardBuilder.addSection(authSection);

updateRenderTimestamp();
  return [cardBuilder.build()];
}

// buildContactDetailsSection returns just a section (RECOMMENDED for your structure)
async function buildContactDetailsSection(e) {
  const gmail = sessionGmail();
  const { isExists, existedClient } = await getClientsFromJobber(gmail, e);
  const { senderName } = extractSenderInfo(e);
  Logger.log("buildContactDetailsSection isExists:" + isExists);
  Logger.log("buildContactDetailsSection ExistedClient:" + JSON.stringify(existedClient));
  if (isExists) {
    const { client, address, jobs, requests } = buildJobRepoSection(e, existedClient);
    const sections = [];
    if (client) sections.push(client);
    if (address) sections.push(address);
    if (jobs) sections.push(jobs);
    if (requests) sections.push(requests);
    
    Logger.log("Final contactSections: " + JSON.stringify(sections));
    return sections;
  } else {
      var contactInfoAction = CardService.newAction().setFunctionName("contactDetails").setLoadIndicator(CardService.LoadIndicator.SPINNER);
      var contactInfoButton = CardService.newTextButton()
      .setText('Add new client')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
      .setOnClickAction(contactInfoAction);
    const section = CardService.newCardSection()
      .setHeader("👤 New Client")
      .addWidget(CardService.newKeyValue()
        .setTopLabel("Name")
        .setContent(senderName || "Not provided")
        .setIcon(CardService.Icon.PERSON))
      .addWidget(CardService.newButtonSet().addButton(contactInfoButton));

    return [section]; // ✅ CardSection[]
  }
}





































