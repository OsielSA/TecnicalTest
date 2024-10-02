CREATE OR REPLACE PROCEDURE delete_employeestatus(
    in_status_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM EmployeesStatus
    WHERE status_id = in_status_id;
END;
$$;