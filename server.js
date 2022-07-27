// import inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTable = require('console.table');
// calling Department constructor
const Department = require('./lib/Department');
const { getDept, newDept, deptArrFill, employeeArrFill, roleArrFill, updateRole, getEmployees } = require('./lib/helper');

let employeeArr = employeeArrFill();
let roleArr = roleArrFill();

// connect to mysql
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'randomgu123',
    database: 'employees_db'
  },
  console.log('Connected to employees_db')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Connection to database established.');
  startPrompt();
});

// startprompt
function startPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add employee',
        'Add a role',
        'Add a department',
        'Update employee role',
        'Quit'
      ]
    }
  ])
    .then(answers => {
      switch (answers.option) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Update employee role':
          updateEmployee();
          break;
        case 'Exit':
          end();
          break;
      }
    });
};

// ******VIEWING****** //

// view all employes
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  })
};

// view all roles
function viewRoles() {
  db.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  })
};

// view all departments
function viewDepartments() {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  })
};
