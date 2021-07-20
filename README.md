
# APPOINTMENTS CRUD EXPRESS APP - Table of Contents

<!-- TOC -->

- [APPOINTMENTS CRUD EXPRESS APP - Table of Contents](#appointments-crud-express-app---table-of-contents)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  - [Available Scripts](#available-scripts)
    - [`yarn install`](#yarn-install)
    - [`yarn start-server`](#yarn-start-server)
    - [`yarn start`](#yarn-start)
    - [`yarn eject`](#yarn-eject)
- [API](#api)
  - [HTTP](#http)
    - [Create Appointment](#create-appointment)
    - [Update Appointment](#update-appointment)
    - [Get Appointments](#get-appointments)
    - [Get Appointment By Id](#get-appointment-by-id)
    - [Delete Appointment By Id](#delete-appointment-by-id)

<!-- /TOC -->

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Downloads and installs all project dependencies.

### `yarn start-server`

Runs the backend. Default port is `8181`, viz: [http://localhost:8181](http://localhost:8181)

### `yarn start`

Runs the frontend in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# API

## HTTP

The following endpoints are available. You can download the Postman Collection and Postman Environment to test

Postman Collection: [doc/postman_collection.json](doc/postman_collection.json)

### Create Appointment

Creates a new Appointment.


**Request**

`POST /appointments`

**JSON BODY**

| Key         | Required | Description                        |
| ----------- | -------- | ---------------------------------- |
| date        | true     | The date of the appointment        |
| time        | true     | The time of the appointment        |
| description | true     | The description of the appointment |

Example
`POST https://localhost:8181/appointments`

```json
{
    "date": "08-08-1234",
    "time": "11:45",
    "description": "Fuck this life!"
}
```

**Response**

```
[201 - Created]
```

**JSON Body**

```json
{
    "data": {
        "id": "9f0d63d8-b2a5-40c9-adc3-c2a5f6ae076e",
        "createdAt": "2021-07-19T21:32:54.433Z",
        "updatedAt": "2021-07-19T21:32:54.433Z",
        "date": "08-08-1234",
        "description": "Fuck this life!",
        "time": "11:45"
    }
}
```

### Update Appointment

Updates the given Appointment

**Request**

`PUT /appointments/{appointmentId}`

**JSON BODY**

| Key         | Required | Description                        |
| ----------- | -------- | ---------------------------------- |
| date        | false    | The date of the appointment        |
| time        | false    | The time of the appointment        |
| description | false    | The description of the appointment |

Example
`[POST] https://localhost:8181/appointments/{87cfe128-5dbf-4ca5-9671-bbe720a800f0}`

```json
{
    "date": "12-09-2021",
    "time": "12:30"
}
```

**Response**

Example:

```
[200 - OK]
```

```json
{
    "data": {
        "id": "87cfe128-5dbf-4ca5-9671-bbe720a800f0",
        "updatedAt": "2021-07-20T18:49:38.714Z",
        "date": "12-09-2021",
        "time": "12:30"
    }
}
```

### Get Appointments

Get a list of all appointments


**Request**

`GET /appointments`

**Query Params**

| Query Param | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| offset      | The page number to start getting the appointments from (0 index based) |
| limit       | The maximum number of results to get per page                          |

**Response**

Example:

`GET https://localhost:8181/appointments?limit=10&offset=1`

Response

```
[200 - OK]
```

```json
{
    "offset": 1,
    "limit": 10,
    "data": [
        {
            "id": "87cfe128-5dbf-4ca5-9671-bbe720a800f0",
            "description": "Fuck this life!",
            "time": "11:45",
            "date": "08-08-1234",
            "updatedAt": "2021-07-19T21:28:48.046Z",
            "createdAt": "2021-07-19T21:28:48.046Z"
        },
        {
            "id": "9f0d63d8-b2a5-40c9-adc3-c2a5f6ae076e",
            "description": "Fuck this life!",
            "time": "11:45",
            "date": "08-08-1234",
            "updatedAt": "2021-07-19T21:32:54.433Z",
            "createdAt": "2021-07-19T21:32:54.433Z"
        }
    ]
}
```

### Get Appointment By Id

Get a specific appointment identity by an id.


**Request**

`GET /appointments/{appointmentId}`

**Path Params**

| Path Param    | Description        |
| ------------- | ------------------ |
| appointmentId | The appointment id |

**Response**

Example:

`GET https://localhost:8181/appointments/87cfe128-5dbf-4ca5-9671-bbe720a800f0`

Response

```
[200 - OK]
```

```json
{
    "data": {
        "id": "87cfe128-5dbf-4ca5-9671-bbe720a800f0",
        "description": "Orthodontist - Check Up",
        "time": "11:45",
        "date": "08-08-1234",
        "updatedAt": "2021-07-19T21:32:54.433Z",
        "createdAt": "2021-07-19T21:32:54.433Z"
    }
}
```

### Delete Appointment By Id

Delete a specific appointment identity by an id.


**Request**

`DELETE /appointments/{appointmentId}`

**Path Params**

| Path Param    | Description        |
| ------------- | ------------------ |
| appointmentId | The appointment id |

**Response**

Example:

`DELETE https://localhost:8181/appointments/87cfe128-5dbf-4ca5-9671-bbe720a800f0`

Response

```
[200 - OK]
```

```json
```