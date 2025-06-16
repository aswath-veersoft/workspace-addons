---
url: "https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits"
title: "Jobber's Developer Center"
---

# API Rate Limits

The GraphQL API is rate limited to keep the Jobber platform stable for all apps
interacting with it.

There are two rate limiters that Jobber currently has setup: a DDoS protection
middleware and a GraphQL query cost calculation.

## [ddos protection middleware permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#ddos-protection-middleware) DDoS Protection Middleware

Jobber's DDoS protection middleware uses Rack::Attack to limit clients to 2500
requests per 5 minutes (2500 requests/300 s). This rate limitation is
implemented on a per app/account basis, instead of being based on IP address. In
the event that a particular app surpasses this rate limit, any subsequent
requests made to that specific Jobber account will receive a "429 Too Many
Requests" error.

This rate is typically less restrictive than the GraphQL Query Cost detailed
below, so if the limits below are respected, you are less likely to encounter
429 errors.

## [graphql query cost calculation permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#graphql-query-cost-calculation) GraphQL Query Cost Calculation

The API uses a query cost based approach for rate limiting. Every app and
account combination will have a maximum amount of points available to it that
can be used to make queries. This app/account combination ensures that the rate
limit of an app installed on one account will not effect the rate limit of the
same app installed on a different account.

Every query will cost a certain amount of points which will be subtracted from
the points available to the app/account combination when the query has resolved.
Over time, an amount of points will be restored which can be used to make more
queries.

The mechanism used to subtract and restore points over time is the
[leaky bucket algorithm](https://en.wikipedia.org/wiki/Leaky_bucket).

If the queries used are reasonably sized, it should be easy to stay within the
limits. If you're finding it difficult to stay within these limits, consider
introducing a delay between your queries and caching common results. Error
handling should also be used as a mechanism to regulate your queries when being
throttled.

## [response format permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#response-format) Response Format

The response will include information about the cost of the query and the
throttling status. This information is found under the `extensions` key:

```json
  "extensions": {
    "cost": {
      "requestedQueryCost": 142,
      "actualQueryCost": 47,
      "throttleStatus": {
        "maximumAvailable": 10000,
        "currentlyAvailable": 9953,
        "restoreRate": 500
      }
    }
  }

```

### [requestedquerycost permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#requestedquerycost) requestedQueryCost

This is how much the query was expected to cost. The response may not always
contain the exact amount of data that was requested which is why this value can
differ from the `actualQueryCost`. For example, a query might request the first
50 quotes for an account, but an account might have some amount of quotes less
than that.

If the `requestedQueryCost` is above the amount of points in
`currentlyAvailable`, A throttled response will be returned:

```json
{
  "errors": [\
    {\
      "message": "Throttled",\
      "extensions": {\
        "code": "THROTTLED",\
        "documentation": "https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits"\
      }\
    }\
  ],
  "extensions": {
    "cost": {
      "requestedQueryCost": 10001,
      "actualQueryCost": 0,
      "throttleStatus": {
        "maximumAvailable": 10000,
        "currentlyAvailable": 10000,
        "restoreRate": 500
      }
    }
  }
}

```

Use this error response to ensure your query cost is below the
`maximumAvailable` cost and that you're waiting for enough points to be restored
to the `currentlyAvailable` amount.

### [actualquerycost permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#actualquerycost) actualQueryCost

The amount of points it actually cost to resolve the query. These points will be
subtracted from the `currentlyAvailable` amount.

### [maximumavailable permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#maximumavailable) maximumAvailable

This is the maximum amount of points that will ever be available to query with.
A query with a cost above this value will never resolve.

### [currentlyavailable permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#currentlyavailable) currentlyAvailable

The amount of points that are currently available to query with. This value will
never be larger than `maximumAvailable`.

### [restorerate permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#restorerate) restoreRate

The rate at which points will be added to the `currentlyAvailable` amount every
second.

## [cost calculation permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#cost-calculation) Cost Calculation

All fields have a default value of 1 except for the `edges`, `nodes` and `node`
connection fields which have a value of 0. Some fields that are more expensive
to resolve may have a value larger than 1, but those will be a rare exception.
Utilizing `filter` or `sort` arguments will not impact the cost calculation.

As an example, the following query costs 7 points (7 fields in total):

```graphql
query {
  quote(id: "MTc1") {
    id
    cost
    title
    client {
      id
      firstName
    }
  }
}

```

## [connection fields permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#connection-fields) Connection Fields

The cost of connection fields is calculated by taking the supplied `first`, or
`last` argument and multiplying it by the number of requested fields. For
example, the following query costs 50 points (10 nodes each containing 5
fields):

```graphql
query {
  quotes(first: 10) {
    edges {
      node {
        id
        cost
        quoteNumber
        quoteStatus
        title
      }
    }
  }
}

```

If a `first`, or `last` argument is not supplied to a connection field, the API
will have to assume the maximum number of fields will be returned when
calculating the `requestedQueryCost`. All connection fields are configured to
return a maximum of 100 nodes when no arguments are supplied. So the same query
above without the `first` argument will have a `requestedQueryCost` of 500
points:

```graphql
query {
  quotes {
    edges {
      node {
        id
        cost
        quoteNumber
        quoteStatus
        title
      }
    }
  }
}

```

In order to avoid expensive connection queries, you should always try to supply
a `first`, or `last` argument and paginate if needed. These arguments can also
be applied to nested connection types inside of your original query, so it is
highly recommended to use them in the case of nested queries to avoid an
unnecessarily high query cost.

## [avoiding rate limits permalink](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits\#avoiding-rate-limits) Avoiding Rate Limits

To avoid being throttled by the API rate limits, it is recommended to utilize
pagination to collect data in batches instead of all at once. Jobber’s GraphQL
API uses cursor-based pagination based on the Relay framework. A sample query
using cursors looks like this:

```graphql
query ($limit: Int, $cursor: String, $id: EncodedId!) {
  job(id: $id) {
    lineItems(first: $limit, after: $cursor) {
      nodes {
        name
        quantity
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}

```

Using this approach, you can request a set amount of data at a given time so
that you are not loading it all at once. If you do require large amounts of
data, a timed delay can be added in between each API call so that your
`currentlyAvailable` points can restore at the `restoreRate`.

It is recommended to avoid using deeply nested queries whenever possible as the
query cost can increase exponentially based on the number of nodes. An example
of a deep nested query would be something like this:

```graphql
query SampleQuery {
  jobs {
    nodes {
      id
      jobNumber
      visits {
        nodes {
          id
          title
          visitStatus
        }
      }
    }
  }
}

```

If visit information from every job is not required, then using the job query
instead of the jobs query in the example above would reduce the nested layers of
nodes. If nested queries must be used, pagination is always recommended on all
connection types as a maximum number of 100 nodes will always be used in the
query cost calculation when no arguments are supplied. Utilizing the two
strategies above will help to avoid the rate limiter in a majority of
situations.