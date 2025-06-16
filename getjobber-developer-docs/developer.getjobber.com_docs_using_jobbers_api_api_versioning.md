---
url: "https://developer.getjobber.com/docs/using_jobbers_api/api_versioning"
title: "Jobber's Developer Center"
---

# API Versioning

API versioning allows Jobber to continuously evolve our platform and
capabilities while offering third-party developers a predictable path for
feature upgrades and deprecations.

## [our approach permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning\#our-approach) Our Approach

- Dangerous and breaking changes will be added in versioned releases
- Versions will be in date format (YYYY-MM-DD), and will be published to our
[changelog](https://developer.getjobber.com/docs/changelog) at irregular intervals whenever a breaking or
dangerous change is made
- Old versions will be supported for a minimum of 12 months, and will be
accessible for up to 18 months from their release date
- When using a version which becomes unsupported, the API will start sending
warning messages to indicate that it can be removed and become inaccessible at
any time (even if this includes breaking changes that could impact your app)
- After an API version becomes unsupported, it can be removed at any time
  - Removal of API versions will be done in batches every 6 months
  - For each batch of removals, warning emails will be sent out to the email
    address associated with any impacted developer accounts at least 3 months
    before the removal date
  - Once an API version is removed, it becomes inaccessible, and any attempts to
    use that version will be automatically upgraded to the next supported
    version (oldest supported version)
  - It's possible that the next supported version will not be listed in our
    [changelog](https://developer.getjobber.com/docs/changelog/#active-api-versions)

## [how to specify a version permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning\#how-to-specify-a-version) How to Specify a Version

To specify a version, you must use the `X-JOBBER-GRAPHQL-VERSION` HTTP header
and set it to one of our
[active versions](https://developer.getjobber.com/docs/changelog/#active-api-versions). Specifying a version in
the header is required for all apps.

## [version information permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning\#version-information) Version Information

The response will include information about the API version your request is
making. Version information is found under the `extensions` key.

If you are requesting a version that will become unsupported in the next 3
months, a `warning` will be returned to indicate the expected unsupported date,
and a recommendation of the latest version to upgrade to.

```json
  "versioning": {
      "version": "2022-04-29",
      "warning": "Support for API version 2022-04-29 is scheduled to stop on May 13, 2023.
                  Upgrade to the latest version 2023-08-18 before that date.
                  For more information: https://developer.getjobber.com/docs/using_jobbers_api/api_versioning"
    }

```

If you are requesting an unsupported version that hasn't been removed yet, a
`warning` will be returned emphasizing that the version will be removed at any
time.

```json
  "versioning": {
      "version": "2022-04-29",
      "warning": "API Version 2022-04-29 is no longer supported, and will be removed at any time without warning.
                  Upgrade to the latest API version 2023-08-18 to ensure your app continues to function.
                  For more information: https://developer.getjobber.com/docs/using_jobbers_api/api_versioning"
    }

```

If you are requesting a [historic](https://developer.getjobber.com/docs/changelog#historic-api-versions)
version that has been removed, your request will be automatically upgraded to
the next supported version (oldest supported version). This version will be
returned under the `version` key.

## [how to upgrade to a newer version permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning\#how-to-upgrade-to-a-newer-version) How to Upgrade to a Newer Version

We recommend you use the most recent active API version to benefit from bug
fixes and schema improvements.

To upgrade to a newer API version, consult the [changelog](https://developer.getjobber.com/docs/changelog) to
look for any breaking changes, which could impact your application. If you're
using automatic code generation and type checking (such as with
[codegen](https://www.graphql-code-generator.com/)), it could provide hints to
what has broken.

In some cases, we will deprecate fields before they're removed and give
alternate fields, which could satisfy your use case.

[![Deprecation Notice](https://developer.getjobber.com/static/770a5fc0f6259abf63f40189d9e3dc9c/d4713/deprecated_field.png)](https://developer.getjobber.com/static/770a5fc0f6259abf63f40189d9e3dc9c/d4713/deprecated_field.png)

Once you've confirmed the new version works with your application (through
manual and automated testing), update the `X-JOBBER-GRAPHQL-VERSION` header
value in your production environment.