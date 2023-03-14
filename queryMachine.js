class queryMachine {
    constructor() {}

    selectDepartmentQuery(x) {
        if (x) {
            return `SELECT ${x} FROM department;`;
        }
        else {
            return `SELECT * FROM department;`;
        } 
    }

    lookupDepartmentQuery(x) {
        return `SELECT id FROM department WHERE name = "${x}";`
    }

    selectRoleQuery(x) {
        if (x) {
            return `SELECT ${x} FROM role;`;
        }
        else {
            return `SELECT * FROM role;`;
        } 
    }

    lookupRoleQuery(x) {
        return `SELECT id FROM role WHERE title = "${x}";`
    }

    selectEmployeeQuery(x) {
        if (x) {
            return `SELECT ${x} FROM employee;`;
        }
        else {
            return `SELECT * FROM employee;`;
        } 
    }

    selectEmployeeName() {
        return `SELECT first_name, last_name FROM employee`;
    }

    lookupEmployeeName(x, y) {
        return `SELECT id FROM employee WHERE first_name = "${x}" AND last_name = "${y}"`;
    }

    addDepartmentQuery(newDeptName)  {
        return `INSERT INTO department (name) VALUES ("${newDeptName}");`;
    }

    addRoleQuery(newRoleName, newSalary, newDeptID)  {
        return `INSERT INTO role (title, salary, department_id) VALUES ("${newRoleName}", ${newSalary}, ${newDeptID});`;
    }

    addEmployeeQuery(newEmpFirst, newEmpLast, newEmpRole, newEmpMgr)  {
        return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmpFirst}", "${newEmpLast}", ${newEmpRole}, ${newEmpMgr});`;
    }

    updateEmployeeRoleQuery(newRoleUpdate, newIDUpdate)  {
        return `UPDATE employee SET role_id = ${newRoleUpdate} WHERE id = ${newIDUpdate};`;
    }
}

module.exports = queryMachine;