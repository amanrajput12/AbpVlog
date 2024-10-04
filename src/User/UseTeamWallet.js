import { createAsyncThunk } from "@reduxjs/toolkit";

export const TeamWallet = createAsyncThunk("wallet/teamwallet", async function (value){
    try {
        const data = await fetch("/v1/wallet/team/getwallet",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:value})
        })
        const resp = await data.json()
        console.log("team wallet data ",resp);
        return resp.data
        
    } catch (error) {
         console.log("error on getting the team wallet",error);
         
    }
})