-- dummy information
INSERT INTO
	department (names)
VALUES
	('Engineering'),
	('Finance'),
	('HR'),
	('Sales');

INSERT INTO
	roles (title, salary, department_id)
VALUES
	('Engineer', 100000, 1),
	('Junior Engineer', 70000, 1),
	('HR Manager', 125000, 4),
	('HR Associate', 65000, 4);

INSERT INTO
	employee (first_name, last_name, role_id, manager_id)
VALUES
	('Jonathan', 'Taylor', 1, 2),
	('Christian', 'McCaffrey', 2, 4),
	('Austin', 'Ekeler', 1, 3),
	('Derrick', 'Henry', 2, 2),
	('Dalvin', 'Cook', 4, NULL),
	('Cooper', 'Kupp', 3, 1);