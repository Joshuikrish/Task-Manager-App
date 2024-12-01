const taskService = require('../services/task'); // Import the service

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = await taskService.createTask(title, description, status, dueDate);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = await taskService.updateTask(req.params.id, title, description, status, dueDate);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
