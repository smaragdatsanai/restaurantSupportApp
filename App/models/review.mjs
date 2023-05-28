import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";

export async function getAllitemRatings(itemId){
    try{
        const itemReview = await Review.findAll({
            where: {
                MenuItemId: itemId
            }
          });
        return  itemReview.map(item => item.toJSON());
    }
    catch{
        console.error('Error retrieving Item\'s Review:', error);
        return [];
    }
}


export async function getAllUserReviews(userId){
    try{
      const userReviews = await Review.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Menu_Item,
            include: [
              {
                model: Menu,
                include: [
                  {
                    model: Restaurant
                  }
                ]
              }
            ]
          }
        ]
      });
        return  userReviews.map(item => item.toJSON());
    }
    catch (error) {
      console.error('Error retrieving Reviews:', error);
    }
}
export async function addItemReview(revv,comment,userId,itemId){
    try{
        await Review.create({
            Review_Id :faker.datatype.uuid(),
            Rating: revv,
            Comments:comment,
            UserId:userId,
            MenuItemId:itemId,
          });
    }
    catch{

    }
}

