---
url: "https://developer.getjobber.com/docs/building_your_app/testing_your_app"
title: "Jobber's Developer Center"
---


# Testing Your Application

## [creating a jobber tester account permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#creating-a-jobber-tester-account) Creating a Jobber Tester Account

If you have not yet created a Jobber tester account, please see
[this section](https://developer.getjobber.com/docs/getting_started/#1-create-your-jobber-tester-account) for
more details.

## [linking your tester account to your app permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#linking-your-tester-account-to-your-app) Linking Your Tester Account to Your App

Allowing your app to access your test account's data is as simple as following
the OAuth flow outlined in
[Authorizing an App](https://developer.getjobber.com/docs/building_your_app/app_authorization).

## [testing your queriesmutations in graphiql permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#testing-your-queriesmutations-in-graphiql) Testing Your Queries/Mutations in GraphiQL

Before fully implementing all of the GraphQL queries and mutations that your app
may be using, it is often easiest to test these out by first
[Making API Requests in GraphiQL](https://developer.getjobber.com/docs/getting_started/#5-make-api-requests-in-graphiql).

## [testing process for apps to be published permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#testing-process-for-apps-to-be-published) Testing Process for Apps to be Published

In order for your app to be published in Jobber's App Marketplace, there are
typically 3 main steps to the testing process:

### [1 internal testing by developer permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#1-internal-testing-by-developer) 1\. Internal Testing by Developer

- Your application should be sufficiently tested by you or your organization
before submitting for Review
- Do not engage with any existing Jobber customers to test your application
before first coordinating with your Jobber developer representative
  - Mass distribution of URLs to connect to your app is prohibited unless
    authorized by Jobber
  - API access will be blocked if your app is detected connecting to more than 5
    paying Jobber accounts while still in `Draft` state
- Keep any announcements about your app private until your app has been approved
through Jobber's
[App Review process](https://developer.getjobber.com/docs/publishing_your_app/app_review_process)
- Contact your Jobber developer representative or email
[api-support@getjobber.com](mailto:api-support@getjobber.com) if you would like to end-to-end test the "Connect"
and "Disconnect" workflows for your app from Jobber's
[App Marketplace](https://secure.getjobber.com/marketplace).

### [2 app review testing by jobber permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#2-app-review-testing-by-jobber) 2\. App Review Testing by Jobber

- After your internal testing is completed, submit your App for Review and
Jobber will verify your application's functionality and conduct and round of
testing, submitting a request for changes if necessary
- If your app requires a login/subscription in order to be used, Jobber will
require that a test account be created in your software for this testing
- The App Marketplace listing details (eg. Description, Features & Benefits,
etc.) will also be reviewed in this phase
- Some example test cases include:
  - Jobber users can successfully connect,
    [disconnect](https://developer.getjobber.com/docs/building_your_app/app_authorization#handling-app-disconnects),
    and reconnect your app (enabling proper functionality again)
  - Proper usage and data formatting in any Jobber fields where data is input
  - Any modifications/additions of client data (eg. contact information)
    are properly synced back to Jobber
  - Duplication of data (eg. duplication of clients or properties) is prevented

### [3 beta testing with actual jobber customers permalink](https://developer.getjobber.com/docs/building_your_app/testing_your_app\#3-beta-testing-with-actual-jobber-customers) 3\. Beta Testing with Actual Jobber Customers

- Once your app has been approved by Jobber's App Review team, there will
typically be a 2 week period of Beta testing with selected Jobber
users/customers before your app is released to the general public
  - Further changes may be requested based on feedback from Jobber users