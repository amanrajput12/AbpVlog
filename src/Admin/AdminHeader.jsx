import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const navigate = useNavigate()
  return (
    <div  className='sticky top-0 flex justify-around items-center h-[6vh] xl:h-[10vh] bg-gradient-to-r from-gray-300 to-zinc-900  '>
        <button onClick={()=>navigate("/admin")} className={`bg-gradient-to-b m-1 xl:m-2  p-1 xl:p-4 text-yellow-50 rounded-md from-green-900 to-green-400 hover:from-green-200 hover:to-green-950 hover:text-black hover:shadow-slate-400  `}>
            VerifyUser
        </button>
        <button onClick={()=>navigate("dashboard")} className='bg-gradient-to-b m-1 xl:m-2  p-1 xl:p-4 text-yellow-50 rounded-md from-green-900 to-green-400 hover:from-green-200 hover:to-green-950 hover:text-black hover:shadow-slate-400'>
            Video
        </button>
    </div>
  )
}

export default AdminHeader
