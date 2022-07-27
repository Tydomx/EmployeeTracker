-- enables creation of a new DB and attempts to drop DB if it exists
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- dropping tables for clean slate 
DROP TABLE IF EXISTS department;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS employee;

-- create table for department, roles and employees
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  names VARCHAR(30)
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INTEGER,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES roles(id)
)
