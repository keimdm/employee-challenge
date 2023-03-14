/* temporarily diables foreign key checks so that initial values can be added*/
SET FOREIGN_KEY_CHECKS = 0;

/* sets initial values for department table*/
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Accounting");

/* sets initial values for role table*/
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", 65000.00, 1),
       ("Senior Engineer", 75000.00, 1),
       ("Lead Engineer", 90000.00, 1),
       ("Junior Analyst", 70000.00, 2),
       ("Senior Analyst", 80000.00, 2),
       ("Accountant", 90000.00, 3);

/* sets initial value for employee table*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 2, 2),
       ("Jessica", "Wang", 3, null),
       ("Sam", "Jenkins", 4, 4),
       ("Frank", "Jones", 5, null),
       ("Ashley", "Anderson", 6, null);

/* turns foreign key checks back on*/
SET FOREIGN_KEY_CHECKS = 1;