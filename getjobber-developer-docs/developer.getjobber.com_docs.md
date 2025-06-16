---
url: "https://developer.getjobber.com/docs"
title: "Jobber's Developer Center"
---
# Developer Center

## [about jobber permalink](https://developer.getjobber.com/docs\#about-jobber) About Jobber

Jobber is an award-winning business management platform for small home service
businesses. Unlike spreadsheets or pen and paper, Jobber keeps track of
everything in one place and automates day-to-day operations, so small businesses
can provide 5-star service at scale. Jobber’s 200,000+ Home Service Pros have
served over 12 million households in more than 47 countries.

## [about jobbers api permalink](https://developer.getjobber.com/docs\#about-jobbers-api) About Jobber's API

Jobber's API gives developers the ability to access and modify data on users'
accounts via GraphQL. You will be able to develop, ship, and monetize your own
apps on top of Jobber's platform.

## [important objects permalink](https://developer.getjobber.com/docs\#important-objects) Important Objects

This section provides a high-level overview of the components in Jobber's API.
Our list of field names is always changing. For the most up-to-date schema,
please follow our
[Getting Started](https://developer.getjobber.com/docs/getting_started/) steps
and view everything in GraphiQL.

* * *

Clients

Clients are the customers who pay for services on Jobber's
platform - they belong to the Jobber account / service provider. Most other
objects are linked to a client.

```graphql
type Client {
  id: EncodedId! # The unique identifier
  balance: Float! # The client's current balance
  billingAddress: ClientAddress # The billing address of the client
  clientProperties: PropertyConnection! # The properties belonging to the client which are serviced by the service provider
  companyName: String # The name of the business
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  defaultEmails: [String!]! # The email address stored from previous communications
  emails: [Email!]! # The email addresses belonging to the client
  firstName: String! # The first name of the client
  invoices: InvoiceConnection! # The invoices associated with the client
  isArchivable: Boolean! # Is the client archivable
  isArchived: Boolean! # Is the client archived
  isCompany: Boolean! # Does the client represent a business
  isLead: Boolean! # Is the client a prospective lead for the service provider
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobs: JobConnection! # The jobs associated with the client
  lastName: String! # The last name of the client
  name: String! # The primary name of the client
  noteAttachments: ClientNoteFileConnection! # The note files attached to the client
  notes: ClientNoteConnection! # The notes attached to the client
  phones: [ClientPhoneNumber!]! # The phone numbers belonging to the client
  quotes: QuoteConnection! # The quotes associated with the client
  requests: RequestConnection! # The requests associated with the client
  secondaryName: String # The secondary name of the client
  tags: TagConnection! # The custom tags added to the client
  title: String # The title of the client
  workObjects: WorkObjectUnionConnection # The client's requests, quotes, jobs, and invoices sorted descending by modified date
  createdAt: ISO8601DateTime! # The time the client was created
  updatedAt: ISO8601DateTime! # The last time the client was updated
}

```

* * *

Requests

Forms which a client can fill to request work to be done.

```graphql
type Request {
  id: EncodedId! # The unique identifier
  assessment: Assessment # The assessment associated with the work request
  client: Client! # The client associated with the work request
  companyName: String # The company name provided in the work request
  contactName: String # The primary contact of the client requesting work
  email: String # The contact email provided in the work request
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobs: JobConnection! # The jobs associated with the specific work request
  noteAttachments: RequestNoteFileConnection! # The note files attached to the request
  notes: RequestNoteUnionConnection! # The notes attached to the request
  phone: String # The contact phone provided in the work request
  property: Property # The property associated with the work request
  quotes: QuoteConnection! # The quotes associated with the work request
  referringClient: Client # The client that referred this work request, if this work request was referred
  requestStatus: RequestStatusTypeEnum! # The status of the work request
  source: String! # The source of the work request
  title: String # The title of the work request
  createdAt: ISO8601DateTime! # The time the work request was created
  updatedAt: ISO8601DateTime! # The last time the work request was changed in a way that is meaningful to the Service Provider
}

```

* * *

Jobs

A scheduled event where work will take place (i.e. lawn service
every Friday at 3pm).

```graphql
type Job {
  id: EncodedId! # The unique identifier
  arrivalWindow: ArrivalWindow # The time window during which the SP can arrive at the job
  billingType: BillingStrategy! # Invoicing strategy selected for the job
  bookingConfirmationSentAt: ISO8601DateTime # The time when booking confirmation for the job was sent
  client: Client! # The client on the job
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  defaultVisitTitle: String! # The default title for new visits
  expenses: ExpenseConnection! # Expenses associated with the job
  instructions: String # The instructions on a job
  invoices: InvoiceConnection! # The invoices associated with the job
  invoiceSchedule: InvoiceSchedule! # Schedule of invoices
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobCosting: JobCosting # The job costing fields representing the profitability of the job
  jobNumber: Integer! # The number of the job
  jobStatus: JobStatusTypeEnum! # The status of the job
  jobType: JobTypeTypeEnum! # The type of job
  lineItems: JobLineItemConnection! # The line items associated with the job
  noteAttachments: JobNoteFileConnection! # The note files attached to the job
  notes: JobNoteUnionConnection! # The notes attached to the job
  paymentRecords: PaymentRecordConnection! # The payment records applied to this job's invoices
  property: Property # The property associated with the job
  quote: Quote # When applicable, the quote associated with the job
  request: Request # When applicable, the request associated with the job
  source: Source! # The originating source of the job
  timesheetEntries: TimeSheetEntryConnection! # A list of all timesheet entries for this job
  title: String # The scheduling information of the job
  total: Float! # The total chargeable amount of the job
  visits: VisitConnection! # The scheduled or unscheduled visits to the customer's property to complete the work associated with the job
  visitsInfo: VisitsInfo! # Information about jobs visits
  visitSchedule: VisitSchedule! # Schedule of visits
  willClientBeAutomaticallyCharged: Boolean # The setting for automatic invoice charges
  completedAt: ISO8601DateTime # The completion date of the job
  createdAt: ISO8601DateTime! # The time the job was created
  endAt: ISO8601DateTime # End date of the job
  startAt: ISO8601DateTime # Start date of the job
  updatedAt: ISO8601DateTime! # The last time the job was changed in a way that is meaningful to the Service Provider
}

```

* * *

Quotes

A cost estimate which service providers sent to their clients
before any work is done.

```graphql
type Quote {
  id: EncodedId! # The unique identifier
  amounts: QuoteAmounts! # All amounts related to the quote
  client: Client # The client the quote was made for
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  depositRecords: PaymentRecordConnection! # The deposit records applied to the quote
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobs: JobConnection # Job IDs converted from this quote
  lineItems: QuoteLineItemConnection! # The line items associated with the quote
  message: String # The message to the client
  noteAttachments: QuoteNoteFileConnection! # The note files attached to the quote
  notes: QuoteNoteUnionConnection! # The notes attached to the quote
  previewUrl: String! # The URL of the quote preview in client hub
  property: Property # The property the quote was made for
  quoteNumber: String! # A non-unique number assigned to the quote by a Service Provider
  quoteStatus: QuoteStatusTypeEnum! # The current status the quote
  request: Request # The request associated with the quote
  title: String # The description of the quote
  unallocatedDepositRecords: PaymentRecordConnection! # The deposit records that haven't been applied to an invoice and are not refunded
  clientHubViewedAt: ISO8601DateTime # Time the quote was viewed at in Client Hub
  createdAt: ISO8601DateTime! # The time the quote was created
  transitionedAt: ISO8601DateTime! # Time the quote transitioned to its current status
  updatedAt: ISO8601DateTime! # The last time the quote was changed in a way that is meaningful to the Service Provider
}

```

* * *

Invoices

A receipt detailing the work done as well as the cost of the
service provided.

```graphql
type Invoice {
  id: EncodedId! # The unique identifier
  amounts: InvoiceAmounts # All amounts related to the invoice
  billingAddress: InvoiceBillingAddress # The billing address associated with the invoice
  billingIsSameAsPropertyAddress: Boolean # Returns whether the billing address is the same as the property address
  client: Client # The client the invoice is for
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  invoiceNumber: String! # The invoice number
  invoiceNet: Int # Number of whole days after the issue_date that payment is due
  invoiceStatus: InvoiceStatusTypeEnum! # The status of the invoice
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobs: JobConnection! # The jobs related to the invoice
  lineItems: InvoiceLineItemConnection! # The line items on the invoice
  linkedCommunications: MessageInterfaceConnection! # All messages related to this work object
  message: String # The message on the invoice
  noteAttachments: InvoiceNoteUnionConnection! # The note files attached to the invoice
  notes: InvoiceNoteUnionConnection! # The notes attached to the invoice
  paymentRecords: PaymentRecordConnection! # The payment records applied to the invoice
  properties: PropertyConnection! # The properties related to the invoice
  subject: String! # The subject of the invoice
  taxCalculationMethod: String! # The tax calculation method on the invoice
  taxRate: TaxRate # The tax rate information on the invoice
  visits: VisitConnection! # The visits associated with the invoice
  createdAt: ISO8601DateTime! # The date the invoice was created on
  dateViewedInClientHub: ISO8601DateTime # The date the invoice was viewed in client hub
  dueDate: ISO8601DateTime # The date the invoice is due on
  issuedDate: ISO8601DateTime # The date the invoice was issued on
  receivedDate: ISO8601DateTime # The date the invoice was received on
  updatedAt: ISO8601DateTime! # The last time the invoice was changed in a way that is meaningful to the Service Provider
}

```

* * *

Accounts

The Jobber account used for business operations by a Service Provider.

```graphql
type Account {
  id: EncodedId! # The unique identifier
  features: [AccountFeature!] # A list of features
  industry: Industry # Industry associated with the account
  name: String! # The name of the company
  phone: String # The phone number of the account
  createdAt: ISO8601DateTime! # The date the account was created
}

```

* * *

Assessments

An assessment represents each time a Service Provider goes to a client property to assess and plan for future work.

```graphql
type Assessment {
  id: EncodedId! # The unique identifier
  allDay: Boolean! # Indicates whether the scheduled item is for a full day
  assignedUsers: UserConnection # Users assigned to the scheduled item
  client: Client! # The client for the assessment
  createdBy: User # The user that created this scheduled item
  duration: Int # Minute duration between start and end time
  instructions: String # The instructions for the assessment
  isComplete: Boolean! # Whether the assessment has been completed
  isDefaultTitle: Boolean! # Indicates whether the title is the default
  overrideOrder: Int # An override for ordering anytime and unscheduled items
  property: Property # The property for the assessment
  request: Request! # The parent request associated with this assessment
  title: String # The title of the scheduled item
  endAt: ISO8601DateTime # End date and time of the scheduled item. An unscheduled visit has both startAt and endAt being null
  startAt: ISO8601DateTime # Start date and time of the scheduled item. An unscheduled visit has both startAt and endAt being null
}

```

* * *

Expenses

An expense incurred by a Service Provider.

```graphql
type Expense {
  id: EncodedId! # The unique identifier
  date: ISO8601DateTime! # When the expense was incurred
  description: String # The description of the expense
  enteredBy: User # The user who filled out the expense
  linkedJob: Job # The associated Job
  paidBy: User # The user who paid the expense
  reimbursableTo: User # The user receiving the reimbursed expense amount
  title: String! # The title of the expense
  total: Float # Total cost of the expense
  createdAt: ISO8601DateTime! # When the expense was created
  updatedAt: ISO8601DateTime! # When the expense was updated
}

```

* * *

Products or Services

The collection of attributes that represent a product or service.

```graphql
type ProductOrService {
  id: EncodedId! # The unique identifier
  category: ProductsAndServicesCategory! # The item's category
  defaultUnitCost: Float! # A product or service has a default price
  description: String # The description of product or service
  durationMinutes: Minutes # The duration of the service in minutes
  internalUnitCost: Float # A product or service has a default internal unit cost
  markup: Float # A product or service has a default markup
  name: String! # The name of the product or service
  onlineBookingEnabled: Boolean # Whether the service is enabled on the booking page
  onlineBookingSortOrder: Int # Sort order of the service on the booking page
  taxable: Boolean # A product or service can be taxable or non-taxable
  visible: Boolean # A 'visible' product or service will show up as an autocomplete suggestion on quotes/jobs/invoice line items
}

```

* * *

Time Sheet Entries

The recorded time of a Jobber user.

```graphql
type TimeSheetEntry {
  id: EncodedId! # The unique identifier
  approved: Boolean! # Indicates whether the time sheet entry is approved
  approvedBy: User # User that approved this time sheet entry
  client: Client # The client associated with the job linked to the time sheet entry
  finalDuration: Seconds! # Duration of a stopped time sheet entry (resolves to 0 for ticking entries)
  job: Job # Job linked to the timer
  label: String # Label on the time sheet entry
  labourRate: Float # Labour rate associated with this time sheet entry
  note: String # Note attached
  paidBy: User # User that marked this time sheet entry as paid
  ticking: Boolean! # Flag indicating whether the timer is actively running or not
  user: User # User the time sheet entry belongs to
  visit: Visit # Visit linked to the time sheet entry
  visitDurationTotal: Int! # Total duration in seconds the user worked on the related visit
  createdAt: ISO8601DateTime! # The time the time sheet was created
  endAt: ISO8601DateTime # Date and time the time sheet entry was completed (resolves to nil for time sheets without a time range)
  startAt: ISO8601DateTime! # Date and time the time sheet entry was started
  updatedAt: ISO8601DateTime! # The last time the time sheet was updated
}

```

* * *

Properties

Properties are locations owned by Service Consumers where Service Providers provide service for.

```graphql
type Property {
  id: EncodedId! # The unique identifier
  address: PropertyAddress! # The address of the property
  client: Client # The client associated with the property
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  isBillingAddress: Boolean # Whether the property is a billing address
  jobberWebUri: String! # The URI for the given record in Jobber Online
  jobs: JobConnection! # The jobs associated with the property
  quotes: QuoteConnection! # The quotes associated with the property
  requests: RequestConnection! # The requests associated with the property
  routingOrder: Int # The routing order of the property
  taxRate: TaxRate # The tax rate of the property
}

```

* * *

Users

A user belongs to an account and generally completes work for clients.

```graphql
type User {
  id: EncodedId! # The unique identifier
  account: Account # The parent account for the user
  address: UserAddress # The address of the user
  apps: ApplicationConnection! # List of apps user has connected
  customFields: [CustomFieldUnion!]! # The custom fields set for this object
  email: UserEmail! # The email address of the user
  firstDayOfTheWeek: UserFirstDayOfTheWeekEnum! # The first day of the week of the user's account
  franchiseTokenLastFour: String # Returns the last four characters of the franchise access token for the user if one exists
  isAccountAdmin: Boolean! # Is the user an administrator on their account
  isAccountOwner: Boolean! # Is the user the owner of their account
  isCurrentUser: Boolean! # Is this the authenticated user querying
  name: Name! # The name of the user
  phone: UserPhone # The phone of the user
  status: UserStatusEnum! # The status of the user
  timezone: Timezone # The timezone of the user's account
  lastLoginAt: ISO8601DateTime # The date the user logged in last
}

```

* * *

Visits

A visit that represents each time a Service Provider goes to a client property to complete work.

```graphql
type Visit {
  id: EncodedId! # The unique identifier
  actionsUponComplete: [VisitActionUponComplete!]! # The actions available after completing the visit
  allDay: Boolean! # Indicates whether the scheduled item is for a full day
  arrivalWindow: ArrivalWindow # The time window during which the SP can arrive at the visit
  assignedUsers: UserConnection # Users assigned to the scheduled item
  client: Client! # The Client for the visit
  createdBy: User # The user that created this scheduled item
  duration: Int # Minute duration between start and end time
  instructions: String # The instructions for the visit
  invoice: Invoice # The invoice for the visit
  isComplete: Boolean! # Whether the visit has been completed
  isDefaultTitle: Boolean! # Indicates whether the title is the default
  isLastScheduledVisit: Boolean! # Whether the visit is the last visit for the associated job
  job: Job! # The Job the visit is associated with
  lineItems: JobLineItemConnection! # A list of all non-zero quantity line items for the visit
  notes: JobNoteUnionConnection # The notes attached to the associated job
  overrideOrder: Int # An override for ordering anytime and unscheduled items
  property: Property! # The property for the visit
  timeSheetEntries: TimeSheetEntryConnection # A list of all timesheet entries for this visit
  title: String # The title of the scheduled item
  visitStatus: VisitStatusTypeEnum! # The status of the visit
  completedAt: ISO8601DateTime # The time that the visit was completed
  createdAt: ISO8601DateTime! # The time that the visit was created
  endAt: ISO8601DateTime # End date and time of the scheduled item. An unscheduled visit has both startAt and endAt being null
  startAt: ISO8601DateTime # Start date and time of the scheduled item. An unscheduled visit has both startAt and endAt being null
}

```

* * *

## [need help permalink](https://developer.getjobber.com/docs\#need-help) Need Help?

Reach out to our API support team at:
[api-support@getjobber.com](mailto:api-support@getjobber.com).