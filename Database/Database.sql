CREATE TABLE restaurant (
  id INTEGER PRIMARY KEY,
  name TEXT,
  location TEXT,
  contact_details TEXT,
  opening_time TEXT,
  closing_time TEXT
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  name TEXT,
  role TEXT,
  contact_details TEXT,
  start_date TEXT,
  end_date TEXT
);

CREATE TABLE table (
  id INTEGER PRIMARY KEY,
  number INTEGER,
  seating_capacity INTEGER,
  location TEXT,
  restaurant_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

CREATE TABLE order (
  id INTEGER PRIMARY KEY,
  date_time TEXT,
  total_amount REAL,
  status TEXT,
  payment_status TEXT,
  employee_id INTEGER,
  table_id INTEGER,
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (table_id) REFERENCES table(id)
);

CREATE TABLE menu_item (
  id INTEGER PRIMARY KEY,
  name TEXT,
  description TEXT,
  price REAL,
  restaurant_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

CREATE TABLE review (
  id INTEGER PRIMARY KEY,
  rating INTEGER,
  comment TEXT,
  date_time TEXT,
  restaurant_id INTEGER,
  customer_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE customer (
  id INTEGER PRIMARY KEY,
  name TEXT,
  contact_details TEXT,
  date_of_birth TEXT,
  membership_level TEXT
);