import {User} from "./database.mjs"

async function addUser(newUser){
    try{
        await User.query(
            `INSERT INTO "Users" ("Username", "Password","Email")  
             VALUES ($1, $2,$3)`, [newUser.Username,newUser.Password,newUser.Email]); // sends queries
            // console.log("User created:", user.toJSON())
        return true;
        // console.log(newUser);
        // const user  = await User.create(newUser)
    }catch (error) {
        throw error
    }
}

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
        
        // const match = await bcrypt.compare(password, user.password)
        // if (match)
        //     return user
        // else
        //     throw new Error("Wrong credentials")
    } catch (error) {
        throw error
    }
}

export {addUser,login}