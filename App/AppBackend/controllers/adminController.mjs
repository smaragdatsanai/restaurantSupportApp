import * as Owner from '../models/admin.mjs' 
import * as seqObj from '../models/database.mjs'


const doLogin = async (req, res, next) => {
    const owner = await Owner.login(req.body.username, req.body.password)
    console.log(owner)
    next()
}

const doRegister = async (req, res, next) => {
        const owner = await Owner.addOwner(req.body.First_Name,req.body.Last_Name,req.body.username,req.body.password,req.body.email)
        console.log(owner)
        next()
}

const findReviews = async (req,res,next) => {
    const reviews = await seqObj.Review.findreviewss(req.body.ownerId);
    req.reviews = reviews;
    next()
}

const findMenusByOwnerId = async (req, res, next) => {
      const menus = await seqObj.Menu.findMenus(req.body.ownerId);
      req.menus = menus;
      next();
  }
  
  const addMenuItems = async (req, res, next) => {
    const newitem = await seqObj.Menu_Item.addItems(req.body.ownerId);
    req.newitem = newitem;
    next();
  };
  
  const deleteMenuItem = async (req, res, next) => {
    const item = await seqObj.Menu_Item.deleteItem(req.body.ownerId,req.body.menuItemId);
    req.item = item;
    next();
  };
  
  

export { doRegister, doLogin , findReviews, findMenusByOwnerId,addMenuItems,deleteMenuItem}