
CREATE OR REPLACE FUNCTION get_positions(
    in_position VARCHAR(100)
)
RETURNS TABLE (
    position_id INT,
    description VARCHAR(100)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
	SELECT P.position_id, P.description FROM public.Positions P
	WHERE (in_position IS NULL OR P.description ILIKE '%' || in_position || '%')
	ORDER BY P.position_id;
END;
$$;


