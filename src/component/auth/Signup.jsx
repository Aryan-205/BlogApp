import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){

  const [user, setUser] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function signup(){
    setUser([...user,{username,password,id:Date.now()}])
    navigate('/dashboard')
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-black h-screen space-y-2">
      <input 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        type="text" 
        className="p-2 bg-black text-white border border-gray-600 rounded-md" placeholder="Username"/>
      <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password" 
        className="p-2 bg-black text-white border border-gray-600 rounded-md" placeholder="Password"/>
      <button 
        onClick={signup}
        className="p-2 bg-black text-white border border-gray-600 rounded-md">Signup</button>
    </div>
    </>
  )
}