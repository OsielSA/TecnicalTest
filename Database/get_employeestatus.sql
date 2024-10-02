
CREATE OR REPLACE FUNCTION get_employeestatus(
    in_status VARCHAR(100)
)
RETURNS TABLE (
    status_id INT,
    description VARCHAR(100)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
	SELECT S.status_id, S.description FROM public.EmployeesStatus S
	WHERE (in_status IS NULL OR S.description ILIKE '%' || in_status || '%')
	ORDER BY S.status_id;
END;
$$;


