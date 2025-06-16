---
url: "https://developer.getjobber.com/docs/custom_integrations"
title: "Jobber's Developer Center"
---


# Custom Integrations

Jobber's current focus is on supporting integrations that will be launched in
Jobber's
[App Marketplace](https://apps.getjobber.com/app_marketplace).
Custom Integrations are only possible for specific, approved Jobber customers
(service providers) and developers. Custom Integrations are apps that connect to
one or more Jobber accounts and read or write data with a specific function that
is custom to the service provider's needs. Developers of these Custom
Integrations typically do not intend to publish these apps in Jobber's App
Marketplace.

## [limitations for custom integrations permalink](https://developer.getjobber.com/docs/custom_integrations\#limitations-for-custom-integrations) Limitations for Custom Integrations

Custom Integration apps utilize the same
[scopes](https://developer.getjobber.com/docs/getting_started/#2-create-your-first-app) and
[OAuth 2.0 flow](https://developer.getjobber.com/docs/building_your_app/app_authorization) as any other apps in
the Developer Center, and they can perform the same functionalities. These apps
can operate while in `Draft` state, but there are limitations to the number of
paying (non-tester) Jobber accounts that they can connect to. API access will be
blocked if an app in `Draft` state is detected connecting to more 5 paying
Jobber accounts. Approval must be granted from Jobber if a Custom Integration
app is to be connected with more than 5 accounts.

If you don't intend to get your app published in Jobber's App Marketplace and
there is no need to connect it to more than 5 paying Jobber accounts then the
app can remain in `Draft` state. Requesting an
[app review](https://developer.getjobber.com/docs/publishing_your_app/app_review_process/) will not be
required.