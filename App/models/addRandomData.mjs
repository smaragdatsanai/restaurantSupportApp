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
      const types = ['Italian','Mexican','Breakfast & Brunch','Greek','Burgers','Steakhouse','Indian','Chinese','Sushi','Fish'];
      const nnames= ['Yummy Restaurant','La Pasteria','I Fratti','Brunelo','Avli','Salumeria','Abbie','Ovio','Allio','Cozy'];
      for (let i = 0; i < 10; i++) {
        const photodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/restphoto.jpg`);
        const photoblob =photodata.toString('base64');
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
      const foodblob =fooddata.toString('base64');
      const drinksdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/drinks.jpg`);
      const drinksblob =drinksdata.toString('base64');
      const winedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/wines.jpg`);
      const wineblob =winedata.toString('base64');
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
            const palomaBase64 =palomadata.toString('base64');
            const palomaUrl = `data:image/jpg;base64,${palomaBase64}`;
            const mojitodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mojito.jpg`);
            const mojitoBase64=mojitodata.toString('base64');
            const mojitoUrl = `data:image/jpg;base64,${mojitoBase64}`;
            const margarittadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/margarita.jpg`);
            const margarittaBase64 =margarittadata.toString('base64');
            const margarittaUrl = `data:image/jpg;base64,${margarittaBase64}`;
            const cosmodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/cosmopolitan.jpg`);
            const cosmopolitanBase64 =cosmodata.toString('base64');
            const cosmopolitanUrl = `data:image/jpg;base64,${cosmopolitanBase64}`;
            const whitedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/whitewine.jpg`);
            const whitewineBase64 =whitedata.toString('base64');
            const whitewineUrl = `data:image/jpg;base64,${whitewineBase64}`;
            const reddata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/redwine.jpg`);
            const redwineBase64 =reddata.toString('base64');
            const redwineUrl = `data:image/jpg;base64,${redwineBase64}`;
            const photos = [palomaUrl,mojitoUrl,margarittaUrl,cosmopolitanUrl,whitewineUrl,redwineUrl];

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
          const caramelBase64  =carameldata.toString('base64');
          const caramelUrl = `data:image/jpg;base64,${caramelBase64}`;
          const matchadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/matcha.jpg`);
          const matchaBase64 =matchadata.toString('base64');
          const matchaUrl = `data:image/jpg;base64,${matchaBase64}`;
          const orangedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/orange.jpg`);
          const orangejuiceBase64 =orangedata.toString('base64');
          const orangejuiceUrl = `data:image/jpg;base64,${orangejuiceBase64}`;
          const berrydata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/berry.jpg`);
          const berryblastBase64 =berrydata.toString('base64');
          const berryblastUrl = `data:image/jpg;base64,${berryblastBase64}`;
          const mochadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mocha.jpg`);
          const mochaBase64 =mochadata.toString('base64');
          const mochaUrl = `data:image/jpg;base64,${mochaBase64}`;
          const herbaldata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/herbal.jpg`);
          const herbalBase64 =herbaldata.toString('base64');
          const herbalUrl = `data:image/jpg;base64,${herbalBase64}`;
          const photos = [caramelUrl,matchaUrl,orangejuiceUrl,berryblastUrl,mochaUrl,herbalUrl];
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
            const paragkawBase64 =paragkawdata.toString('base64');
            const paragkawUrl = `data:image/jpg;base64,${paragkawBase64}`;
            const paragkardata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/red.jpg`);
            const paragkarBase64 =paragkardata.toString('base64');
            const paragkarUrl = `data:image/jpg;base64,${paragkarBase64}`;
            const notosdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/white.jpg`);
            const notosBase64 =notosdata.toString('base64');
            const notosUrl = `data:image/jpg;base64,${notosBase64}`;
            const chardata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/sparkly.jpg`);
            const charBase64 =chardata.toString('base64');
            const charUrl = `data:image/jpg;base64,${charBase64}`;
            const malagouziadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/red.jpg`);
            const malagouziaBase64 =malagouziadata.toString('base64');
            const malagouziaUrl = `data:image/jpg;base64,${ malagouziaBase64}`;
            const winess = [paragkawUrl,paragkarUrl,notosUrl,charUrl,malagouziaUrl];
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
            const omeletteBase64 =omelettedata.toString('base64');
            const omeletteUrl = `data:image/jpg;base64,${ omeletteBase64}`;
            const pancakesdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pancakes.jpg`);
            const pancakesBase64 =pancakesdata.toString('base64');
            const pancakesUrl = `data:image/jpg;base64,${ pancakesBase64}`;
            const avotoastdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/avotoast.jpg`);
            const avotoastBase64 =avotoastdata.toString('base64');
            const avotoastUrl = `data:image/jpg;base64,${ avotoastBase64}`;
            const burittodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/buritto.jpg`);
            const burittoBase64 =burittodata.toString('base64');
            const burittoUrl = `data:image/jpg;base64,${ burittoBase64}`;
            const granoladata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/granola.jpg`);
            const granolaBase64 =granoladata.toString('base64');
            const granolaUrl = `data:image/jpg;base64,${ granolaBase64}`;
            const breakfast = [omeletteUrl,pancakesUrl,avotoastUrl,burittoUrl,granolaUrl,];
            for (let i=0;i<5;i++){
                await Menu_Item.create({
                    Item_Id: faker.datatype.uuid(),
                    Name: food[i],
                    Description: descr[i],
                    Price: faker.random.number({min,max,precision:0.01}),
                    Image: breakfast[i],
                    MenuId: menu.Menu_Id,
                });
            }
        }
        if (menu.Type === nametypes[2] && restaurant.Restaurant_Type==='Italian'){
            const food = ['Spaghetti Carbonara','Margherita Pizza','Chicken Parmigiana','Risotto Milanese'];
            const descr = ['A classic Italian pasta dish consisting of spaghetti noodles tossed with crispy bacon, creamy egg-based sauce, Parmesan cheese, and freshly ground black pepper.','A traditional Italian pizza topped with fresh tomatoes, mozzarella cheese, basil leaves, and a drizzle of olive oil.',' A mouthwatering dish featuring breaded and fried chicken cutlets smothered in marinara sauce, melted mozzarella cheese, and a sprinkle of Parmesan. Served with a side of spaghetti or a salad.',' A creamy and flavorful rice dish cooked with Arborio rice, saffron threads, onions, and white wine.'];

            const min = 14.50;
            const max = 18.99;
            const carbonaradata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/carbonara.jpg`);
            const carbonaraBase64 =carbonaradata.toString('base64');
            const carbonaraUrl = `data:image/jpg;base64,${ carbonaraBase64}`;
            const pizzadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pizza.jpg`);
            const pizzaBase64 =pizzadata.toString('base64');
            const pizzaUrl = `data:image/jpg;base64,${ pizzaBase64}`;
            const chickendata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/chicken.jpg`);
            const chickenBase64 =chickendata.toString('base64');
            const chickenUrl = `data:image/jpg;base64,${chickenBase64}`;
            const risottodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/risotto.jpg`);
            const risottoBase64 =risottodata.toString('base64');
            const risottoUrl = `data:image/jpg;base64,${ risottoBase64}`;
            const italian = [carbonaraUrl,pizzaUrl,chickenUrl,risottoUrl];
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
            const enchiladasBase64 =enchiladasdata.toString('base64');
            const enchiladasUrl = `data:image/jpg;base64,${ enchiladasBase64}`;
            const tacosdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tacos.jpg`);
            const tacosBase64 =tacosdata.toString('base64');
            const tacosUrl = `data:image/jpg;base64,${ tacosBase64}`;
            const chilesdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/chiles.jpg`);
            const chilesBase64 =chilesdata.toString('base64');
            const chilesUrl = `data:image/jpg;base64,${ chilesBase64}`;
            const moledata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mole.jpg`);
            const moleBase64 =moledata.toString('base64');
            const moleUrl = `data:image/jpg;base64,${ moleBase64}`;
            const mexican = [enchiladasUrl,tacosUrl,chilesUrl,moleUrl];
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
          const mousakaBase64 =mousakadata.toString('base64');
          const mousakaUrl = `data:image/jpg;base64,${ mousakaBase64}`;
          const souvlakidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/souvlaki.jpg`);
          const souvlakiBase64 =souvlakidata.toString('base64');
          const souvlakiUrl = `data:image/jpg;base64,${ souvlakiBase64}`;
          const spanakopitadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/spanakopita.jpg`);
          const spanakopitaBase64 =spanakopitadata.toString('base64');
          const spanakopitaUrl = `data:image/jpg;base64,${ spanakopitaBase64}`;
          const dolmadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/dolma.jpg`);
          const dolmaBase64 =dolmadata.toString('base64');
          const dolmaUrl = `data:image/jpg;base64,${ dolmaBase64}`;
          const greek = [mousakaUrl,souvlakiUrl,spanakopitaUrl,dolmaUrl];
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
          const cheeseBase64 =cheesedata.toString('base64');
          const cheeseUrl = `data:image/jpg;base64,${ cheeseBase64}`;
          const bbqdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/bbq.jpg`);
          const bbqBase64 =bbqdata.toString('base64');
          const bbqUrl = `data:image/jpg;base64,${ bbqBase64}`;
          const mushroomdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mushroom.jpg`);
          const mushroomBase64 =mushroomdata.toString('base64');
          const mushroomUrl = `data:image/jpg;base64,${ mushroomBase64}`;
          const spicydata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/spicy.jpg`);
          const spicyBase64 =spicydata.toString('base64');
          const spicyUrl = `data:image/jpg;base64,${ spicyBase64}`;
          const burgers = [cheeseUrl,bbqUrl,mushroomUrl,spicyUrl];
          for (let i=0;i<4;i++){
              await Menu_Item.create({
                  Item_Id: faker.datatype.uuid(),
                  Name: food[i],
                  Description: descr[i],
                  Price: faker.random.number({min,max,precision:0.01}),
                  Image: burgers[i],
                  MenuId: menu.Menu_IdUrl
              });
          }
        }

        if (menu.Type=== nametypes[2] && restaurant.Restaurant_Type==='Sushi'){
          const food = ['California Roll','Salmon Nigiri','Spicy Tuna Roll','Dragon Roll'];
          const descr = ['A classic sushi dinner featuring California rolls, a delicious combination of imitation crab, avocado, and cucumber wrapped in seasoned rice and seaweed.','Each piece consists of a slice of velvety salmon draped over a small mound of seasoned rice, offering a melt-in-your-mouth experience.','This sushi delight combines a fiery kick of spicy tuna, creamy mayo, and crisp cucumber rolled in rice and seaweed.','This artfully crafted roll features shrimp tempura, avocado, and cucumber inside, topped with slices of fresh eel and a drizzle of eel sauce.'];

          const min = 15.50;
          const max= 18.99;
          const californiadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/california.jpg`);
          const californiaBase64 =californiadata.toString('base64');
          const californiaUrl = `data:image/jpg;base64,${ californiaBase64}`;
          const nigiridata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/nigiri.jpg`);
          const nigiriBase64 =nigiridata.toString('base64');
          const nigiriUrl = `data:image/jpg;base64,${ nigiriBase64}`;
          const tunadata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tuna.jpg`);
          const tunaBase64 =tunadata.toString('base64');
          const tunaUrl = `data:image/jpg;base64,${ tunaBase64}`;
          const dragondata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/dragon.jpg`);
          const dragonBase64 =dragondata.toString('base64');
          const dragonUrl = `data:image/jpg;base64,${ dragonBase64}`;
          const sushi = [californiaUrl,nigiriUrl,tunaUrl,dragonUrl];
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
          const salmonBase64 =salmondata.toString('base64');
          const salmonUrl = `data:image/jpg;base64,${ salmonBase64}`;
          const fishtacodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/fishtaco.jpg`);
          const fishtacoBase64 =fishtacodata.toString('base64');
          const fishtacoUrl = `data:image/jpg;base64,${ fishtacoBase64}`;
          const mahidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mahi.jpg`);
          const mahiBase64 =mahidata.toString('base64');
          const mahiUrl = `data:image/jpg;base64,${ mahiBase64}`;
          const shrimpdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/shrimp.jpg`);
          const shrimpBase64 =shrimpdata.toString('base64');
          const shrimpUrl = `data:image/jpg;base64,${ shrimpBase64}`;
          const fish = [salmonUrl,fishtacoUrl,mahiUrl,shrimpUrl];
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
          const butterBase64 =butterdata.toString('base64');
          const butterUrl = `data:image/jpg;base64,${ butterBase64}`;
          const biryanidata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/biryani.jpg`);
          const biryaniBase64 =biryanidata.toString('base64');
          const biryaniUrl = `data:image/jpg;base64,${ biryaniBase64}`;
          const palakdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/palak.jpg`);
          const palakBase64 =palakdata.toString('base64');
          const palakUrl = `data:image/jpg;base64,${ palakBase64}`;
          const masaladata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/masala.jpg`);
          const masalaBase64 =masaladata.toString('base64');
          const masalaUrl = `data:image/jpg;base64,${ masalaBase64}`;
          const indian = [butterUrl,biryaniUrl,palakUrl,masalaUrl];
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
          const sourBase64 =sourdata.toString('base64');
          const sourUrl = `data:image/jpg;base64,${ sourBase64}`;
          const paodata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/pao.jpg`);
          const paoBase64 =paodata.toString('base64');
          const paoUrl = `data:image/jpg;base64,${ paoBase64}`;
          const beefdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/beef.jpg`);
          const beefBase64 =beefdata.toString('base64');
          const beefUrl = `data:image/jpg;base64,${ beefBase64}`;
          const meindata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/mein.jpg`);
          const meinBase64 =meindata.toString('base64');
          const meinUrl = `data:image/jpg;base64,${ meinBase64}`;
          const chinese = [sourUrl,paoUrl,beefUrl,meinUrl];
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
          const ribeyeBase64 =ribeyedata.toString('base64');
          const ribeyeUrl = `data:image/jpg;base64,${ ribeyeBase64}`;
          const filetdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/filet.jpg`);
          const filetBase64 =filetdata.toString('base64');
          const filetUrl = `data:image/jpg;base64,${ filetBase64}`;
          const tbonedata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/tbone.jpg`);
          const tboneBase64 =tbonedata.toString('base64');
          const tboneUrl = `data:image/jpg;base64,${ tboneBase64}`;
          const yorkdata=fs.readFileSync(`${process.env.PHOTO_BASE_PATH}/york.jpg`);
          const yorkBase64 =yorkdata.toString('base64');
          const yorkUrl = `data:image/jpg;base64,${ yorkBase64}`;
          const steaks = [ribeyeUrl,filetUrl,tboneUrl,yorkUrl];
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
      const rev = [1,2,3,4,5];
      for (let i=0;i<2;i++){
        for (let i = 0; i < 10; i++) {
          const user = faker.random.arrayElement(users);
          const item = faker.random.arrayElement(items);
          const revv = faker.random.arrayElement(rev);
          const reviewscount = await Review.count({where: {UserId: user.User_Id}});

          if (reviewscount ===0 ){
            if (revv===1 || revv===2){
              const comments = ['I did not enjoy it at all!','The taste was not for me.','Very bad for how expensive it was.','Was not the worst but it could be a lot better.','Not happy at all with it.','The food was lacking flavor.'];
              await Review.create({
                  Review_Id:faker.datatype.uuid(),
                  Rating: revv,
                  Comments: faker.random.arrayElement(comments),
                  UserId: user.User_Id,
                  MenuItemId: item.Item_Id,
                });
            }
            if (revv===3){
                const comments = ['Pretty good but I was not thrilled.','Would try again,however I was not completely satisfied.','Nice taste but something was throwing me off.','Although food was very nice,we waited a lot for it so it was very cold.','Nice pick from the menu just was not that thrilled.'];
                await Review.create({
                    Review_Id:faker.datatype.uuid(),
                    Rating: revv,
                    Comments: faker.random.arrayElement(comments),
                    UserId: user.User_Id,
                    MenuItemId: item.Item_Id,
                  });
            }
            if (revv===4 || revv===5){
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