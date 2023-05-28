import * as Crud from '../models/CRUD.mjs'
import * as seqObj from '../models/database.mjs'

const updateMenuItemForm = async (req,res,next)=>{
    try{
        const item = await seqObj.Menu_Item.findByPk(req.params.itemId);
        res.render('edit-item',{
            itemId: req.params.itemId,
            itemname: item.Name,
            description : item.Description,
            price: item.Price
        })
    }catch(error){
        next(error)
    }
}



const updateItem = async (req,res,next) => {
    try{
        console.log("UPDATING ITEM")
        const itemid = req.params.itemId;
        const newname= req.body.newname;
        const newdescription= req.body.newdescription;
        const newprice= req.body.newprice;
        console.log(newname,newdescription,newprice)
        const newitem = await Crud.updateMenuItem(newname,newdescription,newprice,itemid);
        req.newitem=newitem;
        next()
    }catch(error){
        next(error)
    }
}


const updateMenuForm = async (req,res,next)=>{
    try{
        console.log("started")
        const menu = await seqObj.Menu.findByPk(req.params.menuId);
        res.render('edit-menu',{
            Menu_Id: req.params.menuId,
            name: menu.Name,
            type: menu.Type,
            opens: menu.Active_from,
            closes: menu.Active_until,
        })
    }catch(error){
        next(error)
    }
}



const updateMenu = async (req,res,next)=>{
    try{
        console.log("begun")
        const id = req.params.menuId;
        const newname = req.body.name;
        const newtype = req.body.type;
        const newopens = req.body.opens;
        const newcloses = req.body.closes;
        console.log(id,newname,newtype,newopens,newcloses)
        const newmenu = await Crud.updatemenu(id,newname,newtype,newopens,newcloses)
        next()
    }catch(error){
        next(error)
    }
}



const changepassword = async (req,res,next)=>{
    try{
        const userType = req.session.userType;
        const newpassword = req.body.newpassword;
        const id = req.session.userId
        console.log(userType,id,newpassword)
        const changedpassword = await Crud.changeuserpassword(userType,newpassword,id)
        console.log(changedpassword);
        next()
    }catch(error){
        next(error)
    }
}



const updateRestaurantForm = async (req,res,next)=>{
    try{
        console.log("started")
        const restaurant = await seqObj.Restaurant.findByPk(req.params.restaurantId);
        res.render('./edit-restaurant',{
            Restaurant_Id: req.params.restaurantId,
            restaurantname: restaurant.Name,
            address: restaurant.Address,
            opens: restaurant.Opens_on,
            closes: restaurant.Closes_at,
            type: restaurant.Restaurant_Type,
        })
    }catch(error){
        next(error)
    }
}


const updateRestaurant = async (req,res,next)=>{
    try{
        console.log("begun")
        const id = req.params.restaurantId;
        const newname = req.body.name;
        const newaddress = req.body.address;
        const newopens = req.body.opens;
        const newcloses = req.body.closes;
        const newtype = req.body.type;
        console.log(id,newname,newaddress,newopens,newcloses,newtype)
        await Crud.updaterestaurant(id,newname,newaddress,newopens,newcloses,newtype)
        next()
    }catch(error){
        next(error)
    }
}


const updateReviewForm = async (req,res,next)=>{
    try{
        console.log("started")
        const review = await seqObj.Review.findByPk(req.params.reviewId);
        console.log(review,req.params.reviewId)
        res.render('edit-review',{
            Review_Id: req.params.reviewId,
            rating: review.Rating,
            description: review.Comments,
            Item_Id: req.params.itemId
        })
    }catch(error){
        next(error)
    }
}

const updatereview = async (req,res,next)=>{
    try{
        console.log("begun")
        const reviewid = req.params.reviewId;
        const newrating = parseInt(req.body.rating);
        const newdescription = req.body.description;
        console.log(reviewid,newrating,newdescription)
        const newreview = await Crud.editreview(reviewid,newrating,newdescription)
        next()
    }catch(error){
        next(error)
    }
}
const deleteReview= async (req,res,next)=>{
    try{
    console.log("DELETING Review")
    const reviewid =req.params.Review_Id
    const review = await Crud.deleteReview(reviewid)
    console.log(review);
    next()
    }catch(error){
        next(error)  
    }
}


export {updatereview,updateReviewForm,updateRestaurant,updateRestaurantForm,changepassword,updateMenu,updateMenuForm,updateItem,updateMenuItemForm,deleteReview}