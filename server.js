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
        case 'Quit':
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

// ******ADDING****** //
// add department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: function (name) {
        if (!name) {
          console.log('Please enter a name')
          return false;
        }
        return true;
      }
    }
  ])
    .then((ans) => {
      const department = new Department(ans.name);
      newDept(department);
      console.log('Department added');
      departments = getDept();
      deptArr = deptArrFill();
      return startPrompt();
    })
};


// add new role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addRole',
      message: 'What role would you like to add?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department ID?'
    }
  ])
    .then((ans) => {
      var sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

      db.query(sql, [ans.addRole, ans.salary, ans.department_id], (err, res) => {
        if (err) throw err;
        console.log('New role added');
      })
      startPrompt();
    })
};


// add new employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: function (firstName) {
        if (!firstName) {
          console.log('Please enter a name');
          return false;
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: function (lastName) {
        if (!lastName) {
          console.log('Please enter a name');
          return false;
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's role?",
      choices: roleArr
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: [{ name: 'No manager', value: null }].concat(employeeArr)
    },
  ])
    .then((ans) => {
      var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

      db.query(sql, [ans.firstName, ans.lastName, ans.role, ans.manager], (err, res) => {
        if (err) throw err;
        console.log('New employee added');
      })
      return startPrompt();
    })
};

// ******UPDATING****** //
// update employee role
function updateEmployee() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to update?',
      choices: employeeArr
    },
    {
      type: 'list',
      name: 'newRole',
      message: "What is the employee's new role?",
      choices: roleArr
    }
  ])
    .then((ans) => {
      updateRole(ans);
      console.log('Role updated!');
      employees = getEmployees();
      employeeArr = employeeArrFill();
      return startPrompt();
    })
};


function end() {
  console.log('Good bye');
  setTimeout((function () {
    return process.exit(22);
  }), 0);
};
