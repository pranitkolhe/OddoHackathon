import express from "express"
import { getEquipment } from "../controllers/equipmentController.js"
import { protect } from "../middleware/authMiddleware.js"
import { restrict } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", protect, restrict("admin"), getEquipment)

export default router
