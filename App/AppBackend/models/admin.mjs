import {Owner} from "./database.mjs"
import bcrypt from "bcrypt";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";

export async function addOwner(First_name,Last_name,Phone,Username, Email, password) {
    try {
      const Password_hash = await bcrypt.hash(password, 10);
      const owner = await Owner.create({
        Owner_Id: faker.datatype.uuid(),
        First_Name: First_name,
        Last_Name: Last_name,
        Phone: Phone,
        Username: Username,
        Email: Email,
        Password: Password_hash
      });
      
      return owner; // Return the created owner object
    } catch (error) {
      throw error;
    }
  }
  
  
  export async function login(username,password){
      try {
          if (!username || !password)
              throw new Error("missing username or password")
  
          let owner = await Owner.findOne({ where: { Username: username } })
          
          if (!owner)
              throw new Error("Owner " + username + "doesn't exist")
          if(password==owner.Password){
              return owner
          }
          else
              throw new Error("Wrong credentials")
          
      } catch (error) {
          throw error
      }
  }