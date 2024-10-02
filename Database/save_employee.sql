CREATE OR REPLACE PROCEDURE save_employee(
    in_employee_id INT,
    in_firstname VARCHAR(50),
    in_lastname VARCHAR(50),
    in_description VARCHAR(200),
    in_position_id INT,
    in_status_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF in_employee_id = 0 THEN
        -- Insertar un nuevo empleado
        INSERT INTO Employees (firstname, lastname, description, position_id, status_id, registration_date)
        VALUES (in_firstname, in_lastname, in_description, in_position_id, in_status_id, DEFAULT);
    ELSE
        -- Actualizar el empleado existente
        UPDATE Employees
        SET firstname = in_firstname,
            lastname = in_lastname,
            description = in_description,
            position_id = in_position_id,
            status_id = in_status_id
        WHERE employee_id = in_employee_id;
    END IF;
END;
$$;


call sp_save_employee(1,'Juan','Perez','Desarrollador de software con 5 años de experiencia',1,1)

DROP PROCEDURE sp_save_employee(integer,character varying,character varying,character varying,integer,integer) 