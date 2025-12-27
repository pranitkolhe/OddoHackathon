import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
  subject: String,
  equipment: { type: mongoose.Schema.Types.ObjectId, ref:"Equipment" },
  type: { type:String, enum:["Corrective","Preventive"] },
  status: { type:String, default:"New" },
  priority: String,
  scheduledDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref:"User" }
},{timestamps:true})

export default mongoose.model("Request",requestSchema)
