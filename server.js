// DEPENDENCIES
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA

// DB CONNECTION
mysql.createConnection({
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

app.get('*', (req, res) => {
    res.send("Hello World");
});

app.use((req, res) => {
    res.status(404).end();
  });

// LISTENER
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
