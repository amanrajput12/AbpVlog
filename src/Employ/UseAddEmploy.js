import { createAsyncThunk } from "@reduxjs/toolkit";




export const CreateEmploy = createAsyncThunk('/employ/create',async function (value) {
    const toaster = value.toast
    try {
        console.log("in async thunk",value);
       
        const createdata = value.formData
     
        const {department,ifscCode,accountNo,joiningDate,reportingManager,email,emplId,name,password}=createdata
        const data = await fetch(`/v1/employ/create`,{
            method:"POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    department,
                    ifscCode,
                    accountNo,
                    joiningDate,
                    reportingManager,
                    email,
                    emplId,
                    name,
                    password,
                    userId:value.userId
                })
        })
        const resp =await data.json()
          if(resp.sucess){
            toaster.success(resp.message)
          }
          else if(!resp.sucess){
             toaster.error(resp.message)
          }
        console.log("after create employ",resp);
        
        
          
    } catch (error) {
        console.log("error on Addding employ",error.message);
              toaster.error(resp.message)
    }
})