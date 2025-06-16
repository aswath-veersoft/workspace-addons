---
url: "https://developer.getjobber.com/docs/building_your_app/app_lifecycle"
title: "Jobber's Developer Center"
---

# Application Lifecycle

## [user connects your application permalink](https://developer.getjobber.com/docs/building_your_app/app_lifecycle\#user-connects-your-application) User Connects Your Application

When a new user connects to your application, they will trigger the
[OAuth flow](https://developer.getjobber.com/docs/building_your_app/app_authorization) on your end.

## [user disconnects your application permalink](https://developer.getjobber.com/docs/building_your_app/app_lifecycle\#user-disconnects-your-application) User Disconnects Your Application

When a user disconnects your application from their account, you will no longer
have access to their account.

If you try to run a query against a user which is no longer connected to your
app you will get the following error returned:

```
"User has disconnected this app from their account. Please delete this token"

```

It is possible to get notified when a user disconnects your application. Simply
subscribe to the [webhook](https://developer.getjobber.com/docs/using_jobbers_api/setting_up_webhooks):
`APP_DISCONNECT`.

The `accountId` can be gathered from this webhook and compared against the
`account` GraphQL query to determine the exact Jobber account that is
disconnecting from your application. The `account` query is available to all
apps regardless of their scopes.

## [forcefully removing a user permalink](https://developer.getjobber.com/docs/building_your_app/app_lifecycle\#forcefully-removing-a-user) Forcefully Removing a User

It is also possible to forcefully disconnect a user from your application. To
accomplish this, you use the GraphQL mutation: `appDisconnect`

## [service unavailable permalink](https://developer.getjobber.com/docs/building_your_app/app_lifecycle\#service-unavailable) Service Unavailable

In some cases, our GraphQL API service will be unavailable to your app. The
following error message will appear:

```
"Service temporarily unavailable"

```

When seeing this error message for prolonged durations, please contact
[support](mailto:api-support@getjobber.com).