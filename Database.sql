CREATE TABLE IF NOT EXISTS Employee (
	Employee_Id varchar PRIMARY KEY ,
	First_Name string,
	Last_Name string,
	Role string
);


CREATE TABLE IF NOT EXISTS Shift (
	Shift_Id varchar PRIMARY KEY ,
	Employee_Id varchar,
	Begin_Time varchar,
	End_Time varchar,
	Date varchar,
	FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id)
	
);

CREATE TABLE IF NOT EXISTS Restaurant (
	Restaurant_Id varchar PRIMARY KEY ,
	Name varchar
);

CREATE TABLE IF NOT EXISTS Works_at (
	Employee_Id varchar PRIMARY KEY ,
	Restaurant_Id varchar,
	Hourly_Pay float,
	Hours_Worked float,
	Salary float,
	FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id),
	FOREIGN KEY (Restaurant_Id) REFERENCES Restaurant(Restaurant_Id)
);

CREATE TABLE IF NOT EXISTS Customer (
	Customer_Id varchar PRIMARY KEY ,
	First_Name string,
	Last_Name string,
	Phone_Number varchar,
	Email varchar
);

CREATE TABLE IF NOT EXISTS Re_tables (
	Table_Id varchar PRIMARY KEY ,
	Restaurant_Id varchar,
	Capacity integer,
	Status string,
	FOREIGN KEY (Restaurant_Id) REFERENCES Restaurant(Restaurant_Id)
);

CREATE TABLE IF NOT EXISTS Reservation (
	Reservation_Id varchar PRIMARY KEY ,
	Table_Id varchar,
	Name string,
	Date date,
	Time time,	
	Estimated_Duration varchar,
	Actual_Duration varchar,
	Customer_Id varchar,
	FOREIGN KEY (Table_Id) REFERENCES Re_tables(Table_Id),
	FOREIGN KEY (Customer_Id) REFERENCES Customer(Customer_Id)
);

CREATE TABLE IF NOT EXISTS T_Order ( 
	Order_Id varchar PRIMARY KEY ,
	Employee_Id varchar,
	Price float,
	Reservation_Id varchar,
	FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id),
	FOREIGN KEY (Reservation_Id) REFERENCES Reservation(Reservation_Id)
);

CREATE TABLE IF NOT EXISTS Payment (
	Payment_Id varchar PRIMARY KEY,
	Order_Id varchar,	
	Ammount float,
	Type varchar,
	FOREIGN KEY (Order_Id) REFERENCES T_Order(Order_Id)
);

CREATE TABLE IF NOT EXISTS Menu_Items (
	Item_Id varchar PRIMARY KEY,
	Name string,
	Description varchar,
	Price float
);

CREATE TABLE IF NOT EXISTS Order_Items (
	Order_Id varchar PRIMARY KEY ,
	Item_Id varchar  ,
	Quantity integer,
	FOREIGN KEY (Order_Id) REFERENCES T_Order(Order_Id),
	FOREIGN KEY (Item_Id) REFERENCES Menu_Items(Item_Id)
);

CREATE TABLE IF NOT EXISTS Review (
	Review_Id varchar PRIMARY KEY ,
	Rating varchar,
	Comments text,
	Customer_Id varchar,
	Item_Id varchar,
	Employee_Id varchar,
	FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id)
);

INSERT INTO Employee (Employee_Id, First_Name, Last_Name, Role) VALUES
('E001', 'John', 'Doe', 'Waiter'),
('E002', 'Jane', 'Smith', 'Chef'),
('E003', 'Mike', 'Johnson', 'Bartender');

INSERT INTO Shift (Shift_Id, Employee_Id, Begin_Time, End_Time, Date) VALUES
('S001', 'E001', '09:00', '17:00', '2023-03-30'),
('S002', 'E001', '17:00', '01:00', '2023-03-30'),
('S003', 'E002', '10:00', '18:00', '2023-03-30');

INSERT INTO Restaurant (Restaurant_Id, Name) VALUES
('R001', 'The Italian Bistro'),
('R002', 'The Sushi Bar'),
('R003', 'The Steakhouse');

INSERT INTO Works_at (Employee_Id, Restaurant_Id, Hourly_Pay, Hours_Worked, Salary) VALUES
('E001', 'R001', 15.00, 40.0, 600.0),
('E002', 'R002', 20.00, 45.0, 900.0),
('E003', 'R003', 18.00, 38.0, 684.0);

INSERT INTO Customer (Customer_Id, First_Name, Last_Name, Phone_Number, Email) VALUES
('C001', 'Alex', 'Johnson', '555-1234', 'alex.johnson@example.com'),
('C002', 'Emily', 'Jones', '555-5678', 'emily.jones@example.com'),
('C003', 'Mike', 'Brown', '555-9012', 'mike.brown@example.com');

INSERT INTO Re_tables (Table_Id, Restaurant_Id, Capacity, Status) VALUES
('T001', 'R001', 4, 'Available'),
('T002', 'R002', 2, 'Reserved'),
('T003', 'R003', 6, 'Available');

INSERT INTO Reservation (Reservation_Id, Table_Id, Name, Date, Time, Estimated_Duration, Actual_Duration, Customer_Id) VALUES
('RES001', 'T001', 'Johnson', '2023-03-30', '18:00', '2 hours', '2.5 hours', 'C001'),
('RES002', 'T002', 'Jones', '2023-03-30', '20:00', '1.5 hours', '1.5 hours', 'C002'),
('RES003', 'T003', 'Brown', '2023-03-30', '19:00', '2 hours', '2 hours', 'C003');

INSERT INTO T_Order (Order_Id, Employee_Id, Price, Reservation_Id) VALUES
('O001', 'E001', 45.00, 'RES001'),
('O002', 'E002', 60.00, 'RES002'),
('O003', 'E003', 90.00, 'RES003');

INSERT INTO Payment (Payment_Id, Order_Id, Ammount, Type) VALUES
('P001', 'O001', 45.00, 'Credit Card'),
('P002', 'O002', 60.00, 'Cash'),
('P003', 'O003', 90.00, 'Debit Card');


INSERT INTO Menu_Items (Item_Id, Name, Description, Price)
VALUES
('1', 'Spaghetti Bolognese', 'Classic spaghetti dish with a rich tomato sauce and ground beef', 12.99),
('2', 'Margherita Pizza', 'Traditional pizza with tomato sauce, mozzarella cheese, and fresh basil', 9.99),
('3', 'Caesar Salad', 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing', 8.99),
('4', 'Grilled Chicken Sandwich', 'Grilled chicken breast, lettuce, tomato, and mayo on a toasted bun', 10.99),
('5', 'Fish and Chips', 'Beer-battered fish with crispy fries and tartar sauce', 13.99);


INSERT INTO Order_Items (Order_Id, Item_Id, Quantity)
VALUES
('0001', '1', 2),
('0002', '3', 1),
('0003', '2', 1);

INSERT INTO Review (Review_Id, Rating, Comments, Customer_Id, Item_Id, Employee_Id)
VALUES
('1r', '4', 'The spaghetti was delicious!', 'C001', '1', 'E001'),
('2r', '5', 'The pizza was amazing!', 'C002', '2', 'E002'),
('3r', '3', 'The salad was okay, but nothing special', 'C003', '3', 'E003');

