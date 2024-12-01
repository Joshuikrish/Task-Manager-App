require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/task'); // Path to your task model

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        seedData();
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Sample data
const sampleTasks = [
    {
        title: "Complete Project Documentation",
        description: "Write the final documentation for the Task Manager app.",
        status: "pending",
        dueDate: new Date('2024-12-01'),
    },
    {
        title: "Test API Endpoints",
        description: "Use Postman to test all CRUD routes.",
        status: "completed",
        dueDate: new Date('2024-11-30'),
    },
    {
        title: "Add Authentication",
        description: "Implement JWT-based user authentication.",
        status: "pending",
        dueDate: new Date('2024-12-15'),
    },
];

// Function to insert data
const seedData = async () => {
    try {
        await Task.deleteMany(); // Clear the collection first (optional)
        const result = await Task.insertMany(sampleTasks); // Insert sample tasks
        console.log('Sample data inserted:', result);
        mongoose.disconnect(); // Disconnect from MongoDB
    } catch (err) {
        console.error('Error inserting sample data:', err);
        mongoose.disconnect(); // Ensure disconnection even if an error occurs
    }
};
