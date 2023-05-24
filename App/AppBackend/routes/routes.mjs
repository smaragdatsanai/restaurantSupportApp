
import express from 'express'
const router=express.Router()

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




router.get('/',(req,res) =>{
    res.redirect('./loginForm');
})

//RESTAURANT

router.get('/restaurants',(req,res) =>{
    RestaurantController.displayAllRestaurants(req, res);
    
})

router.get('/restaurants/menu/:restaurantId',RestaurantController.showRestaurantMenu);
router.get('/restaurants/menu/menuItems/:menuId',MenuController.showMenuItems);
router.get('/restaurants/menu/menuItems/addRating/:itemName/:itemId',(req,res)=>{
    res.render('./ratingForm',{Item_Id:req.params.itemId,Name:req.params.itemName})
});
router.get("/restaurants/menu/menuItems/addRating/:itemId",ReviewController.addRating);

//MENU
router.get('/menu',(req,res) =>{
    MenuController.displayAvailableMenus(req, res);
})
// ,{username: req.body.username}



//USER 

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

