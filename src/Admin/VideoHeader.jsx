import React from 'react'
import { useNavigate } from 'react-router-dom'

const VideoHeader = () => {
    const navigate = useNavigate()
  return (
    <div className='flex gap-3 justify-center'>
   <button onClick={()=>navigate('/admin/search')} className='p-2 bg-green-700 rounded-sm hover:bg-green-500'>Search</button>
   <button onClick={()=>navigate('/admin/delete')} className='p-2 bg-green-700 hover:bg-green-500'>Delete Video</button>
    </div>
  )
}

export default VideoHeader
