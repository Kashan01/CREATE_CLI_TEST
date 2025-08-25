Installation & Setup
bash
# 1. Install dependencies
npm install

# 2. Make the app executable (optional)
chmod +x index.js

# 3. Start using it!
node index manage add "Your first task"
📋 All Commands in One Place
➕ Add Tasks
bash
node index manage add "Buy groceries"
node index manage add "Finish homework"
node index manage add "Call mom at 5 PM"
👀 View Tasks
bash
# See all tasks
node index manage list all

# See only completed tasks
node index manage list done

# See only pending tasks
node index manage list pending
✅ Mark Tasks
bash
# Mark task as done
node index manage mark 1 done

# Mark task as pending (undo)
node index manage mark 1 pending
✏️ Update Tasks
bash
# Change task message
node index manage update 1 "Buy milk and eggs"
❌ Delete Tasks
bash
# Delete a task
node index manage delete 1
🆘 Get Help
bash
# Show detailed help
node index help

# Show basic help
node index --help
🎯 Examples in Action
bash
# Complete workflow example:
node index manage add "Buy groceries"          # Add task
node index manage add "Clean room"             # Add another
node index manage list all                     # See all tasks
node index manage mark 1 done                  # Complete first task
node index manage update 2 "Clean bedroom"     # Update second task
node index manage list pending                 # See what's left
node index manage delete 1                     # Remove completed task
📊 Task Format
Your tasks are stored as:

json
[
  {
    "taskID": 1,
    "message": "Buy groceries",
    "isDone": 0,
    "createdAt": "2023-12-07T10:30:00.000Z"
  }
]
taskID: Unique number for each task

message: Your task description

isDone: 0 = pending, 1 = completed

createdAt: When task was added

# File Structure

text
your-project/
├── app.js          # Main CLI application
├── todo.js         # Data storage & operations
├── todos.json      # Your tasks (auto-created)
├── package.json    # Project configuration
└── node_modules/   # Dependencies
