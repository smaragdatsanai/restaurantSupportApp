import * as Owner from '../models/admin.mjs'
import * as seqObj from '../models/database.mjs'
import fs from 'fs';

const doLogin = async (req, res, next) => {
    try {
        console.log("doadminlogin")
        console.log(req.body.username)
        console.log(req.params)
        console.log(req.query)
        const owner = await Owner.login(req.body.username, req.body.password)
        if (owner) {
            req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
            req.session.userId = owner.Owner_Id
            res.locals.username = req.session.username
            req.session.userType = "Admin"; // Corrected line
            res.locals.userType = req.session.userType; // Corrected line
            console.log(owner)
            next()
        }
        else {
            throw new Error("άγνωστο σφάλμα")
        }
    } catch (error) {
        next(error)
    }
}

const doRegister = async (req, res, next) => {
    try {
        console.log("doadminregister")
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)
        const owner = await Owner.addOwner(req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.username, req.body.password)
        console.log(owner)
        if (owner) {
            next()
            // req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
            // req.session.userId=user.User_Id
            // res.locals.username = req.session.username 
            // res.session.userType="Admin"
            // res.locals.userType= res.locals.userType
            // res.render("home", { newusermessage: "Η εγγραφή του χρήστη έγινε με επιτυχία`" })
        }
        else {
            throw new Error("άγνωστο σφάλμα κατά την εγγραφή του χρήστη")
        }
    } catch (error) {
        next(error)
    }
}


const adminProfileRender = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const adminRestaurants = await Owner.getAllAdminRestaurants(userId)
        console.log(adminRestaurants)
        res.render('./profile', { restaurant: adminRestaurants, userType: req.session.userType })
    } catch (error) {
        next(error)
    }
}
const adminHomePageRender = async (req, res, next) => {
    try {
      const graphData = [];
      const restaurants = await Owner.getRestaurantsforGraph();
    //   console.log(restaurants);
      restaurants.forEach((restaurant) => {
        const menuData = [];
        restaurant.menus.forEach((menu) => {
          const menuItemData = [];
          menu.menuItems.forEach((menuItem) => {
            menuItemData.push({
              name: menuItem.itemName,
              rating:menuItem.averageRating,
            });
          });
          menuData.push({
            menuName: menu.menuName,
            items: menuItemData,
          });
        });
        graphData.push({
          restaurantName: restaurant.name,
          menus: menuData,
        });
      });
      
      const graphDataString = JSON.stringify(graphData);
      console.log(graphData)
      res.render('./adminHome', { graphDataString });
    } catch (error) {
      next(error);
    }
  };
  
const addRestaurant = async (req, res, next) => {
    try {

        const imageFile = req.file;
        console.log(req.body);
        console.log(req.file);
        if (!imageFile) {
            res.status(400).send('No image file provided');
            return;
        }
        const imageBuffer = fs.readFileSync(imageFile.path);
        const imageBase64 = imageBuffer.toString('base64');
        const imageUrl = `data:image/jpg;base64,${imageBase64}`;
        const image = imageUrl;
        const name = req.body.name;
        const address = req.body.address;
        const opens = req.body.opens;
        const closes = req.body.closes;
        const type = req.body.type;
        const ownerid = req.session.userId
        console.log(req.body)
        console.log(name, address, opens, closes, type, ownerid)
        const restaurant = await Owner.addOwnerRestaurant(name, address, opens, closes, type, ownerid, image)
        req.restaurant = restaurant;
        console.log(restaurant);
        next();
    } catch (error) {
        next(error)
    }
}
const addMenu = async (req, res, next) => {
    try {
        const imageFile = req.file;
        console.log(req.body);
        console.log(req.file);
        if (!imageFile) {
            res.status(400).send('No image file provided');
            return;
        }
        const imageBuffer = fs.readFileSync(imageFile.path);
        const imageBase64 = imageBuffer.toString('base64');
        const imageUrl = `data:image/jpg;base64,${imageBase64}`;
        const image = imageUrl;
        const name = req.body.name;
        const type = req.body.type;
        const opens = req.body.opens;
        const closes = req.body.closes;
        const restaurantid = req.params.restaurantId; //type params ara theloume to id panw
        console.log(req.body)
        console.log(name, type, opens, closes, restaurantid)
        await Owner.addOwnerMenu(name, type, opens, closes, restaurantid,image)
        next();
    } catch (error) {
        next(error)
    }
}

const addItem = async (req, res, next) => {
    try {

        console.log("add item");
        console.log(req);
        const imageFile = req.file;
        if (!imageFile) {
            res.status(400).send('No image file provided');
            return;
        }
        const imageBuffer = fs.readFileSync(imageFile.path);
        const imageBase64 = imageBuffer.toString('base64');
        const imageUrl = `data:image/jpg;base64,${imageBase64}`;


        const menuid = req.params.menuId;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const image = imageUrl;
        console.log(req.body)
        console.log(name, description, price)
        const item = await Owner.addMenuItem(name, description, price, menuid, image)
        console.log(item);
        next()
    } catch (error) {
        next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const itemid = req.params.itemId
        const item = await Owner.deleteMenuItem(itemid)
        console.log(item);
        next()
    } catch {
        next(error)
    }
}
const deleteMenu = async (req, res, next) => {
    try {
        console.log("DELETING Menu")
        const menuid = req.params.menuId
        const menu = await Owner.deleteRestaurantMenu(menuid)
        console.log(menu);
        next()
    } catch {
        next(error)
    }
}

const deleteRestaurant = async (req, res, next) => {
    try {
        console.log("DELETING RESTAURANT")
        const restaurantid = req.params.restaurantId
        const restaurant = await Owner.deleteRestaurantById(restaurantid)
        console.log(restaurant);
        next()
    } catch {
        next(error)
    }
}


export { doRegister, doLogin, adminProfileRender, addRestaurant, addMenu, addItem, deleteItem, deleteRestaurant, deleteMenu, adminHomePageRender}