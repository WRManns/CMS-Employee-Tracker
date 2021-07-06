const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'root',
  database: 'top_songsDB',
});

connection.connect((err) => {
  if (err) throw err;
  runTracker();
});

function init() {
    console.log('WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM! PLEASE SELECT ONE OF THE OPTIONS BELOW:');

    loadTrackingPrompts();
}

async function loadTrackingPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name:"Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    NAME:"Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                  },
                  {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                  },
                  {
                    name: "Add Role",
                    value: "ADD_ROLE"
                  },
                  {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                  },
                  {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                  },
                  {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                  },
                  {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                  },
                  {
                    name: "Quit",
                    value: "QUIT"
                  }
                ]
              }
            ]);


}
 