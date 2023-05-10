// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'
const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει, το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return, the file /public/style.css
app.use(express.static('public'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs' }));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. activated with res.render())
app.set('view engine', 'hbs');

let userMainRender= function(req,res){
    res.render('./userMain');
}


let userProfileRender= function(req,res){
    res.render('./userProfile');
}

let menuRender= function(req,res){
    res.render('./menu');
}

let userSatrtingPageRender= function(req,res){
    res.render('./userSatrtingPage');
}


let userSigninRender= function(req,res){
    res.render('./userSignin');
}

let userRegister= function(req,res){
    res.render('./userRegister');
}
/* Χρησιμοποίησε τις διαδρομές που υπάρχουν στο  router */
app.use(router); //load the router 'routes' on '/'


router.route('/').get(userSatrtingPageRender);
router.route('/userSigninRender').get(userSigninRender);
router.route('/userRegister').get(userRegister);
router.route('/userMain').get(userMainRender);
router.route('/userProfile').get(userProfileRender);
router.route('/menu').get(menuRender);



/* Επίσης έτσι: */
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);



const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });
