class queryMachine {
    constructor() {}

    // returns either formatted view or one specific column from department
    selectDepartmentQuery(x) {
        if (x) {
            return `SELECT ${x} FROM department;`;
        }
        else {
            return `SELECT name AS department_name, id FROM department;`;
        } 
    }

    // looks up id of a specific department name
    lookupDepartmentQuery(x) {
        return `SELECT id FROM department WHERE name = "${x}";`
    }

    // returns either formatted view or one specific column from role
    selectRoleQuery(x) {
        if (x) {
            return `SELECT ${x} FROM role;`;
        }
        else {
            return `SELECT title AS job_title, role.id, name AS department_name, salary FROM role INNER JOIN department ON role.department_id = department.id;`;
        } 
    }

    // looks up id of a specific role title
    lookupRoleQuery(x) {
        return `SELECT id FROM role WHERE title = "${x}";`
    }

    // returns either formatted view or one specific column from employee
    selectEmployeeQuery(x) {
        if (x) {
            return `SELECT ${x} FROM employee;`;
        }
        else {
            return `SELECT
            EMPS.id,
            EMPS.first_name,
            EMPS.last_name,
            role.title AS job_title,
            department.name AS department_name,
            role.salary,
            MGRS.first_name AS manager_first_name,
            MGRS.last_name AS manager_last_name
        FROM employee EMPS
        LEFT JOIN role ON EMPS.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee MGRS ON EMPS.manager_id = MGRS.id;`;
        } 
    }

    // returns list of employee first and last names
    selectEmployeeName() {
        return `SELECT first_name, last_name FROM employee`;
    }

    // returns id of specified employee first and last name
    lookupEmployeeName(x, y) {
        return `SELECT id FROM employee WHERE first_name = "${x}" AND last_name = "${y}"`;
    }

    // query to add department
    addDepartmentQuery(newDeptName)  {
        return `INSERT INTO department (name) VALUES ("${newDeptName}");`;
    }

    // query to add role
    addRoleQuery(newRoleName, newSalary, newDeptID)  {
        return `INSERT INTO role (title, salary, department_id) VALUES ("${newRoleName}", ${newSalary}, ${newDeptID});`;
    }

    // query to add employee
    addEmployeeQuery(newEmpFirst, newEmpLast, newEmpRole, newEmpMgr)  {
        return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmpFirst}", "${newEmpLast}", ${newEmpRole}, ${newEmpMgr});`;
    }

    // query to update employee role
    updateEmployeeRoleQuery(newRoleUpdate, newIDUpdate)  {
        return `UPDATE employee SET role_id = ${newRoleUpdate} WHERE id = ${newIDUpdate};`;
    }
}

module.exports = queryMachine;