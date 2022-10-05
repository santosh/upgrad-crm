# Ticket Management Application

## Use Cases

### Customer

- I should be able to register myself.
- I should be able to login myself for registering/viewing complaints.
- I should be able to raise an issue.
- I should be able to check the latest status of the issues I raised.
- I should be able to modify the issue raised.
- I should be able to check the complete history of the issues raised.
- I should be able to my ticket myself.

### Engineer

- I should be able to accept an issue.
- I should be able to update an issue.
- I should be able to close an issue.
- I should be able to see the complete list of issues assigned to me.
- I should be able to searh for an issue.
- I should be able to filter the issues assigned to me based on the ticket status.

### Admin

- I should be able to see all the customers.
- I should be able to see all the engineers.
- I should be able to see the details of all the tickets.
- I should be able to see all the active tickets.
- I should be able to filter the tickets to another engineer.
- I should be able to re-assign a ticket to another engineer.
- I should be able to add a new Engineer.
- I should be able to remove an Engineer.

## Feature 1: User Authentication Authorisation APIs

There are three kinds of users:

1. Customer
2. Engineer
3. Admin

- Engineer/Admin registration will be supported through API, but it needs to be approved by
the ADMIN
- Customer registration will be supported through API with no approval needed from the
ADMIN
- API to support the ADMIN login. Login API call should return the access token, which will
be used to make all the other calls
- API to support the CUSTOMER login. Login API call should return the access token, which
will be used to make all the other calls
- API to support the ENGINEER login. Login API call should return the access token, which
will be used to make all the other calls. Login API will succeed only if the ENGINEER
registration request has been approved by the ADMIN. Proper error message in the case
ADMIN has not yet approved/rejected the registration request


## Feature 2: Authenticating and Authorising the User APIs

- API for getting the list of all users
- API for the getting the user based on UserID
- API for updating the user type and status
- Authenticating and authorising the APIs mentioned above, so that only authenticated
ADMIN will be allowed to perform the above operations
- ENGINEER/ADMIN user should be able to login successfully after the approval from the
ADMIN user

## Feature 3: Ticket Creation

- API for the authenticated user to raise a request
- API for the authenticated user to update an existing request
- API for the authenticated user to check the status of the request
- API for the authenticated user to check the list of the all the requests raised so far
- API for the authenticated user to raise a request
- Registered Engineers, if any, should be assigned the ticket automatically

## Feature 4: Ticket Manipulations and ADMIN Capabilities

- API for authenticating engineer to update the ticket
- An updated ticket should be visible to the customers immediately
- API for an authenticated engineer to search for the ticket
- API for an authenticated engineer to be able to assign a ticket
- API for an authenticated engineer to be able to see the complete list of tickets
assigned to them
- API for the authenticated ADMIN to get the list of all the customers
- API for the authenticated ADMIN to get the list of all the issues
- API for the authenticated ADMIN to get the list of all the issues after applying certain
filters
