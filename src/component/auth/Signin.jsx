import React from "react";
export default function Signin(){

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-black h-screen space-y-2">
      <input type="text" className="p-2 bg-black text-whtite border border-gray-600 rounded-md" placeholder="Username"/>
      <input type="password" className="p-2 bg-black text-whtite border border-gray-600 rounded-md" placeholder="Password"/>
      <button className="p-2 bg-black text-white border border-gray-600 rounded-md">Signin</button>
    </div>
    </>
  )
}