#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs')
const program = new Command();

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

// Default action if no command provided
program
  .action(() => {
    console.log('Welcome to the simple CLI!');
    console.log('Use --help to see available commands.');
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

// Parse command line arguments
program.parse();