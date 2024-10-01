
async function Subscribe(value) {
    try {
        const {acessToken,channelId} = value
        console.log(acessToken,channelId);
        
        const response = await fetch(
          'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${acessToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              snippet: {
                resourceId: {
                  kind: 'youtube#channel',
                  channelId:channelId,
                },
              },
            }),
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(`Successfully subscribed to channel ID: ${channelId}`);
          console.log('Subscription Data:', data);
          return  {sucess:true}
        } 
      } catch (error) {
        console.error('Error subscribing to channel:', error);
      }   
}



export const SubscibeChannel  = async function(req,res,next){
    try {
        const {acessToken} = req.body 
        console.log("acess token in subscibe",acessToken);
        
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=id&forChannelId=UCjICW5kTfJa0Kqgt5WOP2cA&mine=true`, {
            headers: {
              Authorization: `Bearer ${acessToken}`,
              Accept: 'application/json',
            },
          })
          const data = await resp.json()
          console.log(data);
          if(data?.items?.length>=1){
            console.log("subscibe already to the channel");
           next()
          }
          else if(data?.items?.length==0){
            console.log("not subscibe");

           const myresp = await Subscribe({acessToken,channelId:"UCjICW5kTfJa0Kqgt5WOP2cA"})

          if(!myresp){
            return res.status(400).json({
                message:"invalid credentials",
                sucess:false
            })
          }
           if(myresp.sucess){
            console.log("authorize");
            next()
           }
         
          }
          
       
    } catch (error) {
        console.log("error on subscibe",error.message);
        return res.status(500).json({
            message:"Error on subscibe",
            error:error.message,
            success:false
        })
        
    }
} 