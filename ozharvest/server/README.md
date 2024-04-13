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

| Verb   | URI                     | Action  | Auth  | Description                      |
| ------ |------------------------ | ------- | ----- | -------------------------------- |
| POST   | /customer/register      | store   | Req   | Regider new customer             |
| GET    | /customer/{id}          | show    | Req   | List a single customer           |
| POST   | /customer/{id}/ident    | store   | Req   | Add a new identity document      |
| POST   | /customer/{id}/checkin  | store   | Req   | Add a check in event             |
| POST   | /customer               | search  | Req   | Search for a customer            |

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

###### List a single customer

```
curl -s \
-H 'Accept: application/json' \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:3001/api/customer/661a0269762ec28821167fcd | jq -r
```

###### Add a new identity document

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"document":"email", "value":"peter@example.com"}' \
-X POST http://localhost:3001/api/customer/661a0269762ec28821167fcd/ident
```

###### Add a check in event

```
curl -s \
-H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data '{"location":"Waterloo"}' \
-X POST http://localhost:3001/api/customer/661a0269762ec28821167fcd/checkin
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
--data '{"ident": {"type": "email", "value": "peter@example.com"}}' \
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

#### Post

| Name       | Type          | Required | Description               |
| ---------- |-------------- | -------- | ------------------------- |
| title      | String        | False    | Customer title            |
| firstname  | String        | True     | First name                |
| lastname   | String        | True     | Last name                 |
| language   | String        | False    | Preferred Language        |
| ident      | Array         | False    | Identity documents        |
| checkin    | Array         | False    | Check in events           |
| created    | Date          | True     | Create timestamp          |

__Example:__

```
  {
    "firstname": "Peter",
    "lastname": "Parker",
    "created": "2024-04-13T03:52:00.959Z",
    "ident": [
      {
        "document": "phone",
        "id": "0455123123",
        "created": "2024-04-13T04:23:34.441Z",
        "_id": "661a08c8ad8b296f673bef87"
      },
      {
        "document": "email",
        "id": "peter@example.com",
        "created": "2024-04-13T04:34:05.437Z",
        "_id": "661a0b870cbce3f8732de728"
      }
    ],
    "checkin": [
      {
        "checkin": "2024-04-13T10:14:43.003Z",
        "location": "Waterloo",
        "date": "2024-04-13T04:32:22.618Z",
        "_id": "661a0ae6e603edb771031edd"
      },
      {
        "checkin": "2024-04-13T10:14:43.003Z",
        "location": "Waterloo",
        "date": "2024-04-13T04:34:10.309Z",
        "_id": "661a0b420cbce3f8732de723"
      }
    ],
    "id": "661a0160762ec28821167fc9"
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

