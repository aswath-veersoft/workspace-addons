---
url: "https://developer.getjobber.com/docs/getting_started"
title: "Jobber's Developer Center"
---

# Getting Started

## [terminology permalink](https://developer.getjobber.com/docs/getting_started\#terminology) Terminology

- **App/Application**: This is the software you are building that will
communicate with Jobber. Published apps are installed from Jobber's
[App Marketplace](https://apps.getjobber.com/app_marketplace) by connecting to
an existing Jobber account using OAuth 2.0 authorization from an admin user.
- **Jobber Account**: This is the company in Jobber that will Authorize your app
to have access to their data. A Jobber account can be comprised of many users.
- **User/Team Member**: An individual user belonging to a Jobber account
- **Developer**: An entity building an app. A developer can have many apps.

## [1 create a new jobber account to test with permalink](https://developer.getjobber.com/docs/getting_started\#1-create-a-new-jobber-account-to-test-with) 1\. Create a New Jobber Account To Test With

(This section can be skipped if you already have a Jobber account)

In order to test out Jobber's API and start building an app, you will need a
Jobber account. You will be able to create data in this Jobber account and test
our GraphQL API queries and mutations using the
[Make API Requests in GraphiQL](https://developer.getjobber.com/docs/getting_started/#5-make-api-requests-in-graphiql)
steps detailed below. It is important to note that your Jobber account is a
completely separate account from your
[Developer Center account](https://developer.getjobber.com/signup/).

For third-party app developers, there is a
**[developer testing signup link](https://getjobber.com/developer-sign-up/)**
that you can use to get a special type of Jobber account for app and integration
testing. If you have previously created a regular 14-day trial Jobber account,
it is also possible to get that converted to the special developer testing
account type by contacting our
[API support email](mailto:api-support@getjobber.com).

By default, the developer testing accounts in Jobber will have a trial period of
90 days. If you require longer than 90 days for building/testing your app then
you can also contact our [API support email](mailto:api-support@getjobber.com)
to have the access period extended.

## [2 invite your team permalink](https://developer.getjobber.com/docs/getting_started\#2-invite-your-team) 2\. Invite Your Team

Once you’ve set up your
[Developer Center account](https://developer.getjobber.com/signup/), you can
invite your development team to collaborate. Go to **Account > Settings** and
find the Team Members section.

[![Team Members section](https://developer.getjobber.com/static/ff3ef0c9f35ae8669543d8b5cf2ef262/8ad1b/settings-page-team-member-section.png)](https://developer.getjobber.com/static/ff3ef0c9f35ae8669543d8b5cf2ef262/8ad1b/settings-page-team-member-section.png)

Click **Invite Team Member**, then enter their name and email address. After
filling in these fields, click **Send Invite**. The recipient will receive an
email about their invitation. Invitations expire after 30 days.

All team members with
[Two Factor Authentication](https://developer.getjobber.com/settings/mfa_setup)
enabled have the same permissions to create and manage apps on the account. They
can also invite additional members to join the team.

## [3 create your first app permalink](https://developer.getjobber.com/docs/getting_started\#3-create-your-first-app) 3\. Create Your First App

In order to access the GraphQL Docs and Schema in
[GraphiQL](https://github.com/graphql/graphiql), you will first need to create
an app in the Developer Center. Any details about this app (e.g., Name or
Description) can be modified later. To create your first app, first sign in to
your Developer Center account and then navigate to the [apps](https://developer.getjobber.com/apps) page and
click on the 'NEW' button to create your first app.

When creating your app, you will be prompted for:

- **App name** (required)
- **Developer name** (required)
- **OAuth Callback URL** (optional)
- **Manage App URL** (optional)
- **App description** (required)
- **Features & benefits** (optional)
- **Scopes** (required)
- **App logo** (optional)
- **Gallery images** (optional)

Many of the fields above aren't required to create your first app, but will
eventually be required before you're able to submit your app for review.
`App name`, `Developer name`, `App description`, `Features & benefits`,
`App logo`, and `Gallery images` are all important pieces that'll make up the
content of your app listing in Jobber's App Marketplace.

The uploaded app logo file must be:

- .PNG or .SVG only
- 384x384 pixels or greater
- Maximum size 1 MB
- Perfectly square

The OAuth `Callback URL` (AKA redirect URI) is the URL that a Jobber user will
be redirected to immediately after connecting and authorizing access to your
app. More details can be found
[here](https://developer.getjobber.com/docs/building_your_app/app_authorization).

The `Manage App URL` is an alternative URL that can be used for any accounts
that have already connected your app, but will have a need for navigating back
to it to manage or configure functionalities. More details can be found
[here](https://developer.getjobber.com/docs/publishing_your_app/app_listing_details/#publishing-your-application-on-the-marketplace).

`Scopes` are where you can set exactly what kinds of data your app will be able
to read or write from Jobber accounts using the GraphQL API. They also determine
exactly what is shown on the OAuth screen when a Jobber user is connecting your
app (see screenshot below). While an app is in `Draft` state, the scopes can be
freely edited. However, if an app is published and would like to add more
scopes, all accounts that have connected the app previously will need to
re-authorize the app. More details can be found
[here](https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app).

## [4 app authorization flow permalink](https://developer.getjobber.com/docs/getting_started\#4-app-authorization-flow) 4\. App Authorization Flow

For a detailed breakdown of how Jobber's OAuth 2.0 system works to provide
Jobber admin user's the ability to approve certain apps to access their
account's data, see the
[App Authorization Guide](https://developer.getjobber.com/docs/building_your_app/app_authorization) in the
**Building Your App** section.

To help app developer's quickly get set up and start viewing/testing the API
endpoints, our Developer Center provides a quick and easy tool for handling the
OAuth 2.0 flow and getting an API access token for the Jobber account that you
are currently signed into in your browser. By following the steps in the **Make**
**API Requests in GraphiQL** section below, the `Test in GraphiQL` action will
take you to the `Allow Access` screen for your app and then automatically handle
the authorization code flow and redirect you to the GraphiQL tool with an API
access token that will be valid for 60 minutes.

[![Authorize screen](https://developer.getjobber.com/static/efea48cad6c9089ef60bd39fe9672f83/e5715/oauth-allow-access.png)](https://developer.getjobber.com/static/efea48cad6c9089ef60bd39fe9672f83/e5715/oauth-allow-access.png)

## [5 make api requests in graphiql permalink](https://developer.getjobber.com/docs/getting_started\#5-make-api-requests-in-graphiql) 5\. Make API Requests in GraphiQL

Before fully building out your app, you can view the GraphQL Schema/Docs and
make API requests using the GraphiQL tool, which will access data from your
tester Jobber account. To do this, click on the three dots next to your
[app](https://developer.getjobber.com/apps) in the Developer Center and then click `Test in GraphiQL`.

[![GraphiQL screen](https://developer.getjobber.com/static/3548d653273686713057d70803a6d441/0ec92/test-in-graphiql.png)](https://developer.getjobber.com/static/3548d653273686713057d70803a6d441/0ec92/test-in-graphiql.png)

This will take you through the same OAuth 2.0 flow that a regular Jobber admin
user would go through when first connecting an app, and afterwards you'll be
redirected to the GraphiQL tool where you can view the available queries and
mutations with the Docs icon at the top left. Note that the scopes on your app
will be respected and you may not be able to query for all of the data seen
within our schema. The temporary API access token used in this session can also
be viewed from the `Headers` section in GraphiQL. The
[API version number](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning) can also be edited
using the header variables.

[![GraphiQL Docs screen](https://developer.getjobber.com/static/47216eb99c24f5f42aaf6396e8e1ca4d/27b8e/graphiql-docs.png)](https://developer.getjobber.com/static/47216eb99c24f5f42aaf6396e8e1ca4d/27b8e/graphiql-docs.png)

An example query will already be provided for you, but a second example query
you could use to view the `id`, `jobNumber`, and `title` of every Job in your
tester account is:

```graphql
query SampleQuery {
  jobs {
    nodes {
      id
      jobNumber
      title
    }
  }
}

```

Alternatively, you can make API requests by posting your GraphQL query or
mutation to `https://api.getjobber.com/api/graphql`. You will need to include
the Access token from step 4 under the `Authorization` header, preceded with the
word `bearer`.

## [6 start building your app permalink](https://developer.getjobber.com/docs/getting_started\#6-start-building-your-app) 6\. Start Building Your App

For more details on how Jobber apps work and the processes around implementing,
testing, and submitting your app for review, see the guides in the
[Building Your App](https://developer.getjobber.com/docs/building_your_app/app_lifecycle) section. See the
[App Template Project](https://developer.getjobber.com/docs/app_template_project) section if you would like to
download and set up a working template app to start out with.