// DEPENDENCIES
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// DATA
const menu  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'selection',
    }
];

const addDepartment  = [
    {
        type: 'input',
        message: 'Please enter the name of the new department:',
        name: 'deptName',
    }
];

const addRole  = [
    {
        type: 'input',
        message: 'Please enter the name of the new role:',
        name: 'roleName',
    },
    {
        type: 'input',
        message: 'Please enter the salary of the new role:',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'Please enter the department ID of the new role:',
        name: 'deptID',
    }
];

const addEmployee  = [
    {
        type: 'input',
        message: 'Please enter the first name of the new employee:',
        name: 'empFirstName',
    },
    {
        type: 'input',
        message: 'Please enter the last name of the new employee:',
        name: 'empLastName',
    },
    {
        type: 'input',
        message: "Please enter the new employee's role ID:",
        name: 'empRoleID',
    },
    {
        type: 'input',
        message: "Please enter the new employee's manager ID:",
        name: 'empMgrID',
    }
];

const updateEmployeeRole  = [
    {
        type: 'input',
        message: "Please enter the ID of the employee whose role is changing:",
        name: 'empIDUpdate',
    },
    {
        type: 'input',
        message: "Please enter the selected employee's new role ID:",
        name: 'empRoleUpdate',
    },
];

const restart  = [
    {
        type: 'confirm',
        message: "Would you like to continue?",
        name: 'continueCheck',
    }
];

// DB CONNECTION
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "dddddddd",
        database: "employee_data_db"
},
console.log(`Connected to the employee_data_db database.`)
);

// APP/PORT NUMBER
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use((req, res) => {
    res.status(404).end();
  });

// LISTENER
app.listen(PORT, () => {
    //console.log(`Example app listening at http://localhost:${PORT}`);
});

// FUNCTIONS
function runMenu() {
    inquirer.prompt(menu).then((response) => {
        switch (response.selection) {
            case "View All Departments":
                db.query('SELECT * FROM department;', function (err, results) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.table(results);
                    }
                });
                break;
            case "View All Roles":
                db.query('SELECT * FROM role;', function (err, results) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.table(results);
                    }
                });
                break;
            case "View All Employees":
                db.query('SELECT * FROM employee;', function (err, results) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.table(results);
                    }
                });
                break;
            case "Add A Department":
                inquirer.prompt(addDepartment).then((response) => {
                    let newDeptName = response.deptName;
                    if (newDeptName) {
                        db.query('INSERT INTO department (name) VALUES (?);', newDeptName, function (err, results) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`Successfully added ${newDeptName} as a department`);
                            }
                        });
                    }
                    else {
                        console.log("Invalid input - please try again!");
                    }
                });
                break;
            case "Add A Role":
                inquirer.prompt(addRole).then((response) => {
                    let newRoleName = response.roleName;
                    let newSalary = Number(response.salary);
                    let newDeptID = Number(response.deptID);
                    if (newRoleName && newSalary && newDeptID) {
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRoleName}", ${newSalary}, ${newDeptID});`, function (err, results) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`Successfully added ${newRoleName} as a role`);
                            }
                        });
                    }
                    else {
                        console.log("Invalid input - please try again!");
                    }
                });
                break;
            case "Add An Employee":
                inquirer.prompt(addEmployee).then((response) => {
                    let newEmpFirst = response.empFirstName;
                    let newEmpLast = response.empLastName;
                    let newEmpRole = Number(response.empRoleID);
                    let newEmpMgr = Number(response.empMgrID);
                    if (newEmpFirst && newEmpLast && newEmpRole && newEmpMgr) {
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmpFirst}", "${newEmpLast}", ${newEmpRole}, ${newEmpMgr});`, function (err, results) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`Successfully added ${newEmpFirst} ${newEmpLast} as an employee`);
                            }
                        });
                    }
                    else {
                        console.log("Invalid input - please try again!");
                    }
                });
                break;
            case "Update An Employee Role":
                inquirer.prompt(updateEmployeeRole).then((response) => {
                    let newIDUpdate = Number(response.empIDUpdate);
                    let newRoleUpdate = Number(response.empRoleUpdate);
                    if (newIDUpdate && newRoleUpdate) {
                        db.query(`UPDATE employee SET role_id = ${newRoleUpdate} WHERE id = ${newIDUpdate};`, function (err, results) {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`Successfully updated record for employee ID ${newIDUpdate}`);
                            }
                        });
                    }
                    else {
                        console.log("Invalid input - please try again!");
                    }
                });
                break;
        }
    });
}

// INITIALIZATIONS
runMenu();