import * as UserController from './controllers/userController.mjs'
import * as MenuController from './controllers/menuController.mjs'
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'



const router=express.Router()

router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect("/")
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


export {router}

