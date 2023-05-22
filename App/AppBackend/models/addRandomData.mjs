import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import faker from 'faker' ;
import { sequelize } from './dbConfig.mjs';
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";



// Add random data to the database
export async function addRandomData() {
    try {
      // Sync models with the database
      await sequelize.sync({ alter: true });
  
      // Create owners
      for (let i = 0; i < 5; i++) {
        await Owner.create({
          Owner_Id: faker.datatype.uuid(),
          First_Name: faker.name.firstName(),
          Last_Name: faker.name.lastName(),
          Phone: faker.phone.phoneNumber(),
          Email: faker.internet.email(),
          Username: faker.internet.userName(),
          Password: faker.internet.password(),
        });
      }
  
      // Create restaurants
      const owners = await Owner.findAll();
      const nnames= ['Yummy Restaurant','La Pasteria','I Fratti','Brunelo','Avli','Salumeria','Abbie','Ovio','Allio','Cozy'];
      for (let i = 0; i < 10; i++) {
        const owner = faker.random.arrayElement(owners);
        await Restaurant.create({
          Restaurant_Id: faker.datatype.uuid(),
          Name: nnames[i],
          OwnerId: owner.Owner_Id,
          Address: faker.address.streetAddress()
        });
      }
  
      // Create menus
      const restaurants = await Restaurant.findAll();
      const nametypes= ['Drinks','Breakfast','Dinner','Lunch','Wines','All Day'];
      for (let i = 0; i < 20; i++) {
        const restaurant = faker.random.arrayElement(restaurants);
        const nametype = faker.random.arrayElement(nametypes);
        await Menu.create({
          Menu_Id: faker.datatype.uuid(),
          Name: nametype,
          Type: nametype,
          RestaurantId: restaurant.Restaurant_Id,
        });
      }
  
      // Create menu items
      const menus = await Menu.findAll();
      for (let i = 0; i < 10; i++) {
        const menu = faker.random.arrayElement(menus);
        if (menu.Type === nametypes[0]){
            const drinks= ['Paloma','Mojito','Margaritta','Cosmopolitan'];
            const descr= ['A refreshing blend of tequila, grapefruit soda, and a splash of lime.','A classic Cuban cocktail featuring rum, muddled mint leaves, lime juice, and a touch of sweetness.',' A tangy and zesty concoction made with tequila, lime juice, and a hint of orange liqueur.','A sophisticated and glamorous cocktail made with vodka, cranberry juice, orange liqueur, and a splash of lime. '];
            const min = 15.00;
            const max= 20.00;
            for (let i=0; i<4;i++){ 
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: drinks[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max, precision : 0.01}),
                    MenuId: menu.Menu_Id
                });
            }
        }
        if (menu.Type === nametypes[1]){
            const food= ['Omelette','Pancakes','Avocado Toast','Breakfast Buritto','Granola Bowl'];
            const descr= ['Fluffy eggs filled with a savory combination of diced vegetables, cheese, and herbs, cooked to perfection. Served with a side of crispy toast.',' Light and fluffy buttermilk pancakes, drizzled with maple syrup and topped with a pat of melted butter. Served with a side of fresh berries.','oasted artisan bread topped with creamy smashed avocado, a sprinkle of sea salt, and a dash of lemon juice. Garnished with microgreens for a fresh touch.','A hearty flour tortilla filled with scrambled eggs, crispy bacon, melted cheese, and a zesty salsa. Served with a side of salsa and sour cream.','A nutritious blend of crunchy granola, Greek yogurt, and a medley of seasonal fruits, such as sliced bananas, berries, and diced mango. Drizzled with honey for natural sweetness.'];
            const min = 7.50;
            const max = 13.00;
            for (let i =0; i<5;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    MenuId: menu.Menu_Id
                });
            }

        }
        if (menu.Type === nametypes[2]){
            const food = ['Grilled Salmon','Beef Stir-Fry','Creamy Chicken Avocado','Vegetarian Pad Thai'];
            const descr = ['Tender grilled salmon fillet served with a side of roasted vegetables and a zesty lemon butter sauce.','Sliced beef sautéed with colorful bell peppers, onions, and broccoli, tossed in a savory soy-based sauce, served over steamed rice.','Creamy fettuccine pasta tossed with tender grilled chicken, topped with grated Parmesan cheese and fresh parsley.','Stir-fried rice noodles with an array of fresh vegetables like carrots, bell peppers, and bean sprouts, tossed in a tangy tamarind sauce and garnished with crushed peanuts.'];
            const min= 14.50;
            const max = 24.00;
            for (let i=0;i<4;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    MenuId: menu.Menu_Id
                });
            }
        }
        if (menu.Type === nametypes[3]){
            const food = ['Grilled Chicken Salad','Vegetable Stir-Fry','Classic BLT Sandwich','Spinach and Feta Stuffed Chicken Breast'];
            const descr = ['A delicious mix of grilled chicken, fresh lettuce, cherry tomatoes, cucumbers, and tangy vinaigrette dressing. Served with a side of garlic bread.','A healthy and flavorful stir-fry dish made with an assortment of fresh vegetables, including bell peppers, broccoli, carrots, and snap peas. Tossed in a savory soy-ginger sauce and served over steamed jasmine rice.','A timeless favorite featuring crispy bacon, crisp lettuce, juicy tomatoes, and mayo layered between two slices of toasted bread. Served with a side of golden fries.',' Tender chicken breast stuffed with a savory blend of sautéed spinach, creamy feta cheese, and aromatic herbs. Served with roasted potatoes and a side of steamed seasonal vegetables.'];
            const min = 12.50;
            const max = 18.99;
            for (let i=0;i<4;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    MenuId: menu.Menu_Id

                });
            }
        }
        if (menu.Type=== nametypes[4]){
            const drinks = ['Lemon Fizz','Citrus Splash','Black Coffee','Espresso','Orange Juice'];
            const descr = ['A refreshing lemon-flavored soda with a fizzy twist. ','The zesty combination of oranges, lemons, and limes will awaken your senses.','A rich and bold cup of black coffee with a deep flavor profile.','A concentrated shot of coffee with a strong and intense flavor.','A refreshing and zesty glass of orange juice bursting with natural sweetness.'];
            const min = 2.50;
            const max= 4.99;
            for (let i=0;i<5;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: drinks[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    MenuId: menu.Menu_Id
                });
            }
        }
      }
  
      // Create users
      for (let i = 0; i < 10; i++) {
        await User.create({
          User_Id: faker.datatype.uuid(),
          Username: faker.internet.userName(),
          Password: faker.internet.password(),
          Email: faker.internet.email(),
        });
      }
  
      // Create reviews
      const users = await User.findAll();
      const items = await Menu_Item.findAll();
      const rev = ['1','2','3','4','5'];
      for (let i = 0; i < 15; i++) {
        const user = faker.random.arrayElement(users);
        const item = faker.random.arrayElement(items);
        const revv = faker.random.arrayElement(rev);
        if (revv==='1' || revv==='2'){
            const comments = ['I did not enjoy it at all!','The taste was not for me.','Very bad for how expensive it was.','Was not the worst but it could be a lot better.','Not happy at all with it.','The food was lacking flavor.'];
            await Review.create({
                Review_Id :faker.datatype.uuid(),
                Rating: revv,
                Comments: faker.random.arrayElement(comments),
                UserId: user.User_Id,
                MenuItemId: item.Item_Id,
              });
        }
        if (revv==='3'){
            const comments = ['Pretty good but I was not thrilled.','Would try again,however I was not completely satisfied.','Nice taste but something was throwing me off.','Although food was very nice,we waited a lot for it so it was very cold.','Nice pick from the menu just was not that thrilled.'];
            await Review.create({
                Review_Id :faker.datatype.uuid(),
                Rating: revv,
                Comments: faker.random.arrayElement(comments),
                UserId: user.User_Id,
                MenuItemId: item.Item_Id,
              });
        }
        if (revv==='4' || revv==='5'){
            const comments = ['Amazing item and the most polite stuff!!','I loved everything, the performance of the plate was a state of the art!','Great personel, incredible flavors. 10/10 recommend!!','The food was good and worth every peny!','Loved this item, I would for sure advise everyone to try it!'];
            await Review.create({
                Review_Id :faker.datatype.uuid(),
                Rating: revv,
                Comments: faker.random.arrayElement(comments),
                UserId: user.User_Id,
                MenuItemId: item.Item_Id,
              });
        }
        
      }
  
      console.log('Random data added successfully.');
    } catch (error) {
      console.error('Error adding random data:', error);
    } finally {
      // Close the database connection
      await sequelize.close();
    }
  }
  
  // // Call the function to add random data
  // addRandomData();