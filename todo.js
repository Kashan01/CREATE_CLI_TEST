// todo.js - Data storage and management
const fs = require('fs');
const path = require('path');

const TODO_FILE = path.join(__dirname, 'todo.json');

class TodoManager {
    constructor() {
        this.data = this.loadTodos();
    }

    loadTodos() {
        try {
            if (fs.existsSync(TODO_FILE)) {
                const fileData = fs.readFileSync(TODO_FILE, 'utf8');
                return JSON.parse(fileData);
            }
        } catch (error) {
            console.error('Error loading todos:', error.message);
        }
        return [];
    }

    saveTodos() {
        try {
            fs.writeFileSync(TODO_FILE, JSON.stringify(this.data, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving todos:', error.message);
            return false;
        }
    }

    // Add a new todo
    addTodo(message) {
        const newTask = {
            taskID: this.data.length > 0 ? Math.max(...this.data.map(t => t.taskID)) + 1 : 1,
            message: message,
            isDone: 0,
            createdAt: new Date().toISOString()
        };
        this.data.push(newTask);
        this.saveTodos();
        return newTask;
    }

    // Delete a todo
    deleteTodo(id) {
        const taskId = parseInt(id);
        const initialLength = this.data.length;
        this.data = this.data.filter(task => task.taskID !== taskId);
        
        if (this.data.length < initialLength) {
            this.saveTodos();
            return true;
        }
        return false;
    }

    // Mark todo as done/undone
    markTodo(id, isDone = 1) {
        const taskId = parseInt(id);
        const task = this.data.find(task => task.taskID === taskId);
        
        if (task) {
            task.isDone = isDone;
            task.updatedAt = new Date().toISOString();
            this.saveTodos();
            return task;
        }
        return null;
    }

    // Update todo message
    updateTodo(id, newMessage) {
        const taskId = parseInt(id);
        const task = this.data.find(task => task.taskID === taskId);
        
        if (task) {
            task.message = newMessage;
            task.updatedAt = new Date().toISOString();
            this.saveTodos();
            return task;
        }
        return null;
    }

    // List all todos
    listTodos(filter = 'all') {
        switch (filter) {
            case 'done':
                return this.data.filter(task => task.isDone === 1);
            case 'pending':
                return this.data.filter(task => task.isDone === 0);
            default:
                return this.data;
        }
    }

    // Clear all todos
    clearAll() {
        this.data = [];
        this.saveTodos();
        return true;
    }

    // Get todo by ID
    getTodoById(id) {
        return this.data.find(task => task.taskID === parseInt(id));
    }
}

module.exports = TodoManager;