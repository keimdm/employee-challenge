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
}

module.exports = queryMachine;