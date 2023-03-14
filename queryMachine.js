class queryMachine {
    constructor() {}

    selectDepartmentQuery() {
        return 'SELECT * FROM department;';
    }

    selectRoleQuery() {
        return 'SELECT * FROM role;';
    }

    selectEmployeeQuery() {
        return 'SELECT * FROM employee;';
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