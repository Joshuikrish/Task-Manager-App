# Task Manager Application

![Node.js](https://img.shields.io/badge/Node.js-16.x-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-v5.x-brightgreen)
![Express](https://img.shields.io/badge/Express-v4.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Introduction
Task Manager Application is a simple and modular task management system built using Express.js and MongoDB. It provides:

- A RESTful API for interacting with tasks.
- A Command-Line Interface (CLI) for managing tasks interactively.
- It serves both as a backend server (API) and a CLI tool, allowing users to manage tasks through either interface.

**Features**:
- CRUD operations for tasks.
- API endpoints for integration.
- Pretty-printed CLI outputs for enhanced readability.
- Both API server and CLI feature to manage tasks seamlessly.

## Features
- Manage tasks with a simple CLI or RESTful API.
- MongoDB database integration for persistent storage.
- Modular structure for easy scalability.
- Environment configuration using `.env` file.
- Lightweight and developer-friendly.
- Serve as both an API server and a CLI tool for versatile task management.

## Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm (v8 or higher)

## Getting Started
Follow these steps to set up and run the project.

### Clone the repository
```bash
git clone https://github.com/Joshuikrish/Task-Manager-App
cd task-manager-app
```

### Install dependencies
```bash
npm install
```

### Configure environment variables
Create a MongoDB database named `task_manager`. All collections (e.g., `tasks`) will be stored within this database.< br / > 
Create a .env file in the root directory and add the following: 


```bash
PORT=3000
MONGO_URL = mongodb://localhost:27017/task_manager
```
or just copy the .env.example file to .env and change the variable inside

### Run the Application

Start the server:

```bash
node index.js
```

### To fill the sample data

Use the seeders (basically previous all data will be erased):

```bash
node seeders/seed.js
```

### Folder Structure
The following is the folder structure for the **Task Manager Application**:

```bash
task-manager-app/
├── models/         # MongoDB schemas
├── services/       # Business logic
├── controllers/    # Controller functions
├── seeders/        # Scripts to populate the database with sample data
├── .env.example    # Example environment file
├── package.json    # Project dependencies
├── README.md       # Project documentation
```

### API Usage
Access the API endpoints at http://localhost:3000/api/tasks. Use tools like Postman for interaction.

```bash
GET /api/tasks - Get all tasks
GET /api/tasks/:id - Get a specific task by ID
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update an existing task
DELETE /api/tasks/:id - Delete a task by ID
```

### License
This project is licensed under the MIT License. See LICENSE for details.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements.
```bash 
This update highlights that the application can serve as both a backend API server and a CLI tool for managing tasks. You can add this feature description to the **Features** and **Usage** sections.
```
