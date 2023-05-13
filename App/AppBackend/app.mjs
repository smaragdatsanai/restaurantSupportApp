import express from 'express';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import path from 'path';
import './controllers/menuController.mjs';
import './controllers/reservationController.mjs';

const app = express();

// view engine setup
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));

// static folder setup
app.use(express.static(path.join(__dirname, '../public')));

// menus routes
app.get('/menus', menuController.getAllMenus);
app.get('/menus/:id', menuController.getMenuById);
app.post('/menus', menuController.addMenu);
app.put('/menus/:id', menuController.updateMenu);
app.delete('/menus/:id', menuController.deleteMenu);

// reservations routes
app.get('/reservations', reservationController.getAllReservations);
app.get('/reservations/:id', reservationController.getReservationById);
app.post('/reservations', reservationController.addReservation);
app.put('/reservations/:id', reservationController.updateReservation);
app.delete('/reservations/:id', reservationController.deleteReservation);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
