import mongoose from "mongoose"

const equipmentSchema = new mongoose.Schema({
  name: String,
  serial: String,
  category: String,
  status: { type: String, default: "Active" },
  health: Number,
  team: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{ timestamps:true })

export default mongoose.model("Equipment", equipmentSchema)
