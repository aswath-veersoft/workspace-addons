---
url: "https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations"
title: "Jobber's Developer Center"
---

# API Queries and Mutations

## [make an endpoint request permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations\#make-an-endpoint-request) Make an Endpoint Request

Jobber's API is GraphQL based. This means all API requests are sent via POST to
the following URL:

`https://api.getjobber.com/api/graphql`

As of Apr. 2, 2024, Jobber API's is no longer accepting any endpoint requests
with the `application/x-www-form-urlencoded` or `multipart/form-data` content
types. All GraphQL requests must be made with the `application/json` content
type. If using the Guzzle HTTP client library, you can follow
[this guide](https://docs.guzzlephp.org/en/stable/request-options.html#json) for
instructions on switching to the `application/json` content type.

To make a successful request you must include a header with the `Authorization`
key, and a value consisting of the access token you received via the OAuth 2.0
flow prepended with the word 'bearer'. See the example curl request below.

```
curl -X POST -H "Authorization: Bearer <ACCESS_TOKEN>" "https://api.getjobber.com/api/graphql"

```

Assuming the access token is valid, the API will process the request according
to its API specifications. If the access token is invalid, the API will return a
401 "invalid\_request" error.

For more on how to use GraphQL, see the
[Official guides](https://graphql.org/learn/).

## [api queries permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations\#api-queries) API Queries

In order to request data from the API you will need to include a GraphQL query
in the payload of your API request.

Query Example:

```graphql
query SampleQuery {
  clients {
    nodes {
      id
      firstName
      lastName
      billingAddress {
        city
      }
    }
    totalCount
  }
}

```

## [api mutations permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations\#api-mutations) API Mutations

Any time you would like your app to modify any data in Jobber, a GraphQL
mutation will be required.

Mutation Example:

```graphql
mutation SampleMutation {
  clientCreate(
    input: {
      firstName: "Jane"
      lastName: "Doe"
      companyName: "Jane's Automotive"
      emails: [\
        { description: MAIN, primary: true, address: "jane.doe@example.com" }\
      ]
    }
  ) {
    client {
      id
      firstName
      lastName
    }
    userErrors {
      message
      path
    }
  }
}

```

> ℹ️ When using the `clientCreate` mutation above, the name of your app will
> automatically be captured in the
> [Lead source](https://help.getjobber.com/hc/en-us/articles/360038221373-Lead-Management#h_01J44SNTP8MNW6G42QP0YGEFZT)
> field that is built into Jobber. The lead source field for an app-created
> client cannot be edited by Jobber users. This functionality applies to all
> clients created after Sept. 16, 2024. The lead source field was not tracked
> automatically on clients created before Sept. 16, 2024, but this data may be
> backfilled in the future.