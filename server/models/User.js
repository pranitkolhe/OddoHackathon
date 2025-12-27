import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "technician", "employee"],
    default: "employee"
  }
})

export default mongoose.model("User", userSchema)
