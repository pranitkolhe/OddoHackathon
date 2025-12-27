import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import equipmentRoutes from "./routes/equipmentRoutes.js"
import equipmentRoutes from "./routes/equipmentRoutes.js"



dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/equipment", equipmentRoutes)




app.listen(8080, () => console.log("API running on port 8080"))
