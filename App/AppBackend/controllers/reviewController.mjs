export async function addRating(req,res) {
    try{
        const menus= await Restaurant.showMenu(req.params.restaurantId)
    }catch(error){
      res.send(error)  
    }
}