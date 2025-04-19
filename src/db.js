// db.js
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Users = new Schema({
  email: { type: String, unique: true },
  password: String
})

const Tweets = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'usersdata'
  },
  tweet: String,
  time: String
})

const Usermodel = mongoose.model('usersdata', Users)
const Tweetmodel = mongoose.model('tweetsdata', Tweets)

export { Usermodel, Tweetmodel }

