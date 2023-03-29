# webapp

## Introduction
Node.js is a server-side JavaScript runtime environment. It allows developers to build fast and scalable network applications.

## User Requirements


1. As a user, I should be able to create new user by providing email address,password,first name and last name.
2. account_created field for the user should be set to a current time when user creation is successful.
3. Users should not be able to set values for account_created and account_updated. Any value provided for these fields must be ignored.Password should never be returned in the response payload.
4. As a user, I expect to use my email address as my username.
Application must return 400 Bad Request HTTP response code when a user account with the email address already exists.
5. As a user, I expect my password to be stored securely using the BCrypt password hashing scheme with salt.
6. As a user, I want to update my account information. I should only be allowed to update the following fields:First Name, Last Name,Password
7. Attempt to update any other field should return 400 Bad Request HTTP response code.
8. account_updated field for the user should be updated when the user update is successful.
9. A user can only update their own account information.
10. Get user information
As a user, I want to get my account information. Response payload should return all fields for the user except for password.

## Prerequisites

1.Visual studio code (IDE)
2.POSTMAN
3.Database - MySQL
4.Node.js

## Dependencies to be installed 

- npm install express mysql2 bcrypt body-parser nodemon dotenv  jest supertest


<h4>Important Commands to run the server and test</h4>

## Scripts
- `npm start`: starts the development server
- `npx jest`: runs test suite

## Endpoints
The following endpoints are available for operations:

GET - http://localhost:3000/healthz/

POST - http://localhost:3000/v1/user/

PUT - http://localhost:3000/v1/user/{id}

GET - http://localhost:3000/v1/user/{id}

GET - http://localhost:3000/v1/product/{id}

POST - http://localhost:3000/v1/product/

PUT - http://localhost:3000/v1/product/{id}

PATCH - http://localhost:3000/v1/product/{id}




## Responds with following HTTP messages

"400 Bad Request - The server could not understand the request due to invalid syntax."

"500 Internal Server Error - The server has encountered a situation it does not know how to handle."

"201 Created - The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests"

"200 OK - The request succeeded."

"401 Unauthorized - Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."

"204 No Content - The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page"

"403 Forbidden "-The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). 


<h4>Instructions:</h4>
Step 1: 1. Clone the repository or download and unzip the source repository.

Step 2: Create appropriate files in the IDE and write the code.

Step 3: Download the node modules and install dependencies. Start Server through command npm start. Open Postman to Test the API's

Step 4: Check the Database after each and every API is called to see the status in Database.

Step 5: Verify the status codes returned by API as per requirements 


## Test the Service:
To check the service is up and running check the following:

http://localhost:3000/healthz/, where you should see: "200 OK".

http://localhost:3000/v1/user/ where you should see: "201 Created".

http://localhost:3000/v1/user/self where you should see: "204 No Content".

http://localhost:3000/v1/user/self where you should use: "204 No Content".

http://localhost:3000/v1/product/self where you should see: "204 No Content".

http://localhost:3000/v1/product/self where you should use: "204 No Content".


#Packer file
## Contributing
Contributions are always welcome. Please create a pull request with a detailed description of changes.
