#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs')
const program = new Command();
const TodoManager = require('./todo.js');

const todoManager = new TodoManager();


// Setup basic program info
program
  .name('simple-cli')
  .description('A simple CLI tool using commander')
  .version('1.0.0');

// Basic command that prints a message
program
  .command('hello')
  .description('Print a hello message')
  .action(() => {
    console.log('Hello from commander!');
  });

// Command with argument
program
  .command('greet <name>')
  .description('Greet someone by name')
  .action((name) => {
    console.log(`Hello Gandu, ${name}!`);
  });

// Command with option
program
  .command('message')
  .description('Print a message with options')
  .option('-c, --capitalize', 'Capitalize the message')
  .action((options) => {
    let message = 'this is a simple message';
    if (options.capitalize) {
      message = message.toUpperCase();
    }
    console.log(message);
  });

  // Read total words in file....
  program
  .command('count <filepath>')
  .description('Total word count in a file...')
  .action((filepath) => {

   fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err.message);
    return;
  }
  let count = data.split(" ").length
  console.log(`There are total ${count} word in this file.`);
});
});

//CURD OPERATIOINS USING CLI



function displayTodos(todos) {
    if (todos.length === 0) {
        console.log('No tasks found.');
        return;
    }

    todos.forEach(task => {
        const status = task.isDone === 1 ? '✅' : '⏳';
        console.log(`${status} ${task.taskID}. ${task.message}`);
        if (task.createdAt) {
            console.log(`   Created: ${new Date(task.createdAt).toLocaleString()}`);
        }
        if (task.updatedAt) {
            console.log(`   Updated: ${new Date(task.updatedAt).toLocaleString()}`);
        }
        console.log('─'.repeat(50));
    });
}

// Main manage command
program
    .command('manage <operation> <keyword...>')
    .description('Manage tasks: add, delete, mark, update, list')
    .action((operation, keyword) => {
        const action = keyword.join(' ');
        
        switch (operation.toLowerCase()) {
            case 'add':
                const newTask = todoManager.addTodo(action);
                console.log(`✅ Added task #${newTask.taskID}: ${newTask.message}`);
                break;

            case 'delete':
                const deleted = todoManager.deleteTodo(action);
                if (deleted) {
                    console.log(`✅ Deleted task #${action}`);
                } else {
                    console.log(`❌ Task with ID ${action} not found`);
                }
                break;

            case 'mark':
                const parts = action.split(' ');
                const taskId = parts[0];
                const status = parts[1] || 'done';
                
                const markedTask = todoManager.markTodo(
                    taskId, 
                    status.toLowerCase() === 'done' ? 1 : 0
                );
                
                if (markedTask) {
                    const statusText = markedTask.isDone === 1 ? 'completed' : 'pending';
                    console.log(`✅ Marked task #${taskId} as ${statusText}`);
                } else {
                    console.log(`❌ Task with ID ${taskId} not found`);
                }
                break;

            case 'update':
                const updateParts = action.split(' ');
                const updateId = updateParts[0];
                const newMessage = updateParts.slice(1).join(' ');
                
                const updatedTask = todoManager.updateTodo(updateId, newMessage);
                if (updatedTask) {
                    console.log(`✅ Updated task #${updateId}: ${updatedTask.message}`);
                } else {
                    console.log(`❌ Task with ID ${updateId} not found`);
                }
                break;

            case 'list':
                const filter = action.toLowerCase() || 'all';
                const validFilters = ['all', 'done', 'pending'];
                
                if (!validFilters.includes(filter)) {
                    console.log('❌ Invalid filter. Use: all, done, or pending');
                    return;
                }
                
                const todos = todoManager.listTodos(filter);
                console.log(`\n📋 Tasks (${filter}):`);
                console.log('='.repeat(50));
                displayTodos(todos);
                console.log(`Total: ${todos.length} task(s)`);
                break;

            default:
                console.log('❌ Unknown operation. Use: add, delete, mark, update, or list');
                console.log('Example: todo manage add "Buy groceries"');
                console.log('Example: todo manage delete 1');
                console.log('Example: todo manage mark 1 done');
                console.log('Example: todo manage update 1 "Buy milk"');
                console.log('Example: todo manage list pending');
        }
    });



//Help in todo
// Help command for better usability
program
    .command('help')
    .description('Show detailed help')
    .action(() => {
        console.log(`
📝 Todo CLI - Usage Examples:
        
Add a task:
  node index manage add "Buy groceries"
  node index manage add "Finish homework"

Delete a task:
  node index manage delete 1
  node index manage delete 2

Mark task as done/pending:
  node index manage mark 1 done
  node index manage mark 2 pending

Update a task:
  node index manage update 1 "Buy milk instead"
  node index manage update 2 "Finish math homework"

List tasks:
  node index manage list all
  node index manage list done
  node index manage list pending

Show this help:
  node index help
        `);
    });


// Parse command line arguments
program.parse();