import {User} from "./database.mjs"
import bcrypt from "bcrypt";

export async function addUser(Username, Email, password) {
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


export async function login(username,password){
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