---
url: "https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation"
title: "Jobber's Developer Center"
---


# Refresh Token Rotation

Refresh Token Rotation is a Developer Center feature that can be enabled when
creating or editing your app to ensure that a new refresh token is generated
every time a refresh token is used in the
[Refresh Token Flow](https://developer.getjobber.com/docs/building_your_app/app_authorization/#refresh-token-flow).

Although Refresh Token Rotation is ON for your app by default, you may turn it
off while developing your app. If you would like to submit your app to be listed
in Jobber's App Marketplace however, we would recommend against this. The
Refresh Token Rotation must be ON in order to get your app published in Jobber's
App Marketplace.

On the request to get new tokens via the refresh token (as mentioned in the
[Refresh Token Flow](https://developer.getjobber.com/docs/building_your_app/app_authorization/#refresh-token-flow)),
you will receive in return a new access token and refresh token. It is important
to note that when Refresh Token Rotation is `OFF` then the same refresh token
will be returned from the request. This means that the refresh token is meant to
be long-lived.

If Refresh Token Rotation is `ON`, then the returned refresh token will be a new
one every time a request is made though the
[Refresh Token Flow](https://developer.getjobber.com/docs/building_your_app/app_authorization/#refresh-token-flow).
This new refresh token should always be saved, as it is the one to be used on
the next request for a fresh access token. The same refresh token should never
be sent to the API more than once in this Refresh Token Rotation configuration,
and the old refresh token should be discarded after a new one is granted. See
the code example below for a recommended method for continuously updating both
tokens every time a refresh token is used.

### [ruby example permalink](https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation\#ruby-example) Ruby example

```ruby
def refresh_access_token
  # create a hash with current stored access token and refresh token
  account_tokens = {
    token_type: "bearer",
    access_token: account.jobber_access_token,
    expires_at: account.jobber_access_token_expired_by,
    refresh_token: account.jobber_refresh_token,
  }

  # get the response with new access token and
  # same refresh token (if Refresh Token Rotation is OFF),
  # new refresh token (if Refresh Token Rotation is ON)
  tokens = oauth2_refresh_access_token(account_tokens:)

  # update the database with the new access token and refresh token
  account.update_jobber_tokens(tokens:)
end

```

### [response format permalink](https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation\#response-format) Response format

With Refresh Token Rotation `OFF` the refresh token from the response will be
exactly the same as the one used to make the request, and a warning message will
also be returned in the response object.

```json
{
  "warning": "Refresh token rotation is off. This setting is required for apps to be published in the Jobber App Marketplace. You can turn it on in the Developer Center. https://developer.getjobber.com/apps",
  "access_token": "ENCRYPTED_ACCESS_TOKEN",
  "refresh_token": "ENCRYPTED_REFRESH_TOKEN",
  "expires_at": "2024-04-09 21:04:31 UTC"
}

```

With Refresh Token Rotation `ON` the refresh token from the response will be
different from the one used to make the request, and the new one should be
stored in a way that overwrites the old one in your app. This new one is to be
used on the next refresh token redemption. Every redemption should always be
using a new and unique refresh token.

If your app was created before Jan. 2nd, 2024, Jobber's API will have detection
on attempts made to redeem old (invalidated) refresh tokens. The API will
identify this in a warning message as follows:

```json
{
  "warning": "Unexpected Refresh Token Redemption: A newer refresh token exists than the one that was used for token redemption on this request. Please check your app's handling of refresh token rotation. https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation",
  "access_token": "ENCRYPTED_ACCESS_TOKEN",
  "refresh_token": "ENCRYPTED_REFRESH_TOKEN",
  "expires_at": "2024-04-11 15:14:48 UTC"
}

```

For apps created after Jan. 2nd, 2024, Jobber's API cannot detect if an old
(invalidated) refresh token was attempted to be redeemed. The API will simply
return the following error message:

> Error: The provided refresh token is not valid.

### [possible errors edge cases permalink](https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation\#possible-errors-edge-cases) Possible errors edge cases

Here are potential edge cases that could lead to errors when using the refreshed
token rotation:

1. Stale Data:

Developers retrieve the refresh\_token and access\_token from their database and
store them in a variable, say variable A. They then verify the validity of the
access\_token, refresh it, and update the new tokens in their database. However,
they overlook updating variable A, which still holds the old tokens.
Consequently, they end up using the outdated refresh\_token and access\_token to
query our API, leading to errors.

2. Concurrent Background Jobs:

It's common for multiple background jobs to request information from the Jobber
API. The issue arises when these jobs attempt to refresh their tokens
simultaneously, leading to a race condition. If the incorrect jobs save data to
the database, they inadvertently store a refresh\_token and access\_token that are
no longer valid.

Note that these two scenarios can also occur in combination, further
complicating the situation.