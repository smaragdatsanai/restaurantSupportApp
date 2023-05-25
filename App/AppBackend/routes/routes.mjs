
import express from 'express'
const router=express.Router()

import * as Validator from '../validator/validation.mjs'


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    console.log('loading .env')
    dotenv.config();
}


const UserController =await import('../controllers/userController.mjs')
const MenuController =await import('../controllers/menuController.mjs')
const RestaurantController =await import('../controllers/restaurantController.mjs')
const ReviewController =await import('../controllers/reviewController.mjs')
const adminController =await import('../controllers/adminController.mjs')


router.get("/", (req, res) => {
    if (req.session.username)
        res.redirect("./home")
    else
        res.render("./loginForm")
})




//RESTAURANT

router.get('/restaurants',
    UserController.checkIfAuthenticated,
    RestaurantController.displayAllRestaurants)

router.get('/restaurants/menu/:restaurantId',
UserController.checkIfAuthenticated,
RestaurantController.showRestaurantMenu);

router.get('/restaurants/menu/menuItems/:menuId',
UserController.checkIfAuthenticated,
MenuController.showMenuItems);
router.get('/restaurants/menu/menuItems/addRating/:itemName/:itemId',(req,res)=>{
    res.render('./ratingForm',{Item_Id:req.params.itemId,Name:req.params.itemName})
});
router.post("/restaurants/menu/menuItems/addRating/:itemId",ReviewController.addRating);

//MENU
router.get('/menu',(req,res) =>{
    MenuController.displayAvailableMenus(req, res);
})

//USER 

router.get('/login',(req,res) =>{
    res.render('./loginForm');
})


router.get('/register',(req,res) =>{
    res.render('./registrationForm');
})


router.post("/doLogin",
    UserController.doLogin,
    (req, res) => {
        res.render("home",{username: req.body.username})
    }
)

router.post("/doRegister", Validator.validateNewUser,
    UserController.doRegister,
    (req, res) => {
        res.render("home")
    }
)

router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect("/")
})


//admin

router.get("/adminReviews",
    adminController.findReviews,
    (req,res) => {
        res.render("admin-reviews", {reviews: req.reviews})
        console.log(req.reviews)
    }
    
)


export default router;

