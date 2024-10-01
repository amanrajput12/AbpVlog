import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addcardNo } from './GetSlice.js';
import Cookies from "js-cookie"

const Cards = () => {
  const [cardsData, setCardsData] = useState([]); // State to hold an array of card data
  const token = Cookies.get("accessToken");
   const navigate = useNavigate()
   const dispatch = useDispatch()
  useEffect(() => {
    fetchCards();
  }, []);
  async function  handleSubscibe(value) {
    console.log(value,token);
    const {cardNo} = value
    
    try {
        const subdata = await fetch("/v1/card/subscibe",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({acessToken:token})
          
        })
        const resp = await subdata.json()

        console.log("for check subscibe",resp);
        
         if(resp.sucess){

           dispatch(addcardNo(cardNo))
           navigate('/video')
          }
    } catch (error) {
       console.log("error on subscibe the channel",error);
       
    }
  }

  async function fetchCards() {
    try {
      const response = await fetch(`/v1/youtube/getcard`, { // Assuming endpoint returns multiple cards
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Provide any necessary body if required by the API
      });
      const card = await response.json();
      setCardsData(card.data); // Store the array of card data
      console.log('Fetched card data', data);
    } catch (error) {
      console.log('Error fetching cards:', error.message);
    }
  }

  return (
    <div className="min-h-screen flex-col xl:flex-row m-4  xl:gap-6  flex justify-center items-center  ">
      
              {cardsData.length > 0 ? (
        cardsData.map((card, index) => (
          <div onClick={()=>handleSubscibe({cardNo:card.CardNo})}  key={index} className="bg-white h-[50vh] mt-1 hover:cursor-pointer  shadow-lg rounded-lg max-w-sm w-full p-2 ">
            <img
              src={card.thumbnail} // Assume each card has an 'image' field
              alt="thubnail" // Assume each card has a 'title' field
              className="w-full h-full object-cover rounded-sm"
            />
            
           
          </div>
        ))
      ) : (
        <p>Loading cards...</p>
      )}
    </div>
  );
};

export default Cards;
