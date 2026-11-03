CREATE TABLE boolean_values (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value BOOLEAN UNIQUE NOT NULL,
    color VARCHAR(30),
    access VARCHAR(20),
    message VARCHAR(100)
);

INSERT INTO boolean_values (value, color, access, message)
VALUES
    (TRUE, 'lime', 'allowed', 'Success'),
    (FALSE, 'red', 'denied', 'Error');

ALTER TABLE boolean_values
ADD COLUMN theme VARCHAR(20);   

UPDATE boolean_values
SET theme = 'light'
WHERE value = TRUE;

UPDATE boolean_values
SET theme = 'dark'
WHERE value = FALSE;
-----------------
ALTER TABLE boolean_values
ADD COLUMN theme VARCHAR(20);

UPDATE boolean_values
SET theme = CASE
    WHEN value = TRUE THEN 'light'
    WHEN value = FALSE THEN 'dark'
END;
-----------------
UPDATE boolean_values
SET theme = CASE
    WHEN value THEN 'light'
    ELSE 'dark'
END;