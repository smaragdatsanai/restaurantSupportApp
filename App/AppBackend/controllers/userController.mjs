import * as User from '../models/user.mjs' // version 3 with ORM sequelize, postgress
import * as Review from '../models/review.mjs' 

const doLogin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const user = await User.login(username,password)
        if (user) {
            req.session.username = req.body.username // το username μπαίνει σαν μεταβλητή συνεδρίας
            req.session.userId=user.User_Id
            res.locals.username = req.session.username
            req.session.userType = "User"; 
            res.locals.userType = req.session.userType; 
            console.log(res.locals.userType)
            next() 
        }
        else {
            throw new Error("άγνωστο σφάλμα")
        }
    }catch(error){
        next(error)
    }
}

const doRegister = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    console.log(req.body)
    try {
        const user = await User.addUser(username,password,email)
        if (user) {
            next()
        }
        else {
            throw new Error("άγνωστο σφάλμα κατά την εγγραφή του χρήστη")
        }
    } catch (error) {
        next(error)
    }
}

const doLogout = (req, res, next) => {
    req.session.destroy() //καταστρέφουμε τη συνεδρία στο session store
    next()
}
const userProfileRender= async (req, res, next)=>{
    try {
        const userId=req.session.userId
        const userReviews = await Review.getAllUserReviews(userId)
        console.log(userReviews)
        res.render('./profile',{reviews:userReviews, userType:req.session.userType})
        }catch (error) {
        next(error)
    }
}

function checkIfAuthenticated(req, res, next) {
    if (req.session.username) { //αν έχει τεθεί η μεταβλητή στο session store θεωρούμε πως ο χρήστης είναι συνδεδεμένος
        res.locals.username = req.session.username
        res.locals.userType = req.session.userType
        next() //επόμενο middleware
    }
    else
        res.redirect("/") //αλλιώς ανακατεύθυνση στην αρχική σελίδα
}

function checkIfUser(req, res, next) {
    if (req.session.userType=='User') { 
        next() //επόμενο middleware
    }
    else
        res.redirect("/") //αλλιώς ανακατεύθυνση στην αρχική σελίδα
}

export { checkIfAuthenticated, doLogin, doRegister, doLogout, userProfileRender,checkIfUser }