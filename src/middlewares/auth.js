import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY

export function auth(req, res, next) {
  const token = req.headers.authorization

  if (!token) return res.json({ msg: "Token is missing" })

  try {
    const decodedata = jwt.verify(token, JSON_SECRET_KEY)
    req.id = decodedata.id
    next()
  } catch (error) {
    res.json({ msg: "Invalid token" })
  }
}