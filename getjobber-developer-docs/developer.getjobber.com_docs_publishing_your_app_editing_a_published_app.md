---
url: "https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app"
title: "Jobber's Developer Center"
---

# Editing a Published App

Once your app is Published/Approved, there may be times when you want to modify
the scopes to add new functionality or update the landing page to explain new
features of your app.

Follow these steps to modify your app:

### [1 create a revision permalink](https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app\#1-create-a-revision) 1: Create a Revision

To create a revision, from **Manage Apps** click the **Actions** button (...),
then select **Create a revision**. Creating a revision copies your app so that
you can make changes to the scopes, logos, images, etc.

The new app will have a state called Revision Draft. This state differentiates
the revision from other apps, and any changes will not affect the original app
it's revising until it has been re-reviewed.

[![App with revision](https://developer.getjobber.com/static/85935b8eecca9fd49f6bf42a291f99c3/73dae/revision_app.png)](https://developer.getjobber.com/static/85935b8eecca9fd49f6bf42a291f99c3/73dae/revision_app.png)

If the scopes are changed, there will be a message box for you to provide the
reason the new scopes were added or removed. This message is for users of your
app so they can see why they need to re-authorize it.

[![Reasons scope change](https://developer.getjobber.com/static/00e5381de73f39c0245c019619d1bbc8/5e1f2/reasons_scope_change.png)](https://developer.getjobber.com/static/00e5381de73f39c0245c019619d1bbc8/5e1f2/reasons_scope_change.png)

### [2 request a review permalink](https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app\#2-request-a-review) 2: Request a Review

Once you're happy with the changes to your app, you’re ready to re-submit your
app. To request a review, click the **Actions** (...) button and select
**Request review**. Be sure to verify that all of the changes you've made in the
revision (including App Name, Callback URLs, or Webhook URLs) are the final
values that you would like for the Approved/Published app. After your app has
been reviewed and approved, the changes will be used to replace the original
Approved/Published app and the revision version of the app will no longer be
visible.

See [Review Process](https://developer.getjobber.com/docs/publishing_your_app/app_review_process) for more
details.

### [3 review accepted permalink](https://developer.getjobber.com/docs/publishing_your_app/editing_a_published_app\#3-review-accepted) 3: Review Accepted

Once your app is reviewed and published, the revised app that was created will
be removed from your **Manage Apps** list. You will then only see a single
Published/Approved app that includes your changes. At this point if new scopes
were added, any Service Provider who connected with the app will receive a
message to re-authorize their app allowing for the new scopes to then be
utilized.