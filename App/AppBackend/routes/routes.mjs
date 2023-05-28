
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

// router.get('/upload', (req, res) => {
//   res.render('image');
// });

// router.post('/upload', upload.single('image'), (req, res) => {
//   const imageFilePath = req.file.filename;
//   res.render('display', { imageFilePath });
// });


router.get('/upload', (req, res) => {
  res.render('image');
});

// router.post('/upload', upload.single('image'), (req, res) => {
//     const imageFile = req.file;

//     if (!imageFile) {
//       res.status(400).send('No image file provided');
//       return;
//     }
  
//     const imageBuffer = fs.readFileSync(imageFile.path);
//     const imageBlob =new Blob([imageBuffer],{type:'image/jpg'})
//     const imageBufferPromise = imageBlob.arrayBuffer();

//     imageBufferPromise.then((buffer) => {
//     const imageBlobBuffer = Buffer.from(buffer);
//     const imageBase64 = imageBlobBuffer.toString('base64');
//     const imageUrl = `data:image/jpg;base64,${imageBase64}`;
//     console.log(imageUrl)
  
//     res.render('display', { imageUrl });
//     }).catch((error) => {
//     console.error('Error occurred while retrieving the image buffer:', error);
//     });

    
// });


router.post('/upload', upload.single('image'), (req, res) => {
    const imageFile = req.file;

    if (!imageFile) {
      res.status(400).send('No image file provided');
      return;
    }
  
    const imageBuffer = fs.readFileSync(imageFile.path);
    const imageBase64 = imageBuffer.toString('base64');
    const imageUrl = `data:image/jpg;base64,${imageBase64}`;
    console.log(imageUrl)
  
    res.render('display', { imageUrl });
    
});





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
    (req, res) => {
        res.render('./home', { message: "Η αξιολόγηση πραγματοποιήθηκε επιτυχώς" });
    }
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
        res.render("restaurants",{username: req.body.username})
    }
);

router.post("/doRegister",
    Validator.validateNewUser,
    UserController.doRegister,
    UserController.doLogin,
    (req, res) => {
        res.render("restaurants", { message: "Η εγγραφή του χρήστη έγινε με επιτυχία" })
    }
);


router.get('/userProfile',
    UserController.checkIfAuthenticated,
    UserController.userProfileRender,
    (req, res) => {
          res.render("restaurants", { message: "Η ανάκτηση του προφιλ του χρήστη απέτυχε" });
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


router.post('/place-restaurant',
    UserController.checkIfAuthenticated,
    upload.single('image'),
    AdminController.addRestaurant,
    (req, res) => {
        res.render('./adminHome', { message: "Η προσθήκη εστιατορίου πραγματοποιήθηκε επιτυχώς" });
    }
);

router.get('/addRestaurant',
    UserController.checkIfAuthenticated,
    (req,res)=>{
        res.render('./add-restaurant');
    }
);

router.get('/addMenu/:restaurantId',
    UserController.checkIfAuthenticated,
    (req,res)=>{
        res.render('./add-menu',{restaurantId:req.params.restaurantId});
    }
);

router.post('/doAddMenu/:restaurantId',
    UserController.checkIfAuthenticated,
    upload.single('image'),
    AdminController.addMenu,
    (req, res) => {
        res.render('./adminHome', { message: "Η προσθήκη Μενού πραγματοποιήθηκε επιτυχώς" });
    }
);

router.get('/addItem/:menuId',
    UserController.checkIfAuthenticated,
    (req,res)=>{
        res.render('./add-item',{menuId:req.params.menuId});
    }
);


router.post('/doAddItem/:menuId',
    UserController.checkIfAuthenticated,
    upload.single('image'),
    AdminController.addItem,
    (req, res) => {
        res.render('./adminHome', { message: "Η Προσθήκη προιόντος πραγματοποιήθηκε επιτυχώς" });
    }
);


router.get('/restaurants/menu/menuItems/deleteItem/:itemId',
    UserController.checkIfAuthenticated,
    AdminController.deleteItem,
    (req,res)=>{
        res.render('./adminHome', { message: "Η Διαγραφή προιόντος πραγματοποιήθηκε επιτυχώς" });
    }
);

router.get('/restaurants/menu/menuItems/deleteRestaurant/:restaurantId',
    UserController.checkIfAuthenticated,
    AdminController.deleteRestaurant,
    (req,res)=>{
        res.render('./adminHome', { message: "Η Διαγραφή εστιατορίου πραγματοποιήθηκε επιτυχώς" });
    }
);

router.get('/restaurants/menu/menuItems/deleteMenu/:menuId',
    UserController.checkIfAuthenticated,
    AdminController.deleteMenu,
    (req,res)=>{
        res.render('./adminHome', { message: "Η Διαγραφή του Μενού πραγματοποιήθηκε επιτυχώς" });
    }
);


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
        res.render("adminHome", { username: req.body.username })
    }
);

router.post("/doAdminRegister",
    Validator.validateNewUser,
    AdminController.doRegister,
    AdminController.doLogin,
    (req, res) => {
        res.render("adminHome", { message: "Η εγγραφή του χρήστη έγινε με επιτυχία" })
    }
);

router.get('/adminProfile',
UserController.checkIfAuthenticated,
AdminController.adminProfileRender,
(req, res) => {
      res.render("adminHome", { message: "Η ανάκτηση του προφιλ του χρήστη απέτυχε" });
  }
);


router.get('/adminHome',
    UserController.checkIfAuthenticated,
    AdminController.adminHomePageRender,
    (req, res) => {
        res.render("adminHome", { message: "Η ανάκτηση του προφιλ του χρήστη απέτυχε" });
    }
);

//CRUD

router.get('/editRating/:reviewId/:itemId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    crudController.updateReviewForm,
    (req,res)=>{
        res.render("restaurants", { message: "" });
    }
)

router.post('/updateReview/:reviewId',
    UserController.checkIfAuthenticated,
    UserController.checkIfUser,
    crudController.updatereview,
    (req,res)=>{
        res.render("restaurants", { message: "Η ενημέρωση της κριτικής σας έγινε με επιτυχία" });
    }
)

router.get('/editMenu/:menuId',
    UserController.checkIfAuthenticated,
    crudController.updateMenuForm,
    (req,res)=>{
        res.render("adminHome", { message: "" });
    }
)
router.post('/doMenuEdit/:menuId',
    UserController.checkIfAuthenticated,
    crudController.updateMenu,
    (req,res)=>{
        res.render("adminHome", { message: "Η ενημέρωση του Μενού σας έγινε με επιτυχία"});
    }
)


router.get('/editItem/:itemId',
    UserController.checkIfAuthenticated,
    crudController.updateMenuItemForm,
    (req,res)=>{
        res.render("adminHome", { message: "" });
    }
)
router.post('/doItemEdit/:itemId',
    UserController.checkIfAuthenticated,
    crudController.updateItem,
    (req,res)=>{
        res.render("adminHome", { message: "Η ενημέρωση του Menu Item σας έγινε με επιτυχία"});
    }
)

router.get('/editRestaurant/:restaurantId',
    UserController.checkIfAuthenticated,
    crudController.updateRestaurantForm,
    (req,res)=>{
        res.render("adminHome", { message: "" });
    }
)
router.post('/doRestaurantEdit/:restaurantId',
    UserController.checkIfAuthenticated,
    crudController.updateRestaurant,
    (req,res)=>{
        res.render("adminHome", { message: "Η ενημέρωση του Εστιατορίου σας έγινε με επιτυχία"});
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
    (req,res)=>{
        res.render("adminHome", { message: "Η ενημέρωση του κωδικού πρόσβασης έγινε με επιτυχία" });
    }
)

export default router;

