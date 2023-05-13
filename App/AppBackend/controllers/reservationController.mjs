import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, '..', 'data', 'reservations.json');

// Get all reservations
const getAllReservations = (req, res) => {
  try {
    const reservationsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    res.status(200).json(reservationsData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reservations', error: err });
  }
};

// Get reservation by id
const getReservationById = (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservationsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const reservation = reservationsData.find((r) => r.id === reservationId);
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reservation', error: err });
  }
};

// Create reservation
const createReservation = (req, res) => {
  const { name, email, date, time, partySize } = req.body;
  try {
    const reservationsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const newReservation = { id: uuidv4(), name, email, date, time, partySize };
    reservationsData.push(newReservation);
    fs.writeFileSync(dataFilePath, JSON.stringify(reservationsData, null, 2), 'utf-8');
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ message: 'Error creating reservation', error: err });
  }
};

// Update reservation
const updateReservation = (req, res) => {
  const reservationId = req.params.id;
  const { name, email, date, time, partySize } = req.body;
  try {
    const reservationsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const reservationIndex = reservationsData.findIndex((r) => r.id === reservationId);
    if (reservationIndex !== -1) {
      reservationsData[reservationIndex] = { id: reservationId, name, email, date, time, partySize };
      fs.writeFileSync(dataFilePath, JSON.stringify(reservationsData, null, 2), 'utf-8');
      res.status(200).json(reservationsData[reservationIndex]);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating reservation', error: err });
  }
};

// Delete reservation
const deleteReservation = (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservationsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const reservationIndex = reservationsData.findIndex((r) => r.id === reservationId);
    if (reservationIndex !== -1) {
      reservationsData.splice(reservationIndex, 1);
      fs.writeFileSync(dataFilePath, JSON.stringify(reservationsData, null, 2), 'utf-8');
      res.status(200).json({ message: 'Reservation deleted' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  }  catch (err) {
    res.status(500).json({ error: error.message });
  }
};
