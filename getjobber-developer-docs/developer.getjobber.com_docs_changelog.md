---
url: "https://developer.getjobber.com/docs/changelog"
title: "Jobber's Developer Center"
---

# Changelog

# [active graphql api versions permalink](https://developer.getjobber.com/docs/changelog\#active-graphql-api-versions) Active GraphQL API Versions

This section documents breaking and dangerous changes made to active versions of
our GraphQL API. To see full details about versioning, see
[here](https://developer.getjobber.com/docs/using_jobbers_api/api_versioning). Any additive or non-breaking
changes are not documented in our changelog.

## [2025 01 20 permalink](https://developer.getjobber.com/docs/changelog\#2025-01-20) 2025-01-20

### [dangerous changes permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes) Dangerous Changes

- Enum value `REPLACED` was added to enum `CapitalLoanStatus`
- Enum value `ADVANCE_FUNDING` was added to enum `BalanceTransaction`
- Enum value `ADVANCE` was added to enum `BalanceTransaction`

## [2024 12 05 permalink](https://developer.getjobber.com/docs/changelog\#2024-12-05) 2024-12-05

### [dangerous changes 1 permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes-1) Dangerous Changes

- Enum value `RESERVED_FUNDS` was added to enum `BalanceTransaction`

## [2024 11 12 permalink](https://developer.getjobber.com/docs/changelog\#2024-11-12) 2024-11-12

### [breaking changes permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes) Breaking Changes

- Type for argument `sort` on field `requests` changed from `RequestsSortInput`
to `[RequestsSortInput!]`

## [2024 11 07 permalink](https://developer.getjobber.com/docs/changelog\#2024-11-07) 2024-11-07

No external breaking changes

## [2024 09 23 permalink](https://developer.getjobber.com/docs/changelog\#2024-09-23) 2024-09-23

No external breaking changes

## [2024 09 12 permalink](https://developer.getjobber.com/docs/changelog\#2024-09-12) 2024-09-12

### [dangerous changes 2 permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes-2) Dangerous Changes

- `ProductOrService` object implements `CustomFieldsInterface` interface
- Enum value `ALL_PRODUCTS_AND_SERVICES` was added to enum
`CustomFieldAppliesTo`

## [2024 08 30 permalink](https://developer.getjobber.com/docs/changelog\#2024-08-30) 2024-08-30

No external breaking changes

## [2024 06 10 permalink](https://developer.getjobber.com/docs/changelog\#2024-06-10) 2024-06-10

### [breaking changes 1 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-1) Breaking Changes

- Input field `ProductsAndServicesEditInput.category` changed type from
`WorkItemCategoryTypeEnum` to `ProductsAndServicesCategory`

## [2024 04 17 permalink](https://developer.getjobber.com/docs/changelog\#2024-04-17) 2024-04-17

### [dangerous changes 3 permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes-3) Dangerous Changes

- Union member `Client` was added to Union type `NoteCreatedByUnion`

## [2023 11 15 permalink](https://developer.getjobber.com/docs/changelog\#2023-11-15) 2023-11-15

### [breaking changes 2 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-2) Breaking Changes

- Enum value `Package` was removed from enum `WorkItemCategoryTypeEnum`
- Enum value `PACKAGE` was removed from enum `ProductsAndServicesCategory`
- Field `previewUrl` was removed from object type `Quote`
- Field `previewUrl` was removed from object type `Invoice`

## [2023 08 18 permalink](https://developer.getjobber.com/docs/changelog\#2023-08-18) 2023-08-18

### [breaking changes 3 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-3) Breaking Changes

- Input field `ClientEditInput.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Input field `ClientCreateInput.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldCreateInput!]`
- Input field `PropertyAttributes.address` changed type from `AddressAttributes`
to `AddressAttributes!`
- Field `attachmentsConnection` was removed from object type `ClientNote`
- Field `attachments` was removed from object type `ClientNote`
- Field `valueUrl` was removed from object type `CustomFieldLink`
- Field `valueText` was removed from object type `CustomFieldLink`
- Union member `CustomFieldSelect` was removed from Union type
`CustomFieldUnion`
- Union member `CustomFieldNumber` was removed from Union type
`CustomFieldUnion`
- Union member `CustomFieldBoolean` was removed from Union type
`CustomFieldUnion`
- Type `NoteFileEdge` was removed
- Type `RequestUpdateAttributes` was removed
- Type `RequestUpsertPayload` was removed
- Type `RequestNoteEditPayload` was removed
- Type `RequestNoteCreatePayload` was removed
- Type `NoteEditAttributes` was removed
- Type `NoteCreateAttributes` was removed
- Type `JobNoteEditPayload` was removed
- Type `JobNoteCreatePayload` was removed
- Type `CustomFieldsEditInput` was removed
- Type `CustomFieldsCreateInput` was removed
- Type `ClientNoteEditPayload` was removed
- Type `ClientNoteCreatePayload` was removed
- Type `NoteFileConnection` was removed
- Type `NoteFile` was removed
- Type `CustomFieldAttributes` was removed
- Type `CustomFieldSelect` was removed
- Type `CustomFieldNumber` was removed
- Field `QuoteLineItem.unitCost` changed type from `Float!` to `Float`
- Type `CustomFieldBoolean` was removed
- Field `internalCost` was removed from object type `QuoteLineItem`
- Input field `startsBefore` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Input field `startsAfter` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Input field `includeEveryAccountTimer` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Field `upsertRequest` was removed from object type `Mutation`
- Field `requestUpsert` was removed from object type `Mutation`
- Field `requestNoteEdit` was removed from object type `Mutation`
- Field `requestNoteCreate` was removed from object type `Mutation`
- Field `jobNoteEdit` was removed from object type `Mutation`
- Field `jobNoteCreate` was removed from object type `Mutation`
- Field `clientUpsert` was removed from object type `Mutation`
- Field `clientNoteEdit` was removed from object type `Mutation`
- Field `clientNoteCreate` was removed from object type `Mutation`
- Input field `QuoteEditAttributes.customFields` changed type from
`[CustomFieldsEditInput!]` to `[CustomFieldEditInput!]`
- Input field `QuoteCreateAttributes.customFields` changed type from
`[CustomFieldsCreateInput!]` to `[CustomFieldCreateInput!]`
- Input field `JobEditInput.customFields` changed type from
`[CustomFieldsEditInput!]` to `[CustomFieldEditInput!]`
- Input field `JobCreateAttributes.customFields` changed type from
`[CustomFieldsCreateInput!]` to `[CustomFieldCreateInput!]`
- Field `attachmentsConnection` was removed from object type `RequestNote`
- Field `attachments` was removed from object type `RequestNote`
- Field `attachmentsConnection` was removed from object type `QuoteNote`
- Field `attachments` was removed from object type `QuoteNote`
- Field `unitCost` was removed from object type `LineItemInterface`
- Input field `InvoiceEditInput.customFields` changed type from
`[CustomFieldsEditInput!]` to `[CustomFieldEditInput!]`
- Field `attachmentsConnection` was removed from object type `JobNote`
- Field `attachments` was removed from object type `JobNote`
- Field `JobLineItem.unitCost` changed type from `Float!` to `Float`
- Field `attachmentsConnection` was removed from object type `InvoiceNote`
- Field `attachments` was removed from object type `InvoiceNote`
- Field `unitCost` was removed from object type `InvoiceLineItem`
- Field `ProductOrService.id` changed type from `Int!` to `EncodedId!`
- Input field `ClientUpdateAttributes.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Input field `PropertyUpdateAttributes.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Field `attachmentsConnection` was removed from object type `NoteInterface`
- Field `attachments` was removed from object type `NoteInterface`

### [dangerous changes 4 permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes-4) Dangerous Changes

- Union member `CustomFieldNumeric` was added to Union type `CustomFieldUnion`
- Union member `CustomFieldTrueFalse` was added to Union type `CustomFieldUnion`
- Union member `CustomFieldDropdown` was added to Union type `CustomFieldUnion`

## [2023 05 05 permalink](https://developer.getjobber.com/docs/changelog\#2023-05-05) 2023-05-05

### [breaking changes 4 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-4) Breaking Changes

- Input field `valueUrl` was removed from input object type
`CustomFieldCreateInput`
- Type `CustomFieldSelect` was removed
- Input field `startsBefore` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Input field `startsAfter` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Input field `includeEveryAccountTimer` was removed from input object type
`TimeSheetEntriesFilterAttributes`
- Union member `CustomFieldBoolean` was removed from Union type
`CustomFieldUnion`
- Union member `CustomFieldNumber` was removed from Union type
`CustomFieldUnion`
- Union member `CustomFieldSelect` was removed from Union type
`CustomFieldUnion`
- Type `CustomFieldBoolean` was removed
- Field `valueText` was removed from object type `CustomFieldLink`
- Field `valueUrl` was removed from object type `CustomFieldLink`
- Input field `valueUrl` was removed from input object type
`CustomFieldEditInput`
- Input field `valueSelect` was removed from input object type
`CustomFieldEditInput`
- Input field `valueNumber` was removed from input object type
`CustomFieldEditInput`
- Input field `valueBoolean` was removed from input object type
`CustomFieldEditInput`
- Input field `valueAreaWidth` was removed from input object type
`CustomFieldEditInput`
- Input field `valueAreaLength` was removed from input object type
`CustomFieldEditInput`
- Input field `PropertyAttributes.address` changed type from `AddressAttributes`
to `AddressAttributes!`
- Input field `valueAreaLength` was removed from input object type
`CustomFieldCreateInput`
- Input field `valueAreaWidth` was removed from input object type
`CustomFieldCreateInput`
- Input field `valueBoolean` was removed from input object type
`CustomFieldCreateInput`
- Input field `valueNumber` was removed from input object type
`CustomFieldCreateInput`
- Input field `valueSelect` was removed from input object type
`CustomFieldCreateInput`
- Type `CustomFieldNumber` was removed

### [dangerous changes 5 permalink](https://developer.getjobber.com/docs/changelog\#dangerous-changes-5) Dangerous Changes

- Union member `CustomFieldTrueFalse` was added to Union type `CustomFieldUnion`
- Union member `CustomFieldNumeric` was added to Union type `CustomFieldUnion`
- Union member `CustomFieldDropdown` was added to Union type `CustomFieldUnion`

## [2023 03 29 permalink](https://developer.getjobber.com/docs/changelog\#2023-03-29) 2023-03-29

### [breaking changes 5 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-5) Breaking Changes

- Field `unitCost` was removed from object type `QuoteLineItem`
- Field `unitCost` was removed from object type `LineItemInterface`
- Field `JobLineItem.unitCost` changed type from `Float!` to `Float`
- Field `unitCost` was removed from object type `InvoiceLineItem`

## [2022 12 07 permalink](https://developer.getjobber.com/docs/changelog\#2022-12-07) 2022-12-07

### [breaking changes 6 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-6) Breaking Changes

- Type `CustomFieldsCreateInput` was removed
- Input field `QuoteEditAttributes.customFields` changed type from
`[CustomFieldsEditInput!]` to `[CustomFieldEditInput!]`
- Type `CustomFieldAttributes` was removed
- Input field `QuoteCreateAttributes.customFields` changed type from
`[CustomFieldsCreateInput!]` to `[CustomFieldCreateInput!]`
- Input field `JobEditInput.customFields` changed type from
`[CustomFieldsEditInput!]` to `[CustomFieldEditInput!]`
- Input field `JobCreateAttributes.customFields` changed type from
`[CustomFieldsCreateInput!]` to `[CustomFieldCreateInput!]`
- Input field `ClientUpdateAttributes.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Input field `PropertyUpdateAttributes.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Input field `ClientEditInput.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldEditInput!]`
- Input field `ClientCreateInput.customFields` changed type from
`[CustomFieldAttributes!]` to `[CustomFieldCreateInput!]`
- Type `CustomFieldsEditInput` was removed

## [2022 09 15 permalink](https://developer.getjobber.com/docs/changelog\#2022-09-15) 2022-09-15

### [breaking changes 7 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-7) Breaking Changes

- Field `attachments` was removed from object type `InvoiceNote`
- Type `NoteFile` was removed
- Field `attachmentsConnection` was removed from object type `NoteInterface`
- Field `attachments` was removed from object type `NoteInterface`
- Field `attachmentsConnection` was removed from object type `ClientNote`
- Field `attachments` was removed from object type `ClientNote`
- Type `NoteFileEdge` was removed
- Type `NoteFileConnection` was removed
- Field `ProductOrService.id` changed type from `Int!` to `EncodedId!`
- Field `attachmentsConnection` was removed from object type `RequestNote`
- Field `attachments` was removed from object type `RequestNote`
- Field `attachmentsConnection` was removed from object type `QuoteNote`
- Field `attachments` was removed from object type `QuoteNote`
- Field `attachmentsConnection` was removed from object type `JobNote`
- Field `attachments` was removed from object type `JobNote`
- Field `attachmentsConnection` was removed from object type `InvoiceNote`

## [2022 05 23 permalink](https://developer.getjobber.com/docs/changelog\#2022-05-23) 2022-05-23

### [breaking changes 8 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-8) Breaking Changes

- Field `InvoiceCreateNotePayload.invoice` changed type from `Invoice!` to
`Invoice`
- Field `JobLineItem.category` changed type from `String!` to
`ProductsAndServicesCategory!`
- Field `InvoiceNote.createdBy` changed type from `User` to `NoteCreatedByUnion`
- Field `InvoiceLineItem.category` changed type from `String!` to
`ProductsAndServicesCategory!`
- Field `workItem` was removed from object type `InvoiceLineItem`
- Field `NoteInterface.createdBy` changed type from `User` to
`NoteCreatedByUnion`
- Field `ClientEditNotePayload.client` changed type from `Client!` to `Client`
- Field `ClientCreateNotePayload.client` changed type from `Client!` to `Client`
- Field `Request.notes` changed type from `RequestNoteConnection!` to
`RequestNoteUnionConnection!`
- Type for argument `sort` on field `Quote.notes` changed from
`[QuoteNotesSortInput!]` to `[NotesSortInput!]`
- Field `Quote.notes` changed type from `QuoteNoteConnection!` to
`QuoteNoteUnionConnection!`
- Field `ClientNote.createdBy` changed type from `User` to `NoteCreatedByUnion`
- Type for argument `sort` on field `Invoice.notes` changed from
`[InvoiceNotesSortAttributes!]` to `[NotesSortInput!]`
- Field `Invoice.notes` changed type from `InvoiceNoteConnection!` to
`InvoiceNoteUnionConnection!`
- Type for argument `sort` on field `Job.notes` changed from
`[JobNotesSortAttributes!]` to `[NotesSortInput!]`
- Field `Job.notes` changed type from `JobNoteConnection!` to
`JobNoteUnionConnection!`
- Type for argument `sort` on field `Client.notes` changed from
`[ClientNotesSortAttributes!]` to `[NotesSortInput!]`
- Type `RequestNoteEdge` was removed
- Type `RequestNoteConnection` was removed
- Type `QuoteNotesSortKey` was removed
- Type `QuoteNoteEdge` was removed
- Type `QuoteNotesSortInput` was removed
- Type `QuoteNoteConnection` was removed
- Type `JobNotesSortableFieldsEnum` was removed
- Type `WorkItemCategoryTypeEnum` was removed
- Type `JobNotesSortAttributes` was removed
- Type `InvoiceNotesSortableFieldsEnum` was removed
- Type `InvoiceNoteEdge` was removed
- Type `InvoiceNotesSortAttributes` was removed
- Type `InvoiceNoteConnection` was removed
- Type `ClientNotesSortableFieldsEnum` was removed
- Field `QuoteNote.createdBy` changed type from `User` to `NoteCreatedByUnion`
- Type `ClientNotesSortAttributes` was removed
- Field `QuoteLineItem.category` changed type from `String!` to
`ProductsAndServicesCategory!`
- Argument `requestId: ` was removed from field `Mutation.requestEditNote`
- Argument `quoteId: ` was removed from field `Mutation.quoteEditNote`
- Argument `jobId: ` was removed from field `Mutation.jobEditNote`
- Argument `invoiceId: ` was removed from field `Mutation.invoiceEditNote`
- Argument `clientId: ` was removed from field `Mutation.clientEditNote`
- Field `RequestNote.createdBy` changed type from `User` to `NoteCreatedByUnion`
- Field `RequestEditNotePayload.request` changed type from `Request!` to
`Request`
- Field `QuoteEditNotePayload.quote` changed type from `Quote!` to `Quote`
- Input field `LineItemEditAttributes.category` changed type from
`WorkItemCategoryTypeEnum` to `ProductsAndServicesCategory`
- Input field `LineItemCreateAttributes.category` changed type from
`WorkItemCategoryTypeEnum` to `ProductsAndServicesCategory`
- Field `JobEditNotePayload.job` changed type from `Job!` to `Job`
- Input field `JobEditLineItemAttributes.category` changed type from
`WorkItemCategoryTypeEnum` to `ProductsAndServicesCategory`
- Input field `JobCreateLineItemAttributes.category` changed type from
`WorkItemCategoryTypeEnum` to `ProductsAndServicesCategory`
- Field `JobNote.createdBy` changed type from `User` to `NoteCreatedByUnion`
- Field `ProductOrService.category` changed type from
`WorkItemCategoryTypeEnum!` to `ProductsAndServicesCategory!`
- Field `LineItemInterface.category` changed type from `String!` to
`ProductsAndServicesCategory!`
- Field `InvoiceEditNotePayload.invoice` changed type from `Invoice!` to
`Invoice`

# [non graphql changes permalink](https://developer.getjobber.com/docs/changelog\#non-graphql-changes) Non-GraphQL Changes

## [2023 06 06 permalink](https://developer.getjobber.com/docs/changelog\#2023-06-06) 2023-06-06

The DDoS protection middleware started returning "429 Too Many Requests" rather
than "503 Service Unavailable" when a client's requests exceed the limits
outlined in our [API Rate Limits](https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits).

# [historic graphql api versions permalink](https://developer.getjobber.com/docs/changelog\#historic-graphql-api-versions) Historic GraphQL API Versions

This section documents breaking/dangerous changes introduced in historic
versions of the GraphQL API. All of these versions are inactive. Requests for
these versions will be automatically resolved against the nearest active
version.

## [2022 03 10 permalink](https://developer.getjobber.com/docs/changelog\#2022-03-10) 2022-03-10

### [breaking changes 9 permalink](https://developer.getjobber.com/docs/changelog\#breaking-changes-9) Breaking Changes

- Field `Query.jobs` changed type from `WorkOrderConnection!` to
`JobConnection!`
- Type `WorkOrderEdge` was removed
- Type `WorkOrderConnection` was removed

## [2022 01 01 permalink](https://developer.getjobber.com/docs/changelog\#2022-01-01) 2022-01-01

No breaking or dangerous changes.