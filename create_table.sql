
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INTEGER
);

INSERT INTO students (name, age) VALUES
  ('Meenal', 40),
  ('Ali', 28),
  ('Teoh', 18);
