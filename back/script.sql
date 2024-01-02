CREATE DATABASE db;

USE db;

CREATE TABLE
    types (
        id INT NOT NULL AUTO_INCREMENT,
        function VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    );

INSERT INTO types (function) VALUES ('administrador'), ('cliente');

CREATE TABLE
    people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        type_id INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (type_id) REFERENCES types (id)
    );

INSERT INTO
    people (name, email, password, type_id)
VALUES (
        'root',
        'root@gmail.com',
        'rootname',
        1
    );

CREATE TABLE
    address (
        id INT NOT NULL AUTO_INCREMENT,
        cep INT NOT NULL,
        uf VARCHAR (20) NOT NULL,
        city VARCHAR(20) NOT NULL,
        district VARCHAR(30) NOT NULL,
        street VARCHAR(50) NOT NULL,
        number INT NOT NULL,
        complement VARCHAR(30),
        people_id INT NOT NULL,
        FOREIGN KEY (people_id) REFERENCES people (id)
    );