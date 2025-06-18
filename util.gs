function sessionGmail() {
    const gmail = Session.getActiveUser().getEmail();
  return gmail;
}


function getSavedAccessToken() {
  var token = PropertiesService.getUserProperties().getProperty('JOBBER_ACCESS_TOKEN');
  Logger.log(token);
  return token;
}

function pad(str, length) {
  str = str || "";
  while (str.length < length) {
    str += " ";
  }
  return str;
}


function logout(e) {
  var service = getOAuthService();
  service.reset();
  PropertiesService.getUserProperties().deleteProperty('JOBBER_ACCESS_TOKEN');

  const homepageState = new Date().getTime().toString(); // forces new state

  const nav = CardService.newNavigation()
    .popToRoot()
    .pushCard(buildHomepage({ parameters: { state: homepageState } }));

  return CardService.newActionResponseBuilder()
    .setNavigation(nav)
    .setNotification(CardService.newNotification().setText("🔒 Logged out successfully."))
    .build();
}


async function checkAuthentication (err, e) {
  const errorStr = err.toString(); // Ensure it's a string
  if (errorStr.includes("Not authenticated") || errorStr.includes("401 Unauthorized")) {
    var service = getOAuthService();
    service.reset();
    logout(); // Optional: Clear any local cache or session data

    // Rebuild the card with the login button
    var cards = await buildAddOn(e);
    var card = cards[0];

    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText("🔒 Login Expired. Please login again."))
      .setNavigation(CardService.newNavigation().updateCard(card))
      .build();
  }
}


function checkAuth(e) {
  var service = getOAuthService();

  if (!service.hasAccess()) {
    return CardService.newAuthorizationException()
      .setAuthorizationUrl(service.getAuthorizationUrl())
      .setResourceDisplayName("GetJobber");
  }

  // Determine if it's the homepage or a contextual message
  var isHomepage = !(e && e.messageMetadata && e.messageMetadata.messageId);

  var newCard = isHomepage ? buildHomepage() : buildAddOn(e)[0];

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(newCard))
    .build();
}


function extractSenderInfo(e) {
  let senderName = "";
  let senderEmail = "";
  let signedBy = "";

  try {
    if (e && e.messageMetadata && e.messageMetadata.messageId) {
      const messageId = e.messageMetadata.messageId;
      const message = GmailApp.getMessageById(messageId);
      const from = message.getFrom();
      const match = from.match(/(.*)<(.+)>/);

      if (match) {
        senderName = match[1].trim();
        senderEmail = match[2].trim();
      } else {
        senderEmail = from.trim();
      }

      const rawMsg = Gmail.Users.Messages.get('me', messageId, { format: 'full' });
      const headers = rawMsg.payload.headers;

      for (let i = 0; i < headers.length; i++) {
        const name = headers[i].name.toLowerCase();
        const value = headers[i].value;

        if (name === 'authentication-results') {
          const match1 = value.match(/dkim=\w+\s+\(.*?\)\s+header\.d=([^;\s]+)/i);
          if (match1 && match1[1]) {
            signedBy = match1[1];
          }
        } else if (name === 'dkim-signature' && !signedBy) {
          const match2 = value.match(/d=([^;\s]+)/i);
          if (match2 && match2[1]) {
            signedBy = match2[1];
          }
        }
      }
    }
  } catch (err) {
    console.error("extractSenderInfo error", err);
  }
  const nameParts = senderName.trim().split(" ");
  return {
    senderFirstName: nameParts[0] ?? "",
    senderLastName: nameParts.slice(1).join(" ") ?? "",
    senderName: senderName,
    senderEmail: senderEmail || "",
    senderPhone: "",
    signedBy: signedBy || "",
  };
}


function isStaleView() {
  var logoutTimestamp = PropertiesService.getUserProperties().getProperty('LOGOUT_TIMESTAMP');
  var lastRenderTimestamp = PropertiesService.getUserProperties().getProperty('CARD_RENDER_TIMESTAMP');

  if (!logoutTimestamp) return false;
  if (!lastRenderTimestamp) return true;

  return new Date(logoutTimestamp) > new Date(lastRenderTimestamp);
}

function updateRenderTimestamp() {
  PropertiesService.getUserProperties().setProperty('CARD_RENDER_TIMESTAMP', new Date().toISOString());
}

function buildErrorSection(message) {
  return CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText(message));
}

function setBackgroundColor() {
  return "#232B2F";
}