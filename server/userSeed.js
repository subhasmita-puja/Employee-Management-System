import User from './models/User.js'
import bcrypt from "bcrypt"
import connerctToDatabase from './db/db.js'


const userRegister = async () => {
    connerctToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin", 8)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"

        })
 await newUser.save()
    } catch (error) {
        console.log(error);

    }
}

userRegister();