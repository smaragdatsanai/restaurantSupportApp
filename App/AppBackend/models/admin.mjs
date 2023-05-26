import { Owner } from "./database.mjs"
import bcrypt from "bcrypt";
import faker from 'faker'
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid } from "sequelize";

export async function addOwner(firstName, lastName, phone, email, username, password) {
  try {
    console.log(username, password)
    if (!username || !password)
      throw new Error("missing username or password")
    let owner = await Owner.findOne({ where: { Username: username } })
    
    if (owner)
      throw new Error(`Owner ${username} already exists`)
    const Password_hash = await bcrypt.hash(password, 10)
    owner = await Owner.create({
      Owner_Id: faker.datatype.uuid(),
      First_Name: firstName,
      Last_Name: lastName,
      Phone: phone,
      Email: email,
      Username: username,
      Password: Password_hash
    });
    return owner; // Return the created owner object
  } catch (error) {
    throw error;
  }
}


export async function login(username, password) {
  try {
    if (!username || !password)
      throw new Error("missing username or password")

    let owner = await Owner.findOne({ where: { Username: username } })
    console.log(owner)
    if (!owner)
      throw new Error(`Owner  ${username} doesn't exist`)
      console.log(owner.Password)
      console.log(password)
    const match = await bcrypt.compare(password, owner.Password)
    if (match) {
      return owner
    }
    else
      throw new Error("Wrong credentials")
  } catch (error) {
    throw error
  }
}

export async function addOwnerRestaurant(name,address,opens,closes,type,ownerid){
  try{
    await Restaurant.create({
      Restaurant_Id: faker.datatype.uuid(),
      Name: name,
      Address: address,
      Opens_on: opens,
      Closes_at: closes,
      Restaurant_Type: type,
      OwnerId: ownerid
    });
  }catch(error){
    console.error('Error creating restaurant:',error);
  }
}
