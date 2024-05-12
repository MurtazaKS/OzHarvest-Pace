# Check-in Server

This server code handles the back-end function for the check in application.

## Requirements

Apart from this code, the setup also requires a MongoDB server.

## Setup

`npm install`

### Configuration

The `.env` file should be defined and populated as follows: 

```
MONGO_URL={mongodb}
PORT={port}
SECRET={secret}
NODE_ENV=development
```

## Running

`npm run dbserver`

### Controllers

The Customer, Auth, and User controllers have been defined.

#### Customer

| Verb   | URI                                         | Action  | Auth        | Description                              |
| ------ |-------------------------------------------- | ------- | ----------- | ---------------------------------------- |
| POST   | /customer/register                          | store   | Req         | Add a new customer                       |
| GET    | /customers                                  | show    | Req (admin) | List customers                           |
| GET    | /customer/{customerid}                      | show    | Req         | List a single customer                   |
| PUT    | /customer/{customerid}                      | update  | Req         | Update customer                          |
| DELETE | /customer/{customerid}                      | destroy | Req (admin) | Delete customer                          |
| POST   | /customer/{customerid}/address              | store   | Req         | Add a new customer address               |
| GET    | /customer/{customerid}/address              | show    | Req         | List customer addresses                  |
| GET    | /customer/{customerid}/address/{addressid}  | show    | Req         | List a single customer address           |
| PUT    | /customer/{customerid}/address/{addressid}  | update  | Req         | Update customer address                  |
| DELETE | /customer/{customerid}/address/{addressid}  | destroy | Req (admin) | Delete customer address                  |
| POST   | /customer/{customerid}/comment              | store   | Req         | Add a new customer comment               |
| GET    | /customer/{customerid}/comment              | show    | Req         | List customer comments                   |
| GET    | /customer/{customerid}/comment/{commentid}  | show    | Req         | List a single customer comment           |
| PUT    | /customer/{customerid}/comment/{commentid}  | update  | Req         | Update customer comment                  |
| DELETE | /customer/{customerid}/comment/{commentid}  | destroy | Req (admin) | Delete customer comment                  |
| POST   | /customer/{customerid}/ident                | store   | Req         | Add a new customer identity document     |
| GET    | /customer/{customerid}/ident                | show    | Req         | List customer identity documents         |
| GET    | /customer/{customerid}/ident/{identid}      | show    | Req         | List a single customer identity document |
| PUT    | /customer/{customerid}/ident/{identid}      | update  | Req         | Update customer identity document        |
| DELETE | /customer/{customerid}/ident/{identid}      | destroy | Req (admin) | Delete customer identity document        |
| POST   | /customer/{customerid}/checkin              | store   | Req         | Add a check-in event                     |
| GET    | /customer/{customerid}/checkin              | show    | Req         | List customer check-in events            |
| GET    | /customer/{customerid}/checkin/{checkinid}  | show    | Req         | List a single customer check-in event    |
| DELETE | /customer/{customerid}/checkin/{checkinid}  | destroy | Req (admin) | Delete customer check-in event           |
| POST   | /customer                                   | search  | Req         | Search for a customer                    |

__Examples:__

###### Register a new customer

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"firstname":"Peter", "lastname":"Parker"}' \
-X POST http://localhost:3001/api/customer/register
```

###### List customers

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer  | jq -r
```

###### List a single customer

```
curl -s \
-H 'Accept: application/json' \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0 | jq -r
```

###### Add a new customer address

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"type": "home", "postcode":"2000"}' \
-X POST http://localhost:3001/api/customer/66262164f3d34b6410be98c0/address | jq -r
```

###### List a customers addresses

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/addresses | jq -r
```

###### List a customers address by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/addresses/6626225cf3d34b6410be98c6 | jq -r
```

###### Update a customers address by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"suburb":"Sydney"}' \
-X PUT http://localhost:3001/api/customer/66262164f3d34b6410be98c0/addresses/6626225cf3d34b6410be98c6 | jq -r
```

###### Delete a customers address by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
-X DELETE http://localhost:3001/api/customer/66262164f3d34b6410be98c0/addresses/6626225cf3d34b6410be98c6
```

###### Add a new customer identity document

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"document":"email", "value":"peter@example.com"}' \
-X POST http://localhost:3001/api/customer/66262164f3d34b6410be98c0/ident | jq -r
```

###### List a customer's identity documents

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/idents | jq -r
```

###### List a customer's identity document by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/idents/66263367ddfd39455afc5fb9 | jq -r
```

###### Update a customer's identity document by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"document":"email", "value":"peter@example.net"}' \
-X PUT http://localhost:3001/api/customer/66262164f3d34b6410be98c0/idents/66263367ddfd39455afc5fb9 | jq -r
```

###### Delete a customer's identity document by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
-X DELETE http://localhost:3001/api/customer/66262164f3d34b6410be98c0/idents/66263367ddfd39455afc5fb9
```

###### Add a customer check-in event

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"location":"Waterloo"}' \
-X POST http://localhost:3001/api/customer/66262164f3d34b6410be98c0/checkin | jq -r
```

###### List a customer's check-in events

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/checkin | jq -r
```

###### List a customer's check-in event by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/checkin/6626295aee01d7d3d382f457 | jq -r
```

###### Delete a customer's check-in event by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
-X DELETE http://localhost:3001/api/customer/66262164f3d34b6410be98c0/checkin/6626295aee01d7d3d382f457
```

###### Add a new customer comment

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"comment":"This is a comment"}' \
-X POST http://localhost:3001/api/customer/66262164f3d34b6410be98c0/comment | jq -r
```

###### List a customer's comments

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/comment | jq -r
```

###### List a customer's comment by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/66262164f3d34b6410be98c0/comment/66262f462eec64f5cf24b43a | jq -r
```

###### Update a customer's comment by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"comment":"This is an updated comment"}' \
-X PUT http://localhost:3001/api/customer/66262164f3d34b6410be98c0/comment/66262f462eec64f5cf24b43a | jq -r
```

###### Delete a customer's comment by ID

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
-X DELETE http://localhost:3001/api/customer/66262164f3d34b6410be98c0/comment/66262f462eec64f5cf24b43a
```

###### Search for a customer by first and last name

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"firstname":"Peter","lastname":"Parker"}' \
-X POST http://localhost:3001/api/customer
```

###### Search for a customer by identify document: email

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"ident": {"document": "email", "value": "peter@example.com"}}' \
-X POST http://localhost:3001/api/customer
```

#### Auth

| Verb   | URI           | Action  | Description               |
| ------ |-------------- | ------- | ------------------------- |
| POST   | /auth/signup  | index   | New user sign up          |
| POST   | /auth/login   | login   | Existing user login       |
| GET    | /auth/whoami  | show    | Show user (Self)          |
| GET    | /auth/logout  |         | Delete token cookie       |


__Examples:__

###### New user sign up
```
curl -s \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"username":"john", "email":"john@example.com",  "password":"password"}' \
-X POST http://localhost:3001/api/signup
```

###### Login

```
TOKEN=$(curl -s \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"username":"john","password":"password"}' \
-X POST http://localhost:3001/api/login | jq -r '.token')
```

##### Who am I

```
curl -s \
-H 'Accept: application/json' \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/auth/whoami | jq -r
```

#### User

| Verb   | URI                | Action  | Description               |
| ------ |------------------- | ------- | ------------------------- |
| GET    | /user              | index   | Get list of users         |
| GET    | /user/{id}         | show    | Show a single user        |


### Models

The Customer and User models have been defined.

#### Customer

| Name       | Type          | Required | Description               |
| ---------- |-------------- | -------- | ------------------------- |
| title      | String        | False    | Customer title            |
| firstname  | String        | True     | First name                |
| middlename | String        | False    | First name                |
| lastname   | String        | True     | Last name                 |
| birthday   | String        | False    | Birthday                  |
| language   | String        | False    | Preferred Language        |
| addresses  | Array         | False    | Addresses                 |
| ident      | Array         | False    | Identity documents        |
| checkin    | Array         | False    | Check in events           |
| comments   | Array         | False    | Comments                  |
| created    | Date          | True     | Create timestamp          |

__Example:__

```
{
  "firstname": "Peter",
  "lastname": "Parker",
  "creator": {
    "username": "john",
    "createdAt": "2024-04-22T08:35:09.132Z",
    "updatedAt": "2024-04-22T08:35:09.132Z",
    "id": "6626213df3d34b6410be98bc"
  },
  "addresses": [
    {
      "type": "home",
      "postcode": "2000",
      "creator": {
        "username": "john",
        "createdAt": "2024-04-22T08:35:09.132Z",
        "updatedAt": "2024-04-22T08:35:09.132Z",
        "id": "6626213df3d34b6410be98bc"
      },
      "created": "2024-04-22T10:11:32.857Z",
      "_id": "662638b35b9370ee8ef8dd4f"
    }
  ],
  "ident": [
    {
      "document": "email",
      "value": "peter@example.com",
      "creator": {
        "username": "john",
        "createdAt": "2024-04-22T08:35:09.132Z",
        "updatedAt": "2024-04-22T08:35:09.132Z",
        "id": "6626213df3d34b6410be98bc"
      },
      "created": "2024-04-22T10:11:32.857Z",
      "_id": "6626385e5b9370ee8ef8dd3f"
    }
  ],
  "checkin": [
    {
      "location": "Waterloo",
      "date": "2024-04-22T09:03:23.403Z",
      "_id": "662627db0097fe71885531b9"
    }
  ],
  "comments": [
    {
      "comment": "This is a comment",
      "creator": {
        "username": "john",
        "createdAt": "2024-04-22T08:35:09.132Z",
        "updatedAt": "2024-04-22T08:35:09.132Z",
        "id": "6626213df3d34b6410be98bc"
      },
      "_id": "662638725b9370ee8ef8dd43"
    }
  ],
  "createdAt": "2024-04-22T08:35:48.637Z",
  "updatedAt": "2024-04-22T10:15:15.839Z",
  "id": "66262164f3d34b6410be98c0"
}
```

#### User

| Name     | Type          | Required | Hidden | Description               |
| -------- |-------------- | -------- | ------ | ------------------------- |
| username | String        | True     | False  | Username                  |
| email    | String        | True     | True   | Email Address             |
| password | String        | True     | True   | Password Hash             |
| name     | String        | False    | False  | Full Name                 |
| created  | Date          | True     | False  | Create timestamp          |

__Example:__

```
{
  "created": "2021-10-04T05:03:20.228Z",
  "username": "john",
  "createdAt": "2021-10-02T13:14:23.504Z",
  "id": "61585b762e28bb8787bb32f6"
}
```
