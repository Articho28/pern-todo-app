DROP TABLE todo;
DROP DATABASE perntodo;

CREATE DATABASE perntodo;


CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);