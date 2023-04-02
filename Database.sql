CREATE TABLE IF NOT EXISTS Employee (
	Employee_Id varchar PRIMARY KEY ,
	First_Name string,
	Last_Name string,
	Role string
);


CREATE TABLE IF NOT EXISTS Shift (
	Shift_Id varchar PRIMARY KEY ,
	Employee_Id varchar,
	Begin_Time time,
	End_Time time,
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

CREATE TABLE IF NOT EXISTS Menu (
	Menu_Id varchar PRIMARY KEY,
	Type string,
	Name string,
	Restaurant_Id varchar,
	FOREIGN KEY (Restaurant_Id) REFERENCES Restaurant(Restaurant_Id)
); 

CREATE TABLE IF NOT EXISTS Menu_Items (
	Item_Id varchar PRIMARY KEY,
	Name string,
	Description varchar,
	Price float,
	Menu_Id varchar,
	FOREIGN KEY (Menu_Id) REFERENCES Menu(Menu_Id)
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

 

INSERT INTO Employee (Employee_Id, First_Name, Last_Name, Role)
VALUES ('EMP001', 'John', 'Doe', 'Waiter'),
('EMP002', 'Jane', 'Doe', 'Chef'),
('EMP003', 'Bob', 'Smith', 'Bartender'),
('EMP004', 'Alice', 'Johnson', 'Waitress'),
('EMP005', 'Tom', 'Lee', 'Host');

INSERT INTO Shift (Shift_Id, Employee_Id, Begin_Time, End_Time, Date)
VALUES ('SH001', 'EMP001', '09:00', '14:00', '2023-03-01'),
('SH002', 'EMP002', '12:00', '21:00', '2023-03-01'),
('SH003', 'EMP003', '17:00', '02:00', '2023-03-01'),
('SH004', 'EMP004', '08:00', '17:00', '2023-03-02'),
('SH005', 'EMP005', '16:00', '22:00', '2023-03-02');

INSERT INTO Restaurant (Restaurant_Id, Name)
VALUES ('RES001', 'La Piazza'),
('RES002', 'The Blue Door'),
('RES003', 'Ristorante Italia');

INSERT INTO Works_at (Employee_Id, Restaurant_Id, Hourly_Pay, Hours_Worked, Salary)
VALUES ('EMP001', 'RES001', 10.50, 40, 420),
('EMP002', 'RES002', 15.00, 35, 525),
('EMP003', 'RES001', 12.00, 30, 360),
('EMP004', 'RES003', 20.00, 45, 900),
('EMP005', 'RES002', 8.50, 20, 170);

INSERT INTO Customer (Customer_Id, First_Name, Last_Name, Phone_Number, Email)
VALUES ('CUST001', 'Robert', 'Johnson', '555-1234', 'robj@example.com'),
('CUST002', 'Emily', 'Smith', '555-5678', 'emilys@example.com'),
('CUST003', 'David', 'Lee', '555-9012', 'davidl@example.com');

INSERT INTO Re_tables (Table_Id, Restaurant_Id, Capacity, Status)
VALUES ('TAB001', 'RES001', 4, 'Occupied'),
('TAB002', 'RES002', 6, 'Available'),
('TAB003', 'RES003', 2, 'Reserved');

INSERT INTO Reservation (Reservation_Id, Table_Id, Name, Date, Time, Estimated_Duration, Actual_Duration, Customer_Id)
VALUES ('RESV001', 'TAB002', 'John Doe', '2023-03-02', '18:00', '1:30', '1:45', 'CUST001'),
('RESV002', 'TAB003', 'Emily Smith', '2023-03-02', '19:30', '2:00', '2:15', 'CUST002'),
('RESV003', 'TAB001', 'David Lee', '2023-03-03', '20:00', '1:30', '1:45', 'CUST003');

INSERT INTO T_Order (Order_Id, Employee_Id, Price, Reservation_Id) VALUES
('ORD001', 'EMP001', 32.50, 'RES001'),
('ORD002', 'EMP001', 45.75, 'RES003'),
('ORD003', 'EMP004', 22.00, 'RES002');

INSERT INTO Payment (Payment_Id, Order_Id, Ammount, Type) VALUES
('PAY001', 'ORD001', 32.50, 'Credit Card'),
('PAY002', 'ORD002', 45.75, 'Cash'),
('PAY003', 'ORD003', 22.00, 'Debit Card');

INSERT INTO Menu (Menu_Id, Type, Name, Restaurant_Id) VALUES
('M001', 'Breakfast', 'American Breakfast', 'RES001'),
('M002', 'Breakfast', 'Continental Breakfast', 'RES002'),
('M003', 'Dinner', 'Italian Cuisine', 'RES001'),
('M004', 'Dinner', 'Mexican Cuisine', 'RES002'),
('M005', 'Drinks', 'Cocktails', 'RES003'),
('M006', 'Drinks', 'Wines', 'RES002'),
('M007', 'Dinner', 'Mexican Cuisine', 'RES003');

INSERT INTO Menu_Items (Item_Id, Name, Description, Price, Menu_Id) VALUES
('I001', 'Pancakes', 'Fluffy pancakes served with butter and maple syrup.', 7.99, 'M001'),
('I002', 'Eggs Benedict', 'Two poached eggs with Canadian bacon on an English muffin, topped with hollandaise sauce.', 9.99, 'M001'),
('I003', 'Fruit Platter', 'Assorted fresh fruits.', 6.99, 'M002'),
('I004', 'Croissant', 'Freshly baked French croissant served with butter and jam.', 2.99, 'M002'),
('I005', 'Spaghetti Carbonara', 'Spaghetti with bacon, egg yolks, and Parmesan cheese.', 14.99, 'M003'),
('I006', 'Margherita Pizza', 'Tomato sauce, mozzarella cheese, and basil.', 12.99, 'M003'),
('I007', 'Taco Platter', 'Three tacos served with rice and beans.', 11.99, 'M004'),
('I008', 'Burrito', 'A large tortilla stuffed with rice, beans, cheese, and meat of your choice.', 9.99, 'M004'),
('I009', 'Margarita', 'Tequila, lime juice, and triple sec.', 7.99, 'M005'),
('I010', 'Mojito', 'White rum, lime juice, sugar, mint leaves, and soda water.', 8.99, 'M005'),
('I011', 'Cabernet Sauvignon', 'A full-bodied red wine.', 29.99, 'M006'),
('I012', 'Chardonnay', 'A medium-bodied white wine.', 24.99, 'M006');

INSERT INTO Order_Items (Order_Id, Item_Id, Quantity) VALUES
('ORD001', 'I001', 2),
('ORD001', 'I002', 1),
('ORD002', 'I003', 1),
('ORD002', 'I004', 2),
('ORD003', 'I005', 1),
('ORD003', 'I006', 1);

INSERT INTO Review (Review_Id, Rating, Comments, Customer_Id, Item_Id, Employee_Id) VALUES
('R001', '4', 'The pancakes were great, but the coffee was cold.', 'CUST001', 'I001', 'EMP001'),
('R002', '5', 'The eggs benedict were excellent.', 'CUST002', 'I002', 'EMP004'),
('R003', '3', 'The fruit platter was fresh but service was bad','CUST003','I003','EMP004');

