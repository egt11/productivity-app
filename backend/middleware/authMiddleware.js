import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization
    if (!header) return res.status(400).json({ message: 'No token' })

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.status(400).json({ message: 'Wrong token' })

        req.user = decoded
        next()

    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}