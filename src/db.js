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
    ref: 'Users-data'
  },
  tweet: String,
  time: String
})

const Usermodel = mongoose.model('UsersData', Users)
const Tweetmodel = mongoose.model('TweetsData', Tweets)

export { Usermodel, Tweetmodel }

