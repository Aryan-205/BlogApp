import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'
const JSON_SECRET_KEY = 'andbandkaDola'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const User = []

function logger(req,res,next){
  console.log(req.method + "request logged")
  next();
}

app.post("/signup",(req,res)=>{
  const username = req.body.username
  const password = req.body.password
  const feed = []

  const exisitingUser = User.find(u=>u.username===username)

  if(exisitingUser){
    return res.json({
      msg:"Account pre-exist, please signin"
    })
  }

  User.push({
    username,
    password,
    feed
  })
  res.json({msg:"Signup successful"})
})

app.post("/signin",(req,res)=>{
  const username=req.body.username
  const password=req.body.password

  const token = jwt.sign({username},JSON_SECRET_KEY)

  const exisitingUser=User.find(u=>u.username===username && u.password===password)

  if(exisitingUser){
    return res.json({
      msg:"Signin successful",
      token
    }) 
  } else {
    return res.json({msg:"User not found, Please signup"})
  }
})

function auth(req,res,next){

  let token = req.headers.authorization

  if (!token){
    return res.json({msg:"Token is missing"})
  }

  try {
    const decodedata = jwt.verify(token,JSON_SECRET_KEY)
    req.username = decodedata.username
    next()
  } catch (error) {
    res.json({msg:"Invalid token"})
  }
}

app.get("/dashboard",auth,logger,(req,res)=>{
  const foundUser = User.find(u=>u.username === req.username)

  if(foundUser){
    return res.json({feed: foundUser.feed})
  } else {
    return res.json({msg:"User not found"})
  }
});

app.post('/addTweet',auth,logger,(req,res)=>{
  const foundUser = User.find(u=>u.username===req.username)

  const {tweet,id,time} = req.body

  if(foundUser){
    foundUser.feed.push({
      tweet,
      time,
      id
    })
    return res.json({msg:"Tweet added successfully"})
  } else {
    return res.json({msg:"User not found"})
  }
})

app.put("/updateTweet",auth,logger,(req,res)=>{
  const foundUser = User.find(u=>u.username=== req.username)

  if(!foundUser) return res.json({msg:"User not found"})

  const {id, tweet} = req.body

  const updateTweet = foundUser.feed.find(u=>u.id === id)
  if(!updateTweet) return res.json({msg:"tweet not found"})

  updateTweet.tweet = tweet;

  res.json({msg:"Tweet updated successfully"})
})

app.delete('/deleteTweet',auth,logger,(req,res)=>{
  const foundUser = User.find(u=>u.username === req.username)

  const {id} = req.body

  if(!foundUser) return res.json({msg:"User not found"})

  const remainingTweets = foundUser.feed.filter(u=>u.id !== id)

  if(!remainingTweets) return res.json({msg:""})

  foundUser.feed = remainingTweets
  res.json({msg:'Tweet deleted successfully'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})