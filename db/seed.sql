
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", 65000.00, 1),
       ("Senior Engineer", 75000.00, 1),
       ("Lead Engineer", 90000.00, 1),
       ("Junior Analyst", 70000.00, 2),
       ("Senior Analyst", 80000.00, 2),
       ("Accountant", 90000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 2, 2),
       ("Jessica", "Wang", 3, null),
       ("Sam", "Jenkins", 4, 4),
       ("Frank", "Jones", 5, null),
       ("Ashley", "Anderson", 6, null);

SET FOREIGN_KEY_CHECKS = 1;