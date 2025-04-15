import {jwt} from 'jsonwebtoken'
const JSON_SECRET_KEY = 'andbandkaDola'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const User = []

app.post("/signup",(req,res)=>{
  const username = req.body.username
  const password = req.body.password
  const feed = []

  const exisitingUser = User.find(u=>u.username===username)

  if(exisitingUser){
    res.json({
      msg:"Account pre-exist, please signin"
    })
  }

  User.push({
    username,
    password,
    feed
  })
  req.json({msg:"Signup successful"})
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

function auth(res,req,next){

  let token = req.header.authorization

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



app.listen(5173)