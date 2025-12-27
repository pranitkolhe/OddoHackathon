import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "User not found" })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: "Wrong password" })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
