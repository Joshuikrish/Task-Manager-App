require('dotenv').config();
const express = require('express');
const figlet = require("figlet");
const chalk = require("chalk");
const app = express();
const taskService = require('./services/task')
const readline = require('readline');
const mongoose = require('mongoose');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./controllers/taskController');
const {cliGetAllTasks, cliGetTaskById, cliCreateTask, cliUpdateTask, cliDeleteTask} = require('./controllers/taskcliController');
const port = process.argv[2] || process.env.PORT;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
    .catch(err => console.log(err));

console.log(
    figlet.textSync("Task Manager", { horizontalLayout: "full" })
);

console.log(
    chalk.greenBright(`
Welcome to the ${chalk.bold.yellow("Task Manager Application")}!
-----------------------------------------
${chalk.cyan("Features:")}
  - Manage your tasks effectively.
  - Simple, lightweight Express.js application.
  - Easily customizable port configuration using ${chalk.yellow(".env")}.
  - Dynamic and extendable for future enhancements.
  - Basic CRUD operations for tasks.
  - Minimalistic UI for better user experience.

To get started using the api:

A. ${chalk.magenta("Open your browser")} and navigate to ${chalk.underline("http://localhost:" + port + "/")}.

${chalk.redBright("Happy task managing!")}

To get started using the cli:

`)
);
function promptAction() {
    rl.question('Choose an action (1-5) or q to quit:\n1. Get All Tasks\n2. Get Task by ID\n3. Create Task\n4. Update Task\n5. Delete Task\n> ', async (choice) => {
        switch (choice) {
            case '1':
                await cliGetAllTasks();
                break;
            case '2':
                rl.question('Enter Task ID: ', async (id) => {
                    await cliGetTaskById(id);
                    promptAction();
                });
                return;
            case '3':
                rl.question('Enter Title: ', (title) => {
                    rl.question('Enter Description: ', (description) => {
                        rl.question('Enter Status (pending/completed): ', (status) => {
                            rl.question('Enter Due Date (yyyy-mm-dd): ', async (dueDate) => {
                                await cliCreateTask(title, description, status, dueDate);
                                promptAction();
                            });
                        });
                    });
                });
                return;
            case '4':
                rl.question('Enter Task ID to update: ', (id) => {
                    rl.question('Enter New Title: ', (title) => {
                        rl.question('Enter New Description: ', (description) => {
                            rl.question('Enter New Status (pending/completed): ', (status) => {
                                rl.question('Enter New Due Date (yyyy-mm-dd): ', async (dueDate) => {
                                    await cliUpdateTask(id, title, description, status, dueDate);
                                    promptAction();
                                });
                            });
                        });
                    });
                });
                return;
            case '5':
                rl.question('Enter Task ID to delete: ', async (id) => {
                    await cliDeleteTask(id);
                    promptAction();
                });
                return;
            case 'q':
            case 'Q':
                console.log('Goodbye!\n');
                // rl.close();
                rl.question('Do you want to enter the cli again? (y/n): ', (answer) => {
                    if (answer === 'y' || answer === 'Y') {
                        promptAction();
                    } else {
                        console.log('Server is still on !! press ctrl + c to exit the server\n');
                        rl.close();
                    }
                });
                return;
            default:
                console.log('Invalid option. Please try again.');
                break;
        }
        promptAction();
    });
}

promptAction();
app.set('json spaces', 2);
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Task Manager Application!',
        api: {
            tasks: {
                getAllTasks: 'GET /api/tasks',
                getTaskById: 'GET /api/tasks/:id',
                createTask: 'POST /api/tasks',
                updateTask: 'PUT /api/tasks/:id',
                deleteTask: 'DELETE /api/tasks/:id'
            }
        }
    })
});

app.get('/api/tasks', getAllTasks);
app.post('/api/tasks', createTask);
app.get('/api/tasks/:id', getTaskById);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);
app.listen(port);