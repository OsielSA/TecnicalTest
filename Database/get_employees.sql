
drop procedure get_employees(VARCHAR, INT)

CREATE OR REPLACE FUNCTION get_employees(
    in_filter_name VARCHAR(50),
    in_position_name VARCHAR(50),
    in_status_id INT
)
RETURNS TABLE (
    employee_id INT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    description VARCHAR(200),
    position_id INT,
    status_id INT
) 
LANGUAGE plpgsql
AS $$
DECLARE
    var_status_id INT;
BEGIN
    var_status_id := COALESCE(in_status_id, 1);

    RETURN QUERY
    SELECT E.employee_id, E.firstname, E.lastname, E.description, E.position_id, E.status_id
    FROM Employees E
    INNER JOIN Positions P ON (E.position_id = P.position_id)
    WHERE (in_filter_name IS NULL OR (E.firstname ILIKE '%' || in_filter_name || '%' OR E.lastname ILIKE '%' || in_filter_name || '%'))
        AND (in_position_name IS NULL OR P.description ILIKE '%' || in_position_name || '%')
        AND (E.status_id = var_status_id)
    ORDER BY E.employee_id;
END;
$$;




SELECT * FROM get_employees('', NULL);


BEGIN;
-- Llamar al procedimiento y obtener el cursor
CALL get_employees(null, null, 'emp_cursor');
-- Recuperar los datos del cursor
FETCH ALL IN "emp_cursor";
COMMIT;