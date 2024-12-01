const Task = require('../models/task'); // Assuming Task model is in the models folder

// Get all tasks
async function getAllTasks() {
    try {
        return await Task.find();
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
}

// Get task by ID
async function getTaskById(taskId) {
    try {
        return await Task.findById(taskId);
    } catch (error) {
        throw new Error('Error fetching task: ' + error.message);
    }
}

// Create a task
async function createTask(title, description, status, dueDate) {
    try {
        const task = new Task({
            title,
            description,
            status,
            dueDate: new Date(dueDate)
        });
        return await task.save();
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
}

// Update a task
async function updateTask(taskId, title, description, status, dueDate) {
    try {
        return await Task.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                status,
                dueDate: new Date(dueDate)
            },
            { new: true }
        );
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
}

// Delete a task
async function deleteTask(taskId) {
    try {
        return await Task.findByIdAndDelete(taskId);
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
