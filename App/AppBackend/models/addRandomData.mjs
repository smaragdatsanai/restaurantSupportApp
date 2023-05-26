import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";
import { Blob } from 'buffer';
import fs from 'fs';





// Add random data to the database
export async function addRandomData() {
    try {
      // Sync models with the database
      await sequelize.sync({ alter: true });
  
      // Create owners
      for (let i = 0; i < 10; i++) {
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
        const photodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/restphoto.jpg`);
        const photoblob = new Blob([photodata], {type: 'image/jpg'});
        const owner = owners[i];
        const type = types[i];
        if (type=== 'Breakfast & Brunch'){
          const startTime1 = new Date();
          startTime1.setHours(9, 0, 0); 
          const startTime2 = new Date();
          startTime2.setHours(18, 0, 0); 

          const endTime1 = new Date();
          endTime1.setHours(12, 0, 0);
          const endTime2 = new Date();
          endTime2.setHours(20, 0, 0);  
          await Restaurant.create({
            Restaurant_Id: faker.datatype.uuid(),
            Name: nnames[i],
            OwnerId: owner.Owner_Id,
            Address: faker.address.streetAddress(),
            Opens_on: faker.date.between(startTime1,endTime1).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Closes_at: faker.date.between(startTime2,endTime2).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Image: photoblob,
            Restaurant_Type: type,
          });
        }
        else {
          const startTime1 = new Date();
          startTime1.setHours(12, 0, 0); 
          const startTime2 = new Date();
          startTime2.setHours(22, 0, 0); 

          const endTime1 = new Date();
          endTime1.setHours(14, 0, 0);
          const endTime2 = new Date();
          endTime2.setHours(23, 0, 0); 
          await Restaurant.create({
            Restaurant_Id: faker.datatype.uuid(),
            Name: nnames[i],
            OwnerId: owner.Owner_Id,
            Address: faker.address.streetAddress(),
            Opens_on: faker.date.between(startTime1,endTime1).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Closes_at: faker.date.between(startTime2,endTime2).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Image: photoblob,
            Restaurant_Type: type,
          });
        }

      }
  
      // Create menus
      const restaurants = await Restaurant.findAll();
      const nametypes= ['Drinks','Breakfast','Dinner','Wines'];
      const fooddata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/menu.jpg`);
      const foodblob = new Blob([fooddata], {type: 'image/jpg'});
      const drinksdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/drinks.jpg`);
      const drinksblob = new Blob([drinksdata], {type: 'image/jpg'});
      const winedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/wines.jpg`);
      const wineblob = new Blob([winedata], {type: 'image/jpg'});
      for (let i = 0; i < 10; i++) {
        const restaurant = restaurants[i];
        if (restaurant.Restaurant_Type === 'Italian' || restaurant.Restaurant_Type==='Mexican' || restaurant.Restaurant_Type==='Greek' || restaurant.Restaurant_Type==='Burgers' || restaurant.Restaurant_Type==='Steakhouse' || restaurant.Restaurant_Type==='Indian' || restaurant.Restaurant_Type==='Chinese' || restaurant.Restaurant_Type==='Sushi' || restaurant.Restaurant_Type==='Fish'){
          const startTime1 = new Date();
          startTime1.setHours(14, 0, 0); 

          const endTime1 = new Date();
          endTime1.setHours(15, 0, 0);
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[0],
            Type: nametypes[0],
            Active_from: faker.date.between(startTime1,endTime1).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Active_until: restaurant.Closes_at,
            Image: drinksblob,
            RestaurantId: restaurant.Restaurant_Id,
          });
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[2],
            Type: nametypes[2],
            Active_from: restaurant.Opens_on,
            Active_until: restaurant.Closes_at,
            Image: foodblob ,
            RestaurantId: restaurant.Restaurant_Id,
          });
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[3],
            Type: nametypes[3],
            Active_from: faker.date.between(startTime1,endTime1).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Active_until: restaurant.Closes_at,
            Image:wineblob ,
            RestaurantId: restaurant.Restaurant_Id,
          });
        }
        if (restaurant.Restaurant_Type === 'Breakfast & Brunch'){
          const startTime1 = new Date();
          startTime1.setHours(14, 0, 0);  

          const endTime1 = new Date();
          endTime1.setHours(15, 0, 0);
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[0],
            Type: nametypes[0],
            Active_from: restaurant.Opens_on,
            Active_until: restaurant.Closes_at,
            Image: drinksblob,
            RestaurantId: restaurant.Restaurant_Id,
          });
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[1],
            Type: nametypes[1],
            Active_from: restaurant.Opens_on,
            Active_until: restaurant.Closes_at,
            Image: foodblob,
            RestaurantId: restaurant.Restaurant_Id,
          });
          await Menu.create({
            Menu_Id: faker.datatype.uuid(),
            Name: nametypes[3],
            Type: nametypes[3],
            Active_from: faker.date.between(startTime1,endTime1).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            Active_until: restaurant.Closes_at,
            Image:wineblob,
            RestaurantId: restaurant.Restaurant_Id,
          });
        }
        
      }
  
      // Create menu items
      const menus = await Menu.findAll();
      for (let i = 0; i < 30; i++) {
        const menu = menus[i];
        const restaurant = await Restaurant.findOne({
          where: { Restaurant_Id: menu.RestaurantId }
        });
        if (menu.Type === nametypes[0] && restaurant.Restaurant_Type!=='Breakfast & Brunch'){
            const drinks= ['Paloma','Mojito','Margarita','Cosmopolitan','Glass of White Wine','Glass of Red Wine'];
            const descr= ['A refreshing blend of tequila, grapefruit soda, and a splash of lime.','A classic Cuban cocktail featuring rum, muddled mint leaves, lime juice, and a touch of sweetness.',' A tangy and zesty concoction made with tequila, lime juice, and a hint of orange liqueur.','A sophisticated and glamorous cocktail made with vodka, cranberry juice, orange liqueur, and a splash of lime. ','Light bodied with floral and tropical flavors.','Flavor that reminds ripe berries, cherries, spices with earthy notes.'];
            const min = 15.00;
            const max= 18.00;
            const palomadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/paloma.jpg`);
            const paloma = new Blob([palomadata], {type: 'image/jpg'});
            const mojitodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mojito.jpg`);
            const mojito= new Blob([mojitodata], {type: 'image/jpg'});
            const margarittadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/margarita.jpg`);
            const margaritta = new Blob([margarittadata], {type: 'image/jpg'});
            const cosmodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/cosmopolitan.jpg`);
            const cosmopolitan = new Blob([cosmodata], {type: 'image/jpg'});
            const whitedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/whitewine.jpg`);
            const whitewine = new Blob([whitedata], {type: 'image/jpg'});
            const reddata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/redwine.jpg`);
            const redwine = new Blob([reddata], {type: 'image/jpg'});
            const photos = [paloma,mojito,margaritta,cosmopolitan,whitewine,redwine];

            for (let i=0; i<6;i++){ 
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: drinks[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max, precision : 0.01}),
                    Image: photos[i],
                    MenuId: menu.Menu_Id
                });
            }
        }
        if (menu.Type === nametypes[0] && restaurant.Restaurant_Type==='Breakfast & Brunch'){
          const drinks= ['Caramel Macchiato','Matcha Latte','Freshly Squeezed Orange Juice','Berry Blast Smoothie','Iced Mocha','Herbal Infusion'];
          const descr= ['A delightful combination of rich espresso, velvety steamed milk, and a drizzle of sweet caramel.','A vibrant and earthy beverage made with high-quality matcha powder and steamed milk. This creamy and energizing drink offers a subtle sweetness and a boost of antioxidants.','Made from freshly squeezed oranges, this tangy and vitamin-packed drink is an ideal companion to a hearty breakfast.','A delightful blend of mixed berries, creamy yogurt, and a splash of honey.','A refreshing and indulgent blend of rich espresso, silky chocolate syrup, and chilled milk, poured over ice.','A soothing and caffeine-free blend of aromatic herbs and botanicals, carefully crafted to provide a calming and flavorful beverage. This herbal infusion offers a variety of options, such as chamomile, peppermint, or hibiscus, allowing guests to choose their preferred blend based on personal taste and wellness needs.'];
          const min = 4.00;
          const max= 7.00;
          const carameldata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/caramel.jpg`);
          const caramel = new Blob([carameldata], {type: 'image/jpg'});
          const matchadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/matcha.jpg`);
          const matcha = new Blob([matchadata], {type: 'image/jpg'});
          const orangedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/orange.jpg`);
          const orangejuice = new Blob([orangedata], {type: 'image/jpg'});
          const berrydata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/berry.jpg`);
          const berryblast = new Blob([berrydata], {type: 'image/jpg'});
          const mochadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mocha.jpg`);
          const mocha = new Blob([mochadata], {type: 'image/jpg'});
          const herbaldata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/herbal.jpg`);
          const herbal = new Blob([herbaldata], {type: 'image/jpg'});
          const photos = [caramel,matcha,orangejuice,berryblast,mocha,herbal];
          for (let i=0; i<6;i++){ 
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: drinks[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max, precision : 0.01}),
                  Image: photos[i],
                  MenuId: menu.Menu_Id
              });
          }
      }
        if (menu.Type === nametypes[3]){
            const wines = ['Paragka White','Paragka Red','Notos White','Chardonnay White','Malagouzia Red'];
            const descr = ['White, cool, fresh wine with beautiful acidity and citrus aromas. White Paranga pairs wonderfully with pasta with light sauces and seafood.','Its colour is bright red, while its bouquet is complex and reminiscent of blackberry with hints of green pepper. The whole has a light taste, volume, roundness and a dominant acidity that ensures a long aftertaste.','White wine with a medium lemon colour and green highlights. On the nose it impresses with aromas of citrus, green apple and fresh flowers, with a metallic background to follow.','An amazing white wine, with aromas of exotic fruits such as banana and pineapple. It has a balanced acidity in both the aromas and the aftertaste.','Its intensely fruity aromatic character gives aromas of peach and apple complemented by rose.'];
            const min = 20.50;
            const max = 27.00;
            const paragkawdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/white.jpg`);
            const paragkaw = new Blob([paragkawdata], {type: 'image/jpg'});
            const paragkardata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/red.jpg`);
            const paragkar = new Blob([paragkardata], {type: 'image/jpg'});
            const notosdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/white.jpg`);
            const notos = new Blob([notosdata], {type: 'image/jpg'});
            const chardata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/sparkly.jpg`);
            const char = new Blob([chardata], {type: 'image/jpg'});
            const malagouziadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/red.jpg`);
            const malagouzia = new Blob([malagouziadata], {type: 'image/jpg'});
            const winess = [paragkaw,paragkar,notos,char,malagouzia];
            for (let i =0; i<5;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: wines[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    Image: winess[i],
                    MenuId: menu.Menu_Id
                });
            }

        }
        if (menu.Type === nametypes[1]){
            const food= ['Omelette','Pancakes','Avocado Toast','Breakfast Buritto','Granola Bowl'];
            const descr= ['Fluffy eggs filled with a savory combination of diced vegetables, cheese, and herbs, cooked to perfection. Served with a side of crispy toast.',' Light and fluffy buttermilk pancakes, drizzled with maple syrup and topped with a pat of melted butter. Served with a side of fresh berries.','oasted artisan bread topped with creamy smashed avocado, a sprinkle of sea salt, and a dash of lemon juice. Garnished with microgreens for a fresh touch.','A hearty flour tortilla filled with scrambled eggs, crispy bacon, melted cheese, and a zesty salsa. Served with a side of salsa and sour cream.','A nutritious blend of crunchy granola, Greek yogurt, and a medley of seasonal fruits, such as sliced bananas, berries, and diced mango. Drizzled with honey for natural sweetness.'];
            const min= 11.50;
            const max = 15.00;
            const omelettedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/omelette.jpg`);
            const omelette = new Blob([omelettedata], {type: 'image/jpg'});
            const pancakesdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pancakes.jpg`);
            const pancakes = new Blob([pancakesdata], {type: 'image/jpg'});
            const avotoastdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/avotoast.jpg`);
            const avotoast = new Blob([avotoastdata], {type: 'image/jpg'});
            const burittodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/buritto.jpg`);
            const buritto = new Blob([burittodata], {type: 'image/jpg'});
            const granoladata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/granola.jpg`);
            const granola = new Blob([granoladata], {type: 'image/jpg'});
            const breakfast = [omelette,pancakes,avotoast,buritto,granola];
            for (let i=0;i<5;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    Image: breakfast[i],
                    MenuId: menu.Menu_Id,
                    Image: breakfast[i],
                    MenuId: menu.Menu_Id
                });
            }
        }
        if (menu.Type === nametypes[2] && restaurant.Restaurant_Type==='Italian'){
            const food = ['Spaghetti Carbonara','Margherita Pizza','Chicken Parmigiana','Risotto Milanese'];
            const descr = ['A classic Italian pasta dish consisting of spaghetti noodles tossed with crispy bacon, creamy egg-based sauce, Parmesan cheese, and freshly ground black pepper.','A traditional Italian pizza topped with fresh tomatoes, mozzarella cheese, basil leaves, and a drizzle of olive oil.',' A mouthwatering dish featuring breaded and fried chicken cutlets smothered in marinara sauce, melted mozzarella cheese, and a sprinkle of Parmesan. Served with a side of spaghetti or a salad.',' A creamy and flavorful rice dish cooked with Arborio rice, saffron threads, onions, and white wine.'];

            const min = 14.50;
            const max = 18.99;
            const carbonaradata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/carbonara.jpg`);
            const carbonara = new Blob([carbonaradata], {type: 'image/jpg'});
            const pizzadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pizza.jpg`);
            const pizza = new Blob([pizzadata], {type: 'image/jpg'});
            const chickendata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/chicken.jpg`);
            const chicken = new Blob([chickendata], {type: 'image/jpg'});
            const risottodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/risotto.jpg`);
            const risotto = new Blob([risottodata], {type: 'image/jpg'});
            const italian = [carbonara,pizza,chicken,risotto];
            for (let i=0;i<4;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    Image: italian[i],
                    MenuId: menu.Menu_Id,
                });
            }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Mexican'){
            const food = ['Enchiladas','Tacos al Pastor','Chiles Rellenos','Mole Poblano'];
            const descr = ['Rolled tortillas filled with seasoned meat, cheese, or beans, smothered in a savory tomato or chili sauce, and topped with melted cheese. Served with rice, beans, and garnished with fresh cilantro.',' Thinly sliced marinated pork cooked on a vertical spit, served in soft corn tortillas, and garnished with pineapple, onions, and cilantro. Bursting with flavors of tangy marinade, spices, and a hint of sweetness.','Roasted poblano peppers stuffed with a savory mixture of cheese, meat, or vegetables, dipped in egg batter, and fried to golden perfection. Served with a zesty tomato sauce and a side of Mexican rice.','A rich and flavorful dish featuring tender chicken simmered in a complex sauce made with a blend of spices, chilies, chocolate, and other ingredients. The result is a harmonious balance of sweet, savory, and spicy flavors, served with warm tortillas and rice.'];

            const min = 13.50;
            const max= 17.99;
            const enchiladasdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/enchiladas.jpg`);
            const enchiladas = new Blob([enchiladasdata], {type: 'image/jpg'});
            const tacosdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tacos.jpg`);
            const tacos = new Blob([tacosdata], {type: 'image/jpg'});
            const chilesdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/chiles.jpg`);
            const chiles = new Blob([chilesdata], {type: 'image/jpg'});
            const moledata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mole.jpg`);
            const mole = new Blob([moledata], {type: 'image/jpg'});
            const mexican = [enchiladas,tacos,chiles,mole];
            for (let i=0;i<4;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    Image: mexican[i],
                    MenuId: menu.Menu_Id,
                });
            }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Greek'){
          const food = ['Moussaka','Souvlaki','Spanakopita','Dolmades'];
          const descr = ['A traditional Greek dish consisting of layered eggplant, ground meat (often lamb or beef), and creamy béchamel sauce. Baked to perfection, it offers a harmonious blend of flavors and textures.','Skewered and grilled pieces of tender marinated meat, typically pork or chicken. Served with warm pita bread, tzatziki sauce, and a side of fresh salad, its a popular street food in Greece.','A delightful spinach and feta cheese pie wrapped in crispy phyllo pastry. This savory dish is bursting with flavors and makes a perfect appetizer or main course.','Grape leaves stuffed with a mixture of rice, herbs, and sometimes minced meat. These bite-sized delicacies are typically served as an appetizer or part of a mezze platter, offering a delightful combination of flavors and textures.'];

          const min = 14.50;
          const max= 17.99;
          const mousakadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mousaka.jpg`);
          const mousaka = new Blob([mousakadata], {type: 'image/jpg'});
          const souvlakidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/souvlaki.jpg`);
          const souvlaki = new Blob([souvlakidata], {type: 'image/jpg'});
          const spanakopitadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/spanakopita.jpg`);
          const spanakopita = new Blob([spanakopitadata], {type: 'image/jpg'});
          const dolmadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/dolma.jpg`);
          const dolma = new Blob([dolmadata], {type: 'image/jpg'});
          const greek = [mousaka,souvlaki,spanakopita,dolma];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: greek[i],
                  MenuId: menu.Menu_Id
              });
          }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Burgers'){
          const food = ['Classic Cheeseburger Delight','BBQ Bacon Burger Bonanza','Mushroom Swiss Burger Bliss','Spicy Jalapeño Burger Explosion'];
          const descr = ['Sink your teeth into a juicy beef patty topped with melted cheddar cheese, crisp lettuce, ripe tomatoes, and tangy pickles, all nestled between a soft sesame seed bun. Served with a side of golden fries.','Indulge in a mouthwatering burger featuring a flame-grilled beef patty slathered in smoky barbecue sauce, topped with crispy bacon, melted cheese, and caramelized onions. Served on a toasted brioche bun with a side of coleslaw.','Experience the perfect combination of flavors with a savory beef patty crowned with sautéed mushrooms, melted Swiss cheese, and a dollop of creamy garlic aioli. Nestled in a warm pretzel bun and accompanied by a side of sweet potato fries.','Enjoy a juicy beef patty loaded with zesty jalapeños, pepper jack cheese, and a smattering of spicy chipotle mayo. Tucked between a toasted ciabatta bun and accompanied by a side of crispy onion rings.'];

          const min = 14.50;
          const max= 17.99;
          const cheesedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/cheese.jpg`);
          const cheese = new Blob([cheesedata], {type: 'image/jpg'});
          const bbqdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/bbq.jpg`);
          const bbq = new Blob([bbqdata], {type: 'image/jpg'});
          const mushroomdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mushroom.jpg`);
          const mushroom = new Blob([mushroomdata], {type: 'image/jpg'});
          const spicydata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/spicy.jpg`);
          const spicy = new Blob([spicydata], {type: 'image/jpg'});
          const burgers = [cheese,bbq,mushroom,spicy];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: burgers[i],
                  MenuId: menu.Menu_Id
              });
          }
        }

        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Sushi'){
          const food = ['California Roll','Salmon Nigiri','Spicy Tuna Roll','Dragon Roll'];
          const descr = ['A classic sushi dinner featuring California rolls, a delicious combination of imitation crab, avocado, and cucumber wrapped in seasoned rice and seaweed.','Each piece consists of a slice of velvety salmon draped over a small mound of seasoned rice, offering a melt-in-your-mouth experience.','This sushi delight combines a fiery kick of spicy tuna, creamy mayo, and crisp cucumber rolled in rice and seaweed.','This artfully crafted roll features shrimp tempura, avocado, and cucumber inside, topped with slices of fresh eel and a drizzle of eel sauce.'];

          const min = 15.50;
          const max= 18.99;
          const californiadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/california.jpg`);
          const california = new Blob([californiadata], {type: 'image/jpg'});
          const nigiridata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/nigiri.jpg`);
          const nigiri = new Blob([nigiridata], {type: 'image/jpg'});
          const tunadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tuna.jpg`);
          const tuna = new Blob([tunadata], {type: 'image/jpg'});
          const dragondata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/dragon.jpg`);
          const dragon = new Blob([dragondata], {type: 'image/jpg'});
          const sushi = [california,nigiri,tuna,dragon];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: sushi[i],
                  MenuId: menu.Menu_Id
              });
          }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Fish'){
          const food = ['Grilled Salmon','Crispy Fish Tacos','Herb-Crusted Mahi Mahi','Lemon Garlic Shrimp Scampi'];
          const descr = ['Succulent fillet of salmon grilled to perfection, served with a side of roasted vegetables and a zesty lemon butter sauce. ','Lightly breaded and fried fish nestled in warm tortillas, topped with tangy slaw, fresh salsa, and a drizzle of creamy chipotle sauce.','Tender mahi mahi fillet coated with a fragrant blend of herbs and spices, pan-seared to create a crispy crust. Served with a medley of sautéed vegetables and a squeeze of fresh lemon.','Plump shrimp sautéed in a buttery, garlic-infused sauce with a hint of tangy lemon. Tossed with linguine pasta and garnished with fresh parsley.'];

          const min = 15.50;
          const max= 17.99;
          const salmondata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/salmon.jpg`);
          const salmon = new Blob([salmondata], {type: 'image/jpg'});
          const fishtacodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/fishtaco.jpg`);
          const fishtaco = new Blob([fishtacodata], {type: 'image/jpg'});
          const mahidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mahi.jpg`);
          const mahi = new Blob([mahidata], {type: 'image/jpg'});
          const shrimpdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/shrimp.jpg`);
          const shrimp = new Blob([shrimpdata], {type: 'image/jpg'});
          const fish = [salmon,fishtaco,mahi,shrimp];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: fish[i],
                  MenuId: menu.Menu_Id
              });
          }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Indian'){
          const food = ['Butter Chicken','Vegetable Biryani','Palak Paneer','Chicken Tikka Masala'];
          const descr = ['Tender chicken pieces cooked in a rich and creamy tomato-based sauce, flavored with aromatic spices. Served with fluffy basmati rice or naan bread.','Fragrant basmati rice cooked with an assortment of fresh vegetables, aromatic spices, and herbs.',' Soft cubes of paneer (Indian cottage cheese) simmered in a vibrant spinach gravy.','Succulent pieces of grilled chicken marinated in a spiced yogurt mixture, cooked in a creamy tomato-based sauce.'];

          const min = 15.50;
          const max= 17.99;
          const butterdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/butter.jpg`);
          const butter = new Blob([butterdata], {type: 'image/jpg'});
          const biryanidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/biryani.jpg`);
          const biryani = new Blob([biryanidata], {type: 'image/jpg'});
          const palakdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/palak.jpg`);
          const palak = new Blob([palakdata], {type: 'image/jpg'});
          const masaladata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/masala.jpg`);
          const masala = new Blob([masaladata], {type: 'image/jpg'});
          const indian = [butter,biryani,palak,masala];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: indian[i],
                  MenuId: menu.Menu_Id
              });
          }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Chinese'){
          const food = ['Sweet and Sour Chicken','Kung Pao Shrimp','Beef with Broccoli','Vegetable Chow Mein'];
          const descr = ['Tender chicken pieces coated in a tangy and sweet sauce, accompanied by colorful bell peppers and juicy pineapple chunks.','Succulent shrimp stir-fried with crunchy peanuts, zesty chili peppers, and a savory sauce.','Slices of tender beef sautéed with vibrant green broccoli florets in a savory brown sauce.','A delightful stir-fried noodle dish featuring a medley of fresh vegetables like bok choy, carrots, mushrooms, and bean sprouts, tossed with thin and crispy noodles.'];

          const min = 15.50;
          const max= 18.99;
          const sourdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/sour.jpg`);
          const sour = new Blob([sourdata], {type: 'image/jpg'});
          const paodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pao.jpg`);
          const pao = new Blob([paodata], {type: 'image/jpg'});
          const beefdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/beef.jpg`);
          const beef = new Blob([beefdata], {type: 'image/jpg'});
          const meindata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mein.jpg`);
          const mein = new Blob([meindata], {type: 'image/jpg'});
          const chinese = [sour,pao,beef,mein];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: chinese[i],
                  MenuId: menu.Menu_Id
              });
          }
        }
        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Steakhouse'){
          const food = ['Ribeye Steak','Filet Mignon','T-bone Steak','New York Strip Steak'];
          const descr = [' A juicy and flavorful cut of beef known for its marbling and tenderness, cooked to perfection and served with a side of creamy mashed potatoes and grilled asparagus.','A tender and succulent steak cut from the tenderloin, seared to a perfect medium-rare and accompanied by a rich red wine reduction sauce. ','A classic steakhouse favorite, featuring a T-shaped bone separating a tender filet mignon on one side and a flavorful strip steak on the other. Grilled to your desired level of doneness and served with a side of crispy onion rings and a loaded baked potato.','A thick and juicy steak with a robust flavor, cooked to your preference and seasoned with a blend of herbs and spices. Served with a side of sautéed spinach and truffle-parmesan fries for a gourmet touch.'];

          const min = 19.50;
          const max= 24.50;
          const ribeyedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/ribeye.jpg`);
          const ribeye = new Blob([ribeyedata], {type: 'image/jpg'});
          const filetdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/filet.jpg`);
          const filet = new Blob([filetdata], {type: 'image/jpg'});
          const tbonedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tbone.jpg`);
          const tbone = new Blob([tbonedata], {type: 'image/jpg'});
          const yorkdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/york.jpg`);
          const york = new Blob([yorkdata], {type: 'image/jpg'});
          const steaks = [ribeye,filet,tbone,york];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: steaks[i],
                  MenuId: menu.Menu_Id
              });
          }
        }

      }
  
      // Create users
      for (let i = 0; i < 10; i++) {
        await User.create({
          User_Id:faker.datatype.uuid(),
          Username: faker.internet.userName(),
          Password: faker.internet.password(),
          Email: faker.internet.email()
        });
      }
  
      // Create reviews
      const users = await User.findAll();
      const items = await Menu_Item.findAll();
      const rev = ['1','2','3','4','5'];
      for (let i=0;i<2;i++){
        for (let i = 0; i < 10; i++) {
          const user = faker.random.arrayElement(users);
          const item = faker.random.arrayElement(items);
          const revv = faker.random.arrayElement(rev);
          const reviewscount = await Review.count({where: {UserId: user.User_Id}});

          if (reviewscount ===0 ){
            if (revv==='1' || revv==='2'){
              const comments = ['I did not enjoy it at all!','The taste was not for me.','Very bad for how expensive it was.','Was not the worst but it could be a lot better.','Not happy at all with it.','The food was lacking flavor.'];
              await Review.create({
                  Review_Id:faker.datatype.uuid(),
                  Rating: revv,
                  Comments: faker.random.arrayElement(comments),
                  UserId: user.User_Id,
                  MenuItemId: item.Item_Id,
                });
            }
            if (revv==='3'){
                const comments = ['Pretty good but I was not thrilled.','Would try again,however I was not completely satisfied.','Nice taste but something was throwing me off.','Although food was very nice,we waited a lot for it so it was very cold.','Nice pick from the menu just was not that thrilled.'];
                await Review.create({
                    Review_Id:faker.datatype.uuid(),
                    Rating: revv,
                    Comments: faker.random.arrayElement(comments),
                    UserId: user.User_Id,
                    MenuItemId: item.Item_Id,
                  });
            }
            if (revv==='4' || revv==='5'){
                const comments = ['Amazing item and the most polite stuff!!','I loved everything, the performance of the plate was a state of the art!','Great personel, incredible flavors. 10/10 recommend!!','The food was good and worth every peny!','Loved this item, I would for sure advise everyone to try it!'];
                await Review.create({
                    Review_Id:faker.datatype.uuid(),
                    Rating: revv,
                    Comments: faker.random.arrayElement(comments),
                    UserId: user.User_Id,
                    MenuItemId: item.Item_Id,
                  });
            }
          }

          
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
   //addRandomData();