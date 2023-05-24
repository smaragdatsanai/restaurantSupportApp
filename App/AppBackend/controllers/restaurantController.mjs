import * as Restaurant from '../models/restaurant.mjs' // version 3 with ORM sequelize, postgress


async function displayAllRestaurants(req, res, next) {
  try {
    console.log("displayAlleRestaurants");
    const restaurants = await Restaurant.getAllRestaurants();
    console.log(restaurants.length);
    res.render("../views/restaurants", { Restaurant: restaurants });
    console.log("entered displayAllRestaurants");
  } catch (error) {
    next(error)
  }
}

async function showRestaurantMenu(req, res, next) {
  try {
    // const restaurant= await Restaurant.getRestaurantById(req.params.restaurantId)
    console.log("entered");
    const menus = await Restaurant.showMenu(req.params.restaurantId)
    console.log("exited");
    res.render('menu-list', { menus: menus });
  } catch (error) {
    next(error);
  }
}

export {displayAllRestaurants,showRestaurantMenu}