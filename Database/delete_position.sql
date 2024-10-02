CREATE OR REPLACE PROCEDURE delete_position(
    in_position_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Positions
    WHERE position_id = in_position_id;
END;
$$;