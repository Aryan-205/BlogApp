import React, { useState } from 'react';
import { useTweet } from '../../context/Context';

export default function Input(){

  const [tweet , setTweet] = useState('')
  const {addTweet} = useTweet()

  const add = (e) => {
    e.preventDefault()

    if(!tweet) return

    addTweet({tweet})
    setTweet('')
  }

  return (
    <>
      <div className="fixed top-4 w-80 flex justify-between bg-black z-10">
        <input 
          className="w-full border border-gray-600 bg-black rounded-md p-2 text-white"
          value={tweet}
          onChange={(e)=>setTweet(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') add(e); }}
          type="text" 
          placeholder="What's happening?"
        />
        <button 
          className="ml-2 text-white border border-gray-600 p-2 rounded-md" 
          onClick={add}
        >
          Tweet
        </button>
      </div>
    </>
  )
}