import { Owner,User,Restaurant,Review,Menu,Menu_Items } from "./database.mjs";
import faker from 'faker' 
import { sequelize } from "./db-config.mjs";

//EINAI FOUL LATHOS THA TO DW EGW H AURIO H META TO TAKI

//create fake data for all
async function createDummyData() {
  // Create owners
  for (let i = 0; i < 5; i++) {
    await Owner.create({
      First_Name: faker.name.firstname(),
      Last_Name: faker.name.lastName(),
      Phone: faker.phone.phoneNumber(),
      Email: faker.internet.email(),
      Username: faker.internet.userName(),
      Password: faker.internet.password(),
    });
  }

  // Create restaurants
  const owners = await Owner.findAll();
  for (let i = 0; i < 5; i++) {
    const owner = faker.random.arrayElement(owners);
    await Restaurant.create({  
      Name: faker.company.companyName(),
      Owner_Id: owner.Owner_Id,
    });
  }

  // Create menus
  const restaurants = await Restaurant.findAll();
  for (let i = 0; i < 20; i++) {
    const restaurant = faker.random.arrayElement(restaurants);
    await Menu.create({
      const typenames=  ['Drinks','Lunch','Breakfast','Dinner','Wines'] ,
      Name: faker.lorem.words(2),
      Type: typenames[i],
      Restaurant_Id: restaurant.Restaurant_Id,
    });
  }

  // Create menu items
  const menus = await Menu.findAll();
  for (let i = 0; i < 50; i++) {
    const menu = faker.random.arrayElement(menus);
    await Menu_Items.create({
      Name: faker.commerce.productName(),
      Description: faker.lorem.sentence(),
      Price: faker.commerce.price(),
      Menu_Id: menu.Menu_Id,
    });
  }

  // Create users
  for (let i = 0; i < 100; i++) {
    await User.create({
      Username: faker.internet.userName(),
      Password: faker.internet.password(),
      Email: faker.internet.email(),
    });
  }

  // Create reviews
  const users = await User.findAll();
  const items = await Menu_Items.findAll();
  for (let i = 0; i < 200; i++) {
    const user = faker.random.arrayElement(users);
    const item = faker.random.arrayElement(items);
    await Review.create({
      Rating: faker.random.number({ min: 1, max: 5 }),
      Comments: faker.lorem.sentence(),
      User_Id: user.User_Id,
      Item_Id: item.Item_Id,
    });
  }
}

createDummyData()
  .then(() => {
    console.log('Dummy data inserted successfully.');
    process.exit();
  })
  .catch((error) => {
    console.error('Error inserting dummy data:', error);
    process.exit(1);
  });
