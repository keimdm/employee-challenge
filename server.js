// DEPENDENCIES
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const Query = require("./queryMachine.js");

// DATA
const queryMachine = new Query();

// question for initial prompt to decide action
const menu = [
    {
        type: 'list',
        message: 'Please select one of the following options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'selection',
    }
];

// additional prompts for add department options
const addDepartment = [
    {
        type: 'input',
        message: 'Please enter the name of the new department:',
        name: 'deptName',
    }
];

// additional prompts for add role option
let addRole = [
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
        type: 'list',
        message: 'Please enter the department ID of the new role:',
        choices: [],
        name: 'deptID',
    }
];

// additional prompts for add employee option
let addEmployee = [
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
        type: 'list',
        message: "Please select the new employee's role:",
        choices: [],
        name: 'empRoleID',
    },
    {
        type: 'list',
        message: "Please select the new employee's manager:",
        choices: [],
        name: 'empMgrID',
    }
];

// additional prompts for update employee role option
let updateEmployeeRole = [
    {
        type: 'list',
        message: "Please select the employee whose role is changing:",
        choices: [],
        name: 'empIDUpdate',
    },
    {
        type: 'list',
        message: "Please select the employee's new role:",
        choices: [],
        name: 'empRoleUpdate',
    },
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
    //prompts user for desired action
    inquirer.prompt(menu).then((response) => {
        // switch statement leads to different actions depending on selected option
        switch (response.selection) {
            case "View All Departments":
                // runs  query to show all departments
                db.query(queryMachine.selectDepartmentQuery(), function (err, results) {
                    if (err) {
                        console.error(err);
                        runMenu();
                    }
                    else {
                        console.table(results);
                        runMenu();
                    }
                });
                break;
            case "View All Roles":
                // runs query to show all roles
                db.query(queryMachine.selectRoleQuery(), function (err, results) {
                    if (err) {
                        console.error(err);
                        runMenu();
                    }
                    else {
                        console.table(results);
                        runMenu();
                    }
                });
                break;
            case "View All Employees":
                // runs query to show all employees
                db.query(queryMachine.selectEmployeeQuery(), function (err, results) {
                    if (err) {
                        console.error(err);
                        runMenu();
                    }
                    else {
                        console.table(results);
                        runMenu();
                    }
                });
                break;
            case "Add A Department":
                // runs additional inquirer prompts to gather inputs
                inquirer.prompt(addDepartment).then((response) => {
                    let newDeptName = response.deptName;
                    if (newDeptName) {
                        // query to insert  new department
                        db.query(queryMachine.addDepartmentQuery(newDeptName), function (err, results) {
                            if (err) {
                                console.error(err);
                                runMenu();
                            }
                            else {
                                console.log(`Successfully added ${newDeptName} as a department`);
                                runMenu();
                            }
                        });
                    }
                    else {
                        console.log("Invalid input - please try again!");
                        runMenu();
                    }
                });
                break;
            case "Add A Role":
                let newRoleName;
                let newSalary;
                // look up list of department names to be used in inquirer prompt
                db.promise().query(queryMachine.selectDepartmentQuery("name"))
                    .then((response) => {
                        for (i = 0; i < response[0].length; i++) {
                            addRole[2].choices.push(response[0][i].name);
                        }
                        // run additional inquirer prompts updated to include department names
                        return inquirer.prompt(addRole);
                    })
                    .then((response) => {
                        addRole[2].choices = [];
                        newRoleName = response.roleName;
                        newSalary = Number(response.salary);
                        // look up department ID associatd with selected department name
                        return db.promise().query(queryMachine.lookupDepartmentQuery(response.deptID));
                    })
                    .then((response) => {
                        if (newRoleName && newSalary && response[0][0].id) {
                            // run query to add new role to role table
                            return db.promise().query(queryMachine.addRoleQuery(newRoleName, newSalary, response[0][0].id));
                        }
                        else {
                            return new Error("Invalid input - please try again!");
                        }
                    })
                    .then((response) => {
                        if (response instanceof Error) {
                            console.log(response);
                        }
                        else {
                            console.log(`Successfully added ${newRoleName} as a role`);
                        }
                        runMenu();
                    });
                break;
            case "Add An Employee":
                let newEmpFirst;
                let newEmpLast;
                let newEmpRole;
                let newEmpMgr;
                // look up list of job titles to use in inquirer prompt
                db.promise().query(queryMachine.selectRoleQuery("title"))
                    .then((response) => {
                        for (i = 0; i < response[0].length; i++) {
                            addEmployee[2].choices.push(response[0][i].title);
                        }
                        // look up list of employee names to use in inquirer prompt
                        return db.promise().query(queryMachine.selectEmployeeName())
                    })
                    .then((response) => {
                        for (i = 0; i < response[0].length; i++) {
                            addEmployee[3].choices.push(response[0][i].first_name + " " + response[0][i].last_name);
                        }
                        // run additional inquirer prompts updated with job titles and employee names
                        return inquirer.prompt(addEmployee);
                    })
                    .then((response) => {
                        addEmployee[2].choices = [];
                        addEmployee[3].choices = [];
                        newEmpFirst = response.empFirstName;
                        newEmpLast = response.empLastName;
                        newEmpMgr = response.empMgrID;
                        // look up role id based on selected job title
                        return db.promise().query(queryMachine.lookupRoleQuery(response.empRoleID));
                    })
                    .then((response) => {
                        newEmpRole = response[0][0].id;
                        let empMgrLookup = newEmpMgr.split(" ");
                        // look up employee id based on selected manager name
                        return db.promise().query(queryMachine.lookupEmployeeName(empMgrLookup[0], empMgrLookup[1]))
                    })
                    .then((response) => {
                        if (newEmpFirst && newEmpLast && newEmpRole && response[0][0].id) {
                            // run query to add new employee to table
                            return db.promise().query(queryMachine.addEmployeeQuery(newEmpFirst, newEmpLast, newEmpRole, response[0][0].id));
                        }
                        else {
                            return new Error("Invalid input - please try again!");
                        }
                    })
                    .then((response) => {
                        if (response instanceof Error) {
                            console.log(response);
                        }
                        else {
                            console.log(`Successfully added ${newEmpFirst} ${newEmpLast} as an employee`);
                        }
                        runMenu();
                    });
                break;
            case "Update An Employee Role":
                let newIDUpdate;
                let newRoleUpdate;
                // look up list of employee names for inquirer prompt
                db.promise().query(queryMachine.selectEmployeeName())
                    .then((response) => {
                        for (i = 0; i < response[0].length; i++) {
                            updateEmployeeRole[0].choices.push(response[0][i].first_name + " " + response[0][i].last_name);
                        }
                        // look up list of role titles for inquirer prompt
                        return db.promise().query(queryMachine.selectRoleQuery("title"));
                    })
                    .then((response) => {
                        for (i = 0; i < response[0].length; i++) {
                            updateEmployeeRole[1].choices.push(response[0][i].title);
                        }
                        // run additional inquirer prompt including role titles and employee names
                        return inquirer.prompt(updateEmployeeRole);
                    })
                    .then((response) => {
                        updateEmployeeRole[0].choices = [];
                        updateEmployeeRole[1].choices = [];
                        newRoleUpdate = response.empRoleUpdate;
                        let empNameLookup = response.empIDUpdate.split(" ");
                        // look up employee id based on selected employee name
                        return db.promise().query(queryMachine.lookupEmployeeName(empNameLookup[0], empNameLookup[1]));
                    })
                    .then((response) => {
                        newIDUpdate = response[0][0].id;
                        // look up selected role id based on selected role title
                        return db.promise().query(queryMachine.lookupRoleQuery(newRoleUpdate));
                    })
                    .then((response) => {
                        if (newIDUpdate && response[0][0].id) {
                            // run query to edit employee entry with new role id
                            return db.promise().query(queryMachine.updateEmployeeRoleQuery(response[0][0].id, newIDUpdate));
                        }
                        else {
                            return new Error("Invalid input - please try again!");
                        }
                    })
                    .then((response) => {
                        if (response instanceof Error) {
                            console.log(response);
                        }
                        else {
                            console.log(`Successfully updated`);
                        }
                        runMenu();
                    });
                break;
        }
    });
}

// INITIALIZATIONS
runMenu();