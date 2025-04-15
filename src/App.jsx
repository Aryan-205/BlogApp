import {useEffect, useState } from "react"
import Tweet from "./component/tweet/Tweet"
import Input from "./component/input/Input";
import { TweetProvider } from "./context/Context";

function App() {
  const [feed, setFeed] = useState([]);

  const t = new Date();
  const time = t.toLocaleTimeString();


  const addTweet=(post)=> {
    setFeed((prev)=>[{...post, time, id:Date.now()}, ...prev])
  }
  const deleteTweet=(id)=>{
    setFeed((prev)=>prev.filter((post)=>post.id!==id))
  }
  const updateTweet = (id,tweet) => {
    setFeed((prev)=>prev.map((prevTweet)=>prevTweet.id==id ? tweet : prevTweet))
  }

  useEffect(()=>{
    const feed = JSON.parse(localStorage.getItem('feed'))

    if(feed && feed.length > 0) {
      setFeed(feed)
    } 
  },[])

  useEffect(()=>{
    localStorage.setItem('feed',JSON.stringify(feed))
  },[feed])

  return (
    <TweetProvider value={{feed, addTweet, deleteTweet, updateTweet}}>
    <div className="h-screen w-screen overflow-hidden flex justify-center bg-black">
      <div className="relative w-80 bg-black">
        <Input />
        <div className="mt-20 flex flex-col overflow-y-auto h-[calc(100vh-100px)] scrollbar-hide">
          {feed.map((post) => (
            <Tweet key={post.id} post={post}/>
          ))}
        </div>

      </div>
    </div>
    </TweetProvider>
  );
}

export default App;