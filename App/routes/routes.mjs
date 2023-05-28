
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
const crudController = await import('../controllers/CRUDController.mjs')


import fs from 'fs';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });



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

router.get('/home',
    (req, res) => {
        if(req.session.userType=="User")
            res.redirect('./restaurants');
        else
            res.redirect('/adminHome')
    }
);



//RESTAURANT

router.get('/restaurants',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    RestaurantController.displayOpenRestaurants)


router.get('/allRestaurants',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
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


router.get('/restaurants/findRestaurant',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    RestaurantController.searchRestaurant
);


//USER 



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
        res.redirect('/home')
    }
);


router.post("/doRegister",
    Validator.validateNewUser,
    UserController.doRegister,
    UserController.doLogin,
    (req, res) => {
        res.redirect('/home')
    }
);


router.get('/userProfile',
    UserController.checkIfAuthenticated,
    UserController.userProfileRender,
    (req, res,next) => {
        res.locals.message='Η ανάκτηση του προφιλ του χρήστη απέτυχε'
        next()
    },
    RestaurantController.displayOpenRestaurants,
    (req, res) => {
        res.redirect('/home');
    }
  );




router.get('/logout',
    UserController.checkIfAuthenticated,
    UserController.doLogout,
    (req, res) => {
        res.redirect('./');
    }
);

router.get('/switchaccounts',
    UserController.checkIfAuthenticated,
    (req, res) => {
        if (req.session.userType=="User")
            UserController.doLogout,
            res.redirect('./login')
        else
            UserController.doLogout,
            res.redirect('./adminLogin');
        
    }
);

//ADMIN

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
        res.redirect("/Home")
    }
);

router.post("/doAdminRegister",
    Validator.validateNewUser,
    AdminController.doRegister,
    AdminController.doLogin,
    (req, res,next) => {
        res.locals.message="Η εγγραφή του χρήστη έγινε με επιτυχία"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/adminProfile',
UserController.checkIfAuthenticated,
AdminController.adminProfileRender,
(req, res,next) => {
    res.locals.message="Η ανάκτηση του προφιλ του χρήστη απέτυχε" ,
    next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);


router.get('/adminHome',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    AdminController.adminHomePageRender,
    (req, res) => {
        res.locals.message="Η ανάκτηση του προφιλ του χρήστη απέτυχε"
        res.redirect('/home');
    }
);




//CRUD


router.post('/place-restaurant',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    upload.single('image'),
    AdminController.addRestaurant,
    (req, res,next) => {
        res.locals.message="Η προσθήκη εστιατορίου πραγματοποιήθηκε επιτυχώς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/addRestaurant',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    (req,res,next)=>{
        res.render('./add-restaurant');
    }
);

router.get('/addMenu/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    (req,res)=>{
        res.render('./add-menu',{restaurantId:req.params.restaurantId});
    }
);

router.post('/doAddMenu/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    upload.single('image'),
    AdminController.addMenu,
    (req, res,next) => {
        res.locals.message="Η προσθήκη Μενού πραγματοποιήθηκε επιτυχώς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/addItem/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    (req,res)=>{
        res.render('./add-item',{menuId:req.params.menuId});
    }
);


router.post('/doAddItem/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    upload.single('image'),
    AdminController.addItem,
    (req, res,next) => {
        res.locals.message="Η Προσθήκη προιόντος πραγματοποιήθηκε επιτυχώςς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);


router.get('/restaurants/menu/menuItems/deleteItem/:itemId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    AdminController.deleteItem,
    (req,res,next)=>{
        res.locals.message="Η Διαγραφή προιόντος πραγματοποιήθηκε επιτυχώς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/restaurants/menu/menuItems/deleteRestaurant/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    AdminController.deleteRestaurant,
    (req,res,next)=>{
        res.locals.message="Η Διαγραφή εστιατορίου πραγματοποιήθηκε επιτυχώς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/restaurants/menu/menuItems/deleteMenu/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    AdminController.deleteMenu,
    (req,res,next)=>{
    
        res.locals.message="Η Διαγραφή του Μενού πραγματοποιήθηκε επιτυχώς"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/deleteReview/:reviewId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    crudController.deleteReview,
    (req,res,next)=>{
        res.locals.message="Η Διαγραφή της κριτικής πραγματοποιήθηκε επιτυχώς"
        next()
    },
    RestaurantController.displayOpenRestaurants,
    (req, res) => {
        res.redirect('/home');
    }
);



router.get('/restaurants/menu/menuItems/addRating/:itemName/:itemId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    (req, res) => {
        res.render('./ratingForm', { Item_Id: req.params.itemId, Name: req.params.itemName })
    }
);


router.post("/restaurants/menu/menuItems/addRating/:itemId",
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    ReviewController.addRating,
    
    (req, res,next) => {
        res.locals.message="Η αξιολόγηση πραγματοποιήθηκε επιτυχώς"
        next()
    },
    RestaurantController.displayOpenRestaurants,
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/editRating/:reviewId/:itemId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    crudController.updateReviewForm,
    (req,res,next)=>{
        res.locals.message="Η αίτηση για φόρμα υποφολής κριτικής απέτυχε"
        next()
    },
    RestaurantController.displayOpenRestaurants,
    (req, res) => {
        res.redirect('/home');
    }
)

router.post('/updateReview/:reviewId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    crudController.updatereview,
    (req,res,next)=>{
        res.locals.message="Η ενημέρωση της κριτικής σας έγινε με επιτυχία"
        next()
    },
    RestaurantController.displayOpenRestaurants,
    (req, res) => {
        res.redirect('/home');
    }
)

router.get('/editMenu/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateMenuForm,
    (req,res,next)=>{
        res.locals.message="Η αίτηση για φόρμα υποβολής ανανέωσης Μενού απέτυχε"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)
router.post('/doMenuEdit/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateMenu,
    (req,res,next)=>{
        res.locals.message="Η ενημέρωση του Μενού σας έγινε με επιτυχία"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)


router.get('/editItem/:itemId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateMenuItemForm,
    (req,res,next)=>{
        res.locals.message="Η αίτηση για φόρμα υποβολής ανανέωσης Μενού Item απέτυχε"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)
router.post('/doItemEdit/:itemId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateItem,
    (req,res,next)=>{
        res.locals.message="Η ενημέρωση του Menu Item σας  έγινε με επιτυχία"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)

router.get('/editRestaurant/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateRestaurantForm,
    (req,res,next)=>{
        res.locals.message="Η αίτηση για φόρμα υποβολής ανανέωσης Εστιατορίου απέτυχε"
        
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)
router.post('/doRestaurantEdit/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.checkIfAdmin,
    crudController.updateRestaurant,
    (req,res,next)=>{
        res.locals.message="Η ενημέρωση του Εστιατορίου σας έγινε με επιτυχία"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)


router.get('/changePassword',
    UserController.checkIfAuthenticated,
    (req,res)=>{
        res.render("change-password");
    }
)
router.post('/doPasswordChange',
    UserController.checkIfAuthenticated,
    crudController.changepassword,
    (req,res,nex)=>{
        res.locals.message="Η ενημέρωση του κωδικού πρόσβασης έγινε με επιτυχία"
        next()
    },
    AdminController.adminHomePageRender,
    (req, res) => {
        res.redirect('/home');
    }
)



export default router;

