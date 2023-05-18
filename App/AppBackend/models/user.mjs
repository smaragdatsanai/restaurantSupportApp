import {User} from "./database.mjs"
import bcrypt from "bcrypt";

// const pgConfig = {
//     host:'localhost',
//     port:5432,
//     dialect:'postgres',
//     username: process.env.POSTGRES_USERNAME|| 'postgres',
//     password: process.env.POSTGRES_PASSWORD||'1234',
//     database:"reservEAT",
//     logging: false,
//     define:{
//         timestamps:false,
//         freezeTableName: true
//     }
// };

// const pool = new pg.Pool(pgConfig);

// export async function connect() {
//     try {
//         const client = await pool.connect();
//         return client
//     }
//     catch(e) {
//         console.error(`Failed to connect ${e}`)
//     }
// }

// export async function createUser(Username, Email, password) {
//     const Password_hash = await bcrypt.hash(password, 10);
//     const sql = `INSERT INTO "User" ("Username","Email", "Password") VALUES ('${Username}','${Email}', '${Password_hash}') RETURNING "User_Id";`;
//     try {
//         const client = await connect();
//         const res = await client.query(sql);
//         await client.release();
//         // callback(null, res.rows) // επιστρέφει array
//     }
//     catch (error) {
//         throw error
// }
// }

async function addUser(Username, Email, password) {
  try {
    const Password_hash = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      Username: Username,
      Email: Email,
      Password: Password_hash
    });
    
    return user; // Return the created user object
  } catch (error) {
    throw error;
  }
}



export async function getUser(email, password, callback) {
    const sql = `SELECT * FROM "User" WHERE "Email"='${email}';`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        bcrypt.compare(password, res.rows[0].password_hash, async (err, match) => {
            if (match) {
                const usertype = await getUserType(res.rows[0].id);
                res.rows[0].usertype = usertype;
                callback(null, res.rows) // επιστρέφει array
            }
            else {
                callback(null, {});
            }
        });
    }
    catch (err) {
        callback(err, null);
    }
}


// async function addUser(newUser){
//     try{
//         const user  = await sequelize.models.User.create(newUser)
//         console.log("User created:", user.toJSON())
//         return true;
//         // console.log(newUser);
//     }catch (error) {
//         throw error
//     }
// }

async function login(username,password){
    try {
        if (!username || !password)
            throw new Error("missing username or password")

        let user = await User.findOne({ where: { Username: username } })
        
        if (!user)
            throw new Error("User " + username + "doesn't exist")
        if(password==user.Password){
            return user
        }
        else
            throw new Error("Wrong credentials")
        
    } catch (error) {
        throw error
    }
}

export async function getCustomerCart(customer_id, callback) {
    let sql = `SELECT "cart_id" FROM "public.CUSTOMER" WHERE "user_id" = ${customer_id};`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
}

export async function clearCart(cart_id, callback) {
    let sql = `DELETE FROM "public.SHOPPING_CART_CONTAINS_FOOD_PRODUCT" WHERE "cart_id" = ${cart_id};`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
}

export async function addToCart(cart_id, order, callback) {
    for (let food of order) {
        const menu_id = food[5];
        const product_id = food[6];
        const quantity = food[2];
        let sql = `INSERT INTO "public.SHOPPING_CART_CONTAINS_FOOD_PRODUCT" VALUES (${cart_id}, ${menu_id}, ${product_id}, ${quantity});`;
        try {
            const client = await connect();
            const res = await client.query(sql);
            await client.release();
        }
        catch (err) {
            callback(err, null);
        }
    }
    callback(null, "success");
}


export {addUser,login}

