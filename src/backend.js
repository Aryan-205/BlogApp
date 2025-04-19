import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { Usermodel, Tweetmodel } from './db.js'
import { auth } from './middlewares/auth.js'
import { logger } from './middlewares/logger.js'

const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY
const MONGODB_ID = process.env.MONGODB_ID

mongoose.connect(MONGODB_ID, {
  dbName: "tweet-database"
})

const app = express()
app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body
    
    const hashedpassword = await bcrypt.hash(password, 10)
    
    await Usermodel.create({
      email: username,
      password: hashedpassword
    })
    
    res.json({ msg: "Signup successful" })
  } catch (error) {
    res.status(500).json({msg:"Error while signup"})
  }
})

app.post("/signin", async (req, res) => {
  const { username, password } = req.body

  const user = await Usermodel.findOne({ email: username })

  if (!user) return res.status(403).json({ msg: "Invalid Creds" })

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (passwordMatch) {
    const token = jwt.sign({ id: user._id.toString() }, JSON_SECRET_KEY)
    res.json({ token })
  } else {
    res.status(403).json({ msg: "Invalid Creds" })
  }
})

app.get("/dashboard", auth, logger, async (req, res) => {
  const tweets = await Tweetmodel.find({ userId: req.id })

  if (tweets) {
    return res.json({ tweet: tweets })
  } else {
    return res.json({ msg: "User not found" })
  }
})

app.post('/addTweet', auth, logger, async (req, res) => {
  const { tweet, time } = req.body

  const user = await Usermodel.findOne({ _id: req.id })

  if (user) {
    await Tweetmodel.create({
      tweet,
      time,
      userId: req.id
    })
    return res.json({ msg: "Tweet added successfully" })
  } else {
    return res.json({ msg: "User not found" })
  }
})

app.put("/updateTweet", auth, logger, async (req, res) => {
  const { _id, tweet } = req.body

  const updated = await Tweetmodel.findOneAndUpdate(
    { _id: _id, userId: req.id },
    { tweet },
    { new: true }
  )

  if (!updated) return res.json({ msg: "Tweet not found or unauthorized" })

  res.json({ msg: "Tweet updated successfully" })
})

app.delete('/deleteTweet', auth, logger, async (req, res) => {
  const { _id } = req.body

  const deleted = await Tweetmodel.findOneAndDelete({
    _id: _id,
    userId: req.id
  })

  if (!deleted) return res.json({ msg: "Tweet not found or unauthorized" })

  res.json({ msg: 'Tweet deleted successfully' })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
