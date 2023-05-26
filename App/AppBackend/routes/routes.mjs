
import express from 'express'
const router = express.Router()

import * as Validator from '../validator/validation.mjs'


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}


const UserController = await import('../controllers/userController.mjs')
const MenuController = await import('../controllers/menuController.mjs')
const RestaurantController = await import('../controllers/restaurantController.mjs')
const ReviewController = await import('../controllers/reviewController.mjs')
const AdminController = await import('../controllers/adminController.mjs')




router.get("/", (req, res) => {
    if (req.session.username)
        res.redirect("/home")
    else
        res.render("./startingPage")
    }
);

router.get('/Profile', 
    (req, res) => {
        if (req.session.userType=="User")
            res.redirect("/userProfile")
        else
            res.redirect("/adminProfile")
        }
    );






//RESTAURANT

router.get('/restaurants',
    UserController.checkIfAuthenticated,
    RestaurantController.displayOpenRestaurants)


router.get('/allRestaurants',
    UserController.checkIfAuthenticated,
    RestaurantController.displayAllRestaurants)

router.get('/restaurants/menu/:restaurantId',
    UserController.checkIfAuthenticated,
    MenuController.showRestaurantActiveMenu);

router.get('/restaurants/Allmenus/:restaurantId',
    UserController.checkIfAuthenticated,
    MenuController.showRestaurantMenu);

router.get('/restaurants/menu/menuItems/:menuId',
    UserController.checkIfAuthenticated,
    MenuController.showMenuItems
);
router.get('/restaurants/menu/menuItems/addRating/:itemName/:itemId',
    UserController.checkIfAuthenticated,
    (req, res) => {
        res.render('./ratingForm', { Item_Id: req.params.itemId, Name: req.params.itemName })
    }
);


router.post("/restaurants/menu/menuItems/addRating/:itemId",
    UserController.checkIfAuthenticated,
    ReviewController.addRating,
    (req, res) => {
        res.render('./home', { message: "Η αξιολόγηση πραγματοποιήθηκε επιτυχώς" });
    }
);

router.get('/restaurants/findRestaurant',
    UserController.checkIfAuthenticated,
    RestaurantController.searchRestaurant
);

//MENU
router.get('/menu', (req, res) => {
    UserController.checkIfAuthenticated,
        MenuController.displayAvailableMenus(req, res);
    }
);

//USER 


router.get('/home', 
    UserController.checkIfAuthenticated,
    (req, res) => {
        res.render('./home');
    }
);

router.get('/login', (req, res) => {
    res.render('./loginForm');
    }
);


router.get('/register', (req, res) => {
    res.render('./registrationForm');
    }
);



router.post("/doLogin",
    Validator.validateLogin,
    UserController.doLogin,
    (req, res) => {
        res.render("home",{username: req.body.username})
    }
);

router.post("/doRegister",
    Validator.validateNewUser,
    UserController.doRegister,
    UserController.doLogin,
    (req, res) => {
        res.render("home", { message: "Η εγγραφή του χρήστη έγινε με επιτυχία" })
    }
);


router.get('/userProfile',
    UserController.checkIfAuthenticated,
    UserController.userProfileRender,
    (req, res) => {
          res.render("home", { message: "Η ανάκτηση του προφιλ του χρήστη απέτυχε" });
      }
  ) 




router.get('/logout',
    UserController.checkIfAuthenticated,
    UserController.doLogout,
    (req, res) => {
        res.redirect('./');
    }
);

router.get('/switchaccounts',
    UserController.checkIfAuthenticated,
    UserController.doLogout,
    (req, res) => {
        res.redirect('./login');
    }
);

//ADMIN


router.get('/place-restaurant',
    UserController.checkIfAuthenticated,
    AdminController.
)


router.get('/adminLogin',
    (req, res) => {
        res.render('./adminLoginForm');
    }
);


router.get('/adminRegister', (req, res) => {
    res.render('./adminRegistrationForm');
    }
);

router.post("/doAdminLogin",
    Validator.validateLogin,
    AdminController.doLogin,
    (req, res) => {
        res.render("home", { username: req.body.username })
    }
);

router.post("/doAdminRegister",
    // console.log("entered"),
    Validator.validateNewUser,
    // console.log("exited"),
    AdminController.doRegister,
    AdminController.doLogin,
    (req, res) => {
        res.render("home", { message: "Η εγγραφή του χρήστη έγινε με επιτυχία" })
    }
);

router.get('/adminProfile',
UserController.checkIfAuthenticated,
AdminController.adminProfileRender,
(req, res) => {
      res.render("home", { message: "Η ανάκτηση του προφιλ του χρήστη απέτυχε" });
  }
);


export default router;

