const taskService = require('../services/task');
const chalk = require('chalk');

// CLI: Get all tasks
async function cliGetAllTasks() {
    try {
        const tasks = await taskService.getAllTasks();
        if (tasks.length === 0) {
            console.log(chalk.yellow('No tasks found.'));
        } else {
            console.log(chalk.cyan('All Tasks:'));
            console.log(JSON.stringify(tasks, null, 2));
        }
    } catch (error) {
        console.error(chalk.red('Error fetching tasks:', error.message));
    }
}

// CLI: Get task by ID
async function cliGetTaskById(taskId) {
    try {
        const task = await taskService.getTaskById(taskId);
        if (!task) {
            console.log(chalk.yellow('Task not found.'));
        } else {
            console.log(chalk.cyan('Task details:'));
            console.log(JSON.stringify(task, null, 2));
        }
    } catch (error) {
        console.error(chalk.red('Error fetching task:', error.message));
    }
}

// CLI: Create a new task
async function cliCreateTask(title, description, status, dueDate) {
    try {
        const task = await taskService.createTask(title, description, status, new Date(dueDate));
        console.log(chalk.green('Task created successfully!'));
        console.log(JSON.stringify(task, null, 2));
    } catch (error) {
        console.error(chalk.red('Error creating task:', error.message));
    }
}

// CLI: Update an existing task
async function cliUpdateTask(taskId, title, description, status, dueDate) {
    try {
        const task = await taskService.updateTask(taskId, title, description, status, new Date(dueDate));
        if (!task) {
            console.log(chalk.yellow('Task not found.'));
        } else {
            console.log(chalk.green('Task updated successfully!'));
            console.log(JSON.stringify(task, null, 2));
        }
    } catch (error) {
        console.error(chalk.red('Error updating task:', error.message));
    }
}

// CLI: Delete a task
async function cliDeleteTask(taskId) {
    try {
        const task = await taskService.deleteTask(taskId);
        if (!task) {
            console.log(chalk.yellow('Task not found.'));
        } else {
            console.log(chalk.green('Task deleted successfully!'));
        }
    } catch (error) {
        console.error(chalk.red('Error deleting task:', error.message));
    }
}

// Export the CLI functions
module.exports = {
    cliGetAllTasks,
    cliGetTaskById,
    cliCreateTask,
    cliUpdateTask,
    cliDeleteTask
};
