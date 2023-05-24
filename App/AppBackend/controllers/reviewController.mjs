import * as Review from '../models/review.mjs' // version 3 with ORM sequelize, postgress
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export async function addRating(req,res) {
    try{
        itemId=req.params.itemId;
        userId=req.params.userId;
        rating=req.body.Rating;
        description=req.body.Description;
        const menus= await Review.addRating()
    }catch(error){
      res.send(error)  
    }
}