import { createAsyncThunk } from "@reduxjs/toolkit";


const VideoAdd = createAsyncThunk("/Admin/AddVideo",async function(value){
    try {
            console.log("value",value); 
            const {startTime,endTime,id,snippet,toast,userId,cardNo,Amount} = value
            const resp = await fetch("/v1/Video/admin/add",{
                method:"POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    startTime,
                  endTime,
                  id,
                  snippet,
                  userId,
                  cardNo,
                  Amount
               
                })
              })
              const data = await resp.json()
              console.log("on video upload",data);
              if(data){
                toast.success("Video Added Sucessfully")
              }
                 return data


            
    } catch (error) {
        console.log("error on adding the video",error.message);
        
    }
})

export default VideoAdd