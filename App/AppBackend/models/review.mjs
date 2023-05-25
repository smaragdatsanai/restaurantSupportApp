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


export async function getAllUserRatings(userId){
    try{
        const userReview = await Review.findAll({
            where: {
                UserId: userId
            }
          });
        return  userReview.map(item => item.toJSON());
    }
    catch{
        console.error('Error retrieving Item\'s Review:', error);
        return [];
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

export async function itemAvgRating(itemId){
    try{
        const sql = `SELECT Rating FROM "Menu_Item" join "Review" WHERE "Item_Id"='${itemId}';`;
    }
    catch{

    }
}



// Synchronize the models with the database (create the tables if they don't exist)


