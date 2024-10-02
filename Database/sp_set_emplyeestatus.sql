CREATE OR REPLACE PROCEDURE sp_set_emplyeestatus(
    in_employee_id INT,
    in_status_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Employees
    SET status_id = in_status_id
    WHERE employee_id = in_employee_id;
END;
$$;
