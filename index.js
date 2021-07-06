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
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  runTracker();
});

function init() {
    console.log('WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM! PLEASE SELECT ONE OF THE OPTIONS BELOW:');

    loadTrackingPrompts();
}

//Prompts for user
const loadTrackingPrompts = () => {
    inquirer
        .prompt( {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all employees',
                'Add a new employee',
                'Update an employee role',
                'Remove an employee',
                new inquirer.Separator(),
                'View all roles',
                'Add a new role',
                'Remove a role',
                new inquirer.Separator(),
                'View all departments',
                'Add a new department',
                'Remove a department',               
                new inquirer.Separator(),
                'Exit',
                new inquirer.Separator()
                ]
              })

        //Calling the corresponding functions based on user choice
        then((answer) => {
            switch(answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a new employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break;
                case 'Remove an employee':
                    removeEmployee();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add a new role':
                    addRole();
                    break;
                case 'Remove a role':
                    removeRole();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'Add a new department':
                    addDepartment();
                    break;
                case 'Remove a department':
                    removerDepartment();
                    break;   
            }
        })

}
 