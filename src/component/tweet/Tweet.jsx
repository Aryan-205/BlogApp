import React, { useState } from "react";
import { useTweet } from "../../context/Context";

export default function Tweet({post}){

  const {updateTweet, deleteTweet} = useTweet()
  const [isEdit, setIsEdit] = useState(false)
  const [msg, setMsg]=useState(post.tweet)

  const edit = () => {
    updateTweet(post.id, {...post, tweet:msg})
    setIsEdit((prev)=>!prev)
  } 

  return (
    <> 
    <div key={post.id} className="border border-gray-600 p-2 rounded-md bg-black w-80 flex flex-col my-2 relative">
      {/* <p className="text-white  break-words">{post.tweet}</p> */}
      <textarea
        className={`border outline-none w-full bg-transparent rounded-lg text-white text-xl p-1 pb-3
          ${isEdit ? "border-black/10 px-2 resize-y overflow-hidden" : "border-transparent resize-none"}
        `}
        readOnly={!isEdit}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <p className=" text-xs text-gray-400 w-fit self-end pt-2 mb-2">{post.time}</p>
      <div className="absolute bottom-2 left-2 flex space-x-2">
        <button 
          className="bg-black text-white p-1 px-2 hover:bg-gray-600 border border-gray-600 rounded-md"
          onClick={()=>deleteTweet(post.id)}
          >Delete</button>
        <button 
          className="bg-black text-white p-1 px-2 hover:bg-gray-600 border border-gray-600 rounded-md"
          onClick={() => {
            if (isEdit) {
                edit();
            } else setIsEdit((prev) => !prev);
          }}
          >
            {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
    </>
  )
}