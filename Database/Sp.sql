
drop procedure get_employees

CREATE OR REPLACE FUNCTION get_employees(
    in_filter_name VARCHAR(50),
    in_position_id INT DEFAULT NULL
)
RETURNS TABLE (
    employee_id INT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    description VARCHAR(200),
    position_desc VARCHAR(100),
    status VARCHAR(100),
    registration_date TIMESTAMP
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT E.employee_id, E.firstname, E.lastname, E.description, P.description AS position_desc, S.description AS status, E.registration_date
    FROM Employees E
    INNER JOIN Positions P ON E.position_id = P.position_id
    INNER JOIN EmployeesStatus S ON E.status_id = S.status_id
    WHERE (in_filter_name IS NULL OR (E.firstname ILIKE '%' || in_filter_name || '%' OR E.lastname ILIKE '%' || in_filter_name || '%'))
    AND (in_position_id IS NULL OR E.position_id = in_position_id)
    ORDER BY e.employee_id;
END;
$$;

SELECT * FROM get_employees('', NULL);


BEGIN;
-- Llamar al procedimiento y obtener el cursor
CALL get_employees(null, null, 'emp_cursor');
-- Recuperar los datos del cursor
FETCH ALL IN "emp_cursor";
COMMIT;