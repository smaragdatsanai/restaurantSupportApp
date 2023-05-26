import * as Owner from '../models/admin.mjs' // version 3 with ORM sequelize, postgress
import * as seqObj from '../models/database.mjs'


const doLogin = async (req, res, next) => {
    try{
        console.log("doadminlogin")
        console.log(req.body.username)
        console.log(req.params)
        console.log(req.query)
        const owner = await Owner.login(req.body.username, req.body.password)
        if (owner) {
            req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
            req.session.userId=owner.Owner_Id
            res.locals.username = req.session.username 
            req.session.userType = "Admin"; // Corrected line
            res.locals.userType = req.session.userType; // Corrected line
            console.log(owner)
            next()
        }
        else{
            throw new Error ("άγνωστο σφάλμα")
        }
    }catch(error){
    next(error)
    }
}

const doRegister = async (req, res, next) => {
    try{
        console.log("doadminregister")
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)
        const owner = await Owner.addOwner(req.body.firstName,req.body.lastName,req.body.phone,req.body.email,req.body.username,req.body.password)
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

const findReviews = async (req,res,next) => {
    const reviews = await seqObj.Review.findAll()
    req.reviews = reviews
    console.log(reviews)
    next()
}
const addRestaurant = async (req,res,next) => {
    try{
        const name = req.body.name;
        const address = req.body.address;
        const opens= req.body.opens;
        const closes = req.body.closes;
        const type = req.body.type;
        const ownerid = req.session.userId
        console.log(req.body)
        console.log(name,address,opens,closes,type,ownerid)
        const restaurant = await Owner.addOwnerRestaurant(name,address,opens,closes,type,ownerid)
        req.restaurant=restaurant;
        console.log(restaurant);
        next();
    }catch(error){
        next(error)
    }
}
export { doRegister, doLogin , findReviews,addRestaurant}
