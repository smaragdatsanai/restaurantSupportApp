import * as Review from '../models/review.mjs' // version 3 with ORM sequelize, postgress

const  addRating = async (req,res,next) => {
    try{
        itemId=req.params.itemId;
        userId=req.params.userId;
        rating=req.body.Rating;
        description=req.body.Description;
        const menus= await Review.addRating()
    }catch(error){
      next(error)  
    }
}

export {addRating}