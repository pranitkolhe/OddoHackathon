import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import User from "./models/User.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const seed = async () => {
  await User.deleteMany()

  const hash = await bcrypt.hash("123456", 10)

  await User.create([
    { name:"Admin", email:"admin@gear.com", password:hash, role:"admin" },
    { name:"Tech", email:"tech@gear.com", password:hash, role:"technician" },
    { name:"Employee", email:"emp@gear.com", password:hash, role:"employee" }
  ])

  console.log("Users Seeded")
  process.exit()
}

seed()
