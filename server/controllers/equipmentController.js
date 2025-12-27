import Equipment from "../models/Equipment.js"

export const getEquipment = async(req,res)=>{
  const equipment = await Equipment.find()
  res.json(equipment)
}

