1. Create database in Mysql-> CREATE DATABASE bus_reservation;

2. Create table -> 
    CREATE TABLE buses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    source VARCHAR(50),
    destination VARCHAR(50),
    seatsAvailable INT,
    fare DECIMAL(10,2)
    );

3. Insert Buses -> 
    insert into buses(source ,destination, seatsAvailable ,fare)values
    ("dehradun","rishikesh",28,100),
    ("bhopal","indore",24,479),
    ("indore","bhopal",24,434),
    ("delhi","manali",15,1230),
    ("manali","delhi",15,1230),
    ("rishikesh","dehradun",28,100);

4. Create table bookings -> 
    CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    busId INT,
    passengerName VARCHAR(100),
    seatsBooked INT,
    totalFare DECIMAL(10,2),
    bookedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (busId) REFERENCES buses(id));

5. run this command in both the backend and frontend folder -> npm install 

6. run this command in both the backend and frontend folder to run project -> npm run dev