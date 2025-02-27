Shopping List REST API

This is a simple Node.js-based REST API for managing a shopping list. The API allows users to create, read, update, and delete shopping list items stored in a JSON file.

Author

Name: Sibusiso

Email: sibusisok59@gmail.com

Deployed Link: https://nodeshopping.vercel.app/

How to Run the Application

Prerequisites:

Ensure you have Node.js installed on your computer.

Download or Clone the Repository:

git clone https://github.com/SbuKhoza/nodeshopping
cd nodeshopping

Run the Application:
Execute the following command in the terminal:

node app.js

Access the API:

The server will run on http://localhost:3000.

Use a tool like Postman or curl to test the API endpoints.

API Endpoints

GET /shopping-list

Description: Retrieve all items in the shopping list.

Response:

[
  {
    "id": 1,
    "name": "Milk",
    "quantity": 2
  }
]

POST /shopping-list

Description: Add a new item to the shopping list.

Request Body:

{
  "id": 2,
  "name": "Bread",
  "quantity": 1
}

Response:

{
  "id": 2,
  "name": "Bread",
  "quantity": 1
}

PUT /shopping-list

Description: Update an existing item in the shopping list.

Request Body:

{
  "id": 2,
  "name": "Whole Grain Bread",
  "quantity": 1
}

Response:

{
  "id": 2,
  "name": "Whole Grain Bread",
  "quantity": 1
}

DELETE /shopping-list

Description: Delete an item from the shopping list.

Request Body:

{
  "id": 2
}

Response:

{
  "message": "Item deleted"
}

Features

File-based Storage: Shopping list data is stored in a JSON file, making it easy to manage.

CRUD Operations: Fully functional Create, Read, Update, and Delete operations.

Lightweight: Built with core Node.js modules, no external dependencies required.

Contact

For questions or feedback, feel free to reach out to Sibusiso at sibusisok59@gmail.com.