const { prompt } = require('inquirer');
const inquirer = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');


init();

function init() {
    console.log('WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM! PLEASE SELECT ONE OF THE OPTIONS BELOW:');

    loadTrackingPrompts();
}

//Prompts for user
async function loadTrackingPrompts() {
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
                'View all roles',
                'Add a new role',
                'Remove a role',
                'View all departments',
                'Add a new department',
                'Remove a department',               
                'Exit',
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
                    removeDepartment();
                    break; 
                //case 'Exit':
                //    connection.end();
                //    break;
                default:
                    console.log(`Invalid action ${answer.action}`);
                    break;  
            }
        })
};

//function to view all employees in db
async function viewEmployees() {
    const employees = await db.findAllEmployees();
  
    console.log("\n");
    consoleTable(employees);
  
    loadMainPrompts();
  }
 
//function to add employees to db
  async function addEmployee() {
    const roles = await db.viewRoles();
    const employees = await db.viewEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.addEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
  }

  //function to update employee roles
  async function updateRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.viewRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadMainPrompts();
  }

  //function to remove employee
  async function removeEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);
  
    console.log("Removed employee from the database");
  
    loadMainPrompts();
  }

  //function to view all roles
  async function viewRoles() {
	const viewRoleData = await db.viewRoles();

	consoleTable(viewRoleData);
}

//function to add a role
async function addRole() {
	const departments = await db.viewDepartments();
	const departmentChoices = departments.map(({ id, name }) => ({
		name: name,
		value: id
	}));
	const role = await prompt([
		{
			name: 'title',
			message: 'What is the name of the role?'
		},
		{
			name: 'salary',
			message: 'What is the salary of the role?'
		},
		{
			type: 'list',
			name: 'department_id',
			message: 'Which department does the role belong to?',
			choices: departmentChoices
		}
	]);
	await db.addRole(role);
  console.log(`Added ${role.title} to the database`);
  loadMainPrompts();
}

//function to remove a role
async function removeRole() {
  const roles  = await db.viewRoles();

  const roleChoices = roles.map(({ id, name}) => ({
    name: name,
    value: id
  }));

  const { roleID } = await prompt({
    type: "list",
    name: "roleID",
    message:
      "Which role would you like to remove?",
    choices: roleChoices
  });

  await db.removeRole(roleID);

  console.log("Selected Role was removed from the database");
  loadMainPrompts();
}
  
//function to view all departments
async function viewDepartments() {
	const viewDepartmentData = await db.viewDepartments();

	consoleTable(viewDepartmentData);
}

//function to add a department
async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What department would you like to add?"
      }
    ]);
  
    await db.addDepartment(department);
  
    console.log(
      `Added new department (${department.name}) to the database`
    );
  
    loadMainPrompts();
  }

  //function to remove a department
  async function removeDepartment() {
    const departments = await db.viewDepartments();
  
    const departmentChoices = departments.map(({ id, name}) => ({
      name: name,
      value: id
    }));
  
    const { departmentID } = await prompt({
      type: "list",
      name: "departmentID",
      message:
        "Which department would you like to remove?",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentID);
  
    console.log("Department was removed from the database");
    loadMainPrompts();
  }
  