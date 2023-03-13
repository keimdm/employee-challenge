// DEPENDENCIES
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA
const menu  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'shape',
    }
];

const addDepartment  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'shape',
    }
];

const addRole  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'shape',
    }
];

const addEmployee  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'shape',
    }
];

const updateEmployee  = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'selection',
    }
];

// DB CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dddddddd",
    database: "employee_data_db"
});

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
    console.log(`Example app listening at http://localhost:${PORT}`);
});

// INITIALIZATION
inquirer.prompt(menu).then((response) => {
    switch (response.selection) {
        case "View All Departments":
            db.query('SELECT * FROM department', function (err, results) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(results);
                }
            });
            break;
    }
});