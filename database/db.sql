CREATE DATABASE Bakers;

USE Bakers;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE Usuario (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(40) NOT NULL,
  Apellidos VARCHAR(40) NOT NULL,
  Usuario VARCHAR(15) NOT NULL,
  Contraseña VARCHAR(15) NOT NULL
);

DESCRIBE Usuario;

INSERT INTO Usuario (id, Nombre, Apellidos, Usuario, Contraseña) 
  VALUES (1,'Fernando','Salome','fsalome','password1'),
		 (2,'Jean','Alvarez','jalvarez','password2');

SELECT * FROM Usuario;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES Usuario(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

SELECT * FROM links;

CREATE TABLE Productos (
	idProductos INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Nombre VARCHAR(45) NOT NULL,
	Precio DECIMAL(5,2) NOT NULL,
	Descripcion VARCHAR(100)
  );
