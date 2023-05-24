import * as UserController from './controllers/userController.mjs'
import * as MenuController from './controllers/menuController.mjs'
import * as RestaurantController from './controllers/restaurantController.mjs'
import * as adminController from './controllers/adminController.mjs'
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'



const router=express.Router()

router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect("/")
})

router.get('/restaurants',(req,res) =>{
    console.log("ok3");
    RestaurantController.displayAllRestaurants(req, res);
    console.log("ok4")
    
})

router.get('/menu',(req,res) =>{
    console.log("ok1");
    MenuController.displayAvailableMenus(req, res);
    console.log("ok2")
    
})
// ,{username: req.body.username}

router.get('/order-confirmation',(req,res)=>{
    res.render('./order-confirmation');
})

router.get('/reservation-management',(req,res)=>{
    res.render('./reservation-management');
})

router.get('/',(req,res) =>{
    res.redirect('./loginForm');
})


router.get('/loginForm',(req,res) =>{
    res.render('./loginForm');
})


router.get('/registrationForm',(req,res) =>{
    res.render('./registrationForm');
})


router.post("/doLogin",
    UserController.doLogin,
    (req, res) => {
        res.render("home",{username: req.body.username})
    }
)

router.post("/doRegister",
    UserController.doRegister,
    (req, res) => {
        res.render("home",{username: req.body.username})
    }
)

//admin

router.get("/adminReviews",
    adminController.findReviews,
    (req,res) => {
        res.render("admin-reviews", {reviews: req.reviews})
        console.log(req.reviews)
    }
    
)
router.get("/OwnerMenus",
    adminController.findMenusByOwnerId,
    (req,res) => {
        res.render("menu-list",{menus: req.menus})
        console.log(req.menus)
    }
)

router.post("/AddItem",
    adminController.addMenuItems,
    (req,res) => {
        res.render("menu-items",{newitem:req.newitem})
        console.log(req.newitem)
    }
)

router.get("/DeleteItem",
    adminController.deleteMenuItem,
    (req,res) => {
        res.render("menu-items",{item:req.item})
        console.log(req.item)
    }
)

export {router}

