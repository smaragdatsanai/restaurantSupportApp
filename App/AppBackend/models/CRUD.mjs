import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import bcrypt from "bcrypt"

export async function updateMenuItem (newname,newdescription,newprice,itemid){
    try{
      await Menu_Item.update({
        Name: newname,
        Description: newdescription,
        Price: newprice
      },
      {
        where: {Item_Id: itemid}
      }
      );
    }catch(error){
      console.error('Error updating Item:',error);
    }
  }


export async function updatemenu(id,newname,newtype,newopens,newcloses){
    try{
      await Menu.update({
        Name: newname,
        Type: newtype,
        Active_from: newopens,
        Active_until: newcloses
      },
      {
        where: {Menu_Id: id}
      }
      );
    }catch(error){
      console.error('Error updating Menu:',error);
    }
  }

export async function changeuserpassword(userType,newpassword,id){
    try{
        const Password_hash = await bcrypt.hash(newpassword, 10)
      if (userType==='Admin'){
        const user=await Owner.update({
          Password: Password_hash
        },
        {
          where: {Owner_Id:id}
        }
        );
        return user
      } 
      else if(userType==='User'){
       const user= await User.update({
          Password: Password_hash
        },
        {
          where: {User_Id:id}
        }
        );
        return user
      }
      else{
        throw new Error ("άγνωστο σφάλμα κατά την αλλαγή του κωδικού πρόσβασης")
      }
    }catch(error){
      console.error("Error changing password:",error)
    }
  
  }


export async function updaterestaurant(id,newname,newaddress,newopens,newcloses,newtype){
    try{
      await Restaurant.update({
        Name: newname,
        Address: newaddress,
        Opens_on: newopens,
        Closes_at: newcloses,
        Restaurant_Type: newtype
      },
      {
        where: {Restaurant_Id: id}
      }
      );
    }catch(error){
      console.error('Error updating Restaurant:',error);
    }
  }
  


export async function editreview(reviewid,newrating,newdescription){
    try{
        await Review.update(
            {
              Rating: newrating,
              Comments: newdescription,
            },
            {
              where: { Review_Id: reviewid },
            }
          );
          
    }catch(error){
      console.error('Error updating Review:',error);
    }
  }


  export async function deleteReview(reviewId) {
    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        throw new Error('review not found');
      }
    
      await review.destroy();
      console.log('review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  }
  