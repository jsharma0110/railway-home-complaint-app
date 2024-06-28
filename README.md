# Railway Complaint System

This project is a Railway Complaint System that allows users to submit and track complaints, workers to view assigned complaints, and admins to manage complaints and assign workers.

## Table of Contents

- [Installation](#installation)
- [Running the Backend Server](#running-the-backend-server)
- [API Documentation](#api-documentation)
  - [Create Complaint](#create-complaint)
  - [Read Complaints](#read-complaints)
  - [Update Complaint](#update-complaint)
  - [Delete Complaint](#delete-complaint)
  - [Get Worker Details](#get-worker-details)

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/jsharma0110/railway-home-complaint-app.git
   cd railway-home-complaint-app
Install Dependencies
sh
Copy code
npm install
Running the Backend Server
Navigate to the Backend Directory

sh
Copy code
cd src/backend
Start the Backend Server

sh
Copy code
node server.js
The server will start on http://localhost:3000.

API Documentation
Create Complaint
URL: /api/complaints
Method: POST
Headers: Content-Type: application/json
Body:
json
Copy code
{
  "quarterNumber": "123",
  "name": "John Doe",
  "phone": "1234567890",
  "email": "john@example.com",
  "complaintType": "Plumbing",
  "urgency": "Urgent",
  "complaint": "There is a leak in the bathroom.",
  "availabilityDate": "2024-07-01",
  "availabilityTime": "10 AM"
}
Response:
json
Copy code
{
  "ok": true,
  "id": "some-id",
  "rev": "some-revision"
}
Read Complaints
URL: /api/complaints
Method: GET
Response:
json
Copy code
[
  {
    "_id": "some-id",
    "_rev": "some-revision",
    "quarterNumber": "123",
    "name": "John Doe",
    "phone": "1234567890",
    "email": "john@example.com",
    "complaintType": "Plumbing",
    "urgency": "Urgent",
    "complaint": "There is a leak in the bathroom.",
    "availabilityDate": "2024-07-01",
    "availabilityTime": "10 AM",
    "status": "Submitted",
    "timestamp": "2024-06-28T12:34:56.789Z"
  }
]
Update Complaint
URL: /api/complaints/:id
Method: PUT
Headers: Content-Type: application/json
Body:
json
Copy code
{
  "status": "In Progress",
  "worker": "worker1"
}
Response:
json
Copy code
{
  "ok": true,
  "id": "some-id",
  "rev": "some-new-revision"
}
Delete Complaint
URL: /api/complaints/:id
Method: DELETE
Response:
json
Copy code
{
  "ok": true,
  "id": "some-id",
  "rev": "some-new-revision"
}
Get Worker Details
URL: /api/workers/:username
Method: GET
Response:
json
Copy code
{
  "username": "worker1",
  "name": "Jane Doe",
  "phone": "1234567890",
  "email": "jane@example.com",
  "expertise": "Plumbing"
}
Additional Information
For more details, please refer to the project's documentation or contact the repository owner.

