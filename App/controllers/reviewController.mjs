import * as Review from '../models/review.mjs' // version 3 with ORM sequelize, postgress

const  addRating = async (req,res,next) => {
    try{
        const itemId=req.params.itemId;
        const userId=req.session.userId;
        const rating=req.body.rating;
        const description=req.body.description;
        console.log(req.body)
        console.log(rating,description)
        const menus= await Review.addItemReview(rating,description,userId,itemId)
        next()
    }catch(error){
      next(error)  
    }
}

export {addRating}