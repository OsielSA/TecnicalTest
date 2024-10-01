
CREATE TABLE Employees (
    employee_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    position_id INT NOT NULL,
    status_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (position_id) REFERENCES Positions(position_id),
    FOREIGN KEY (status_id) REFERENCES EmployeesStatus(status_id)
);


CREATE TABLE Positions (
    position_id SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE EmployeesStatus (
    status_id SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL
);


INSERT INTO EmployeesStatus (description) VALUES
('Activo'), ('Inactivo');

INSERT INTO Positions (description) VALUES
('Desarrollador de Software'),
('Gerente de Proyectos'),
('Analista de Sistemas'),
('Diseñador UX/UI'),
('Administrador de Bases de Datos'),
('Ingeniero de Soporte Técnico'),
('Product Manager'),
('Tester/QA'),
('Especialista en Marketing Digital'),
('Analista de Datos');

INSERT INTO Employees (firstname, lastname, description, position_id, status_id, registration_date) VALUES
('Juan', 'Pérez', 'Desarrollador de software con 5 años de experiencia', 1, 1, DEFAULT),
('María', 'González', 'Gerente de proyectos con enfoque en tecnología', 2, 1, DEFAULT),
('Luis', 'Hernández', 'Analista de sistemas especializado en seguridad', 3, 1, DEFAULT),
('Ana', 'Martínez', 'Diseñadora UX/UI con habilidades en prototipado', 4, 1, DEFAULT),
('Pedro', 'López', 'Administrador de bases de datos con experiencia en PostgreSQL', 5, 2, DEFAULT),
('Sofía', 'Ramírez', 'Ingeniera de soporte técnico', 6, 1, DEFAULT),
('David', 'Morales', 'Product manager con experiencia en desarrollo ágil', 7, 1, DEFAULT),
('Laura', 'Sánchez', 'Tester con enfoque en calidad de software', 8, 2, DEFAULT),
('Carlos', 'Torres', 'Especialista en marketing digital', 9, 1, DEFAULT),
('Elena', 'Díaz', 'Analista de datos con enfoque en análisis predictivo', 10, 1, DEFAULT),
('Andrés', 'Jiménez', 'Desarrollador front-end con experiencia en React', 1, 1, DEFAULT),
('Lucía', 'Flores', 'Desarrolladora back-end especializada en Node.js', 1, 1, DEFAULT),
('Fernando', 'Castro', 'Gerente de TI con experiencia en liderazgo', 2, 1, DEFAULT),
('Cristina', 'Núñez', 'Analista de calidad con 3 años de experiencia', 8, 1, DEFAULT),
('Oscar', 'Ríos', 'Consultor en tecnología de la información', 3, 1, DEFAULT),
('Natalia', 'Vázquez', 'Ingeniera de DevOps con experiencia en CI/CD', 6, 1, DEFAULT),
('Gabriel', 'Cruz', 'Asistente administrativo con habilidades organizativas', 2, 2, DEFAULT),
('Valeria', 'Mendoza', 'Analista financiero con experiencia en análisis de datos', 10, 1, DEFAULT),
('Raúl', 'Salazar', 'Gerente de producto con experiencia en metodologías ágiles', 7, 1, DEFAULT),
('Marta', 'Ortega', 'Especialista en SEO y marketing digital', 9, 1, DEFAULT);


select * from Positions


select employee_id, 
	   firstname,
	   lastname, 
	   P.description as position, 
	   S.description as status
from Employees E
inner join EmployeesStatus S
	on (E.status_id = S.status_id)
inner join Positions P
	on (E.position_id = P.position_id)
order by status, employee_id











