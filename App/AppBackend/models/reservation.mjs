const fs = require('fs');
const path = require('path');

const reservationFilePath = path.join(__dirname, '..', 'data', 'reservations.json');

class Reservation {
  static getReservations() {
    const reservations = fs.readFileSync(reservationFilePath, 'utf-8');
    return JSON.parse(reservations);
  }

  static addReservation(reservation) {
    const reservations = this.getReservations();
    reservations.push(reservation);
    fs.writeFileSync(reservationFilePath, JSON.stringify(reservations));
  }

  static updateReservation(id, updatedReservation) {
    const reservations = this.getReservations();
    const index = reservations.findIndex((reservation) => reservation.id === id);
    if (index !== -1) {
      reservations[index] = updatedReservation;
      fs.writeFileSync(reservationFilePath, JSON.stringify(reservations));
    }
  }

  static deleteReservation(id) {
    const reservations = this.getReservations();
    const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
    fs.writeFileSync(reservationFilePath, JSON.stringify(updatedReservations));
  }
}

module.exports = Reservation;
