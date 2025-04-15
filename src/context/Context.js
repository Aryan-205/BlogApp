import { createContext, useContext } from "react";

export const TweetContext = createContext({
  feed:[{
    tweet:"This is the blog",
    time:'00:00:00',
    id:0
  }],
  addTweet: (tweet)=>{},
  deleteTweet: (id)=>{},
  updateTweet: (id, tweet)=>{},
})

export const TweetProvider = TweetContext.Provider

export const useTweet = ()=>{
  return useContext(TweetContext)
}