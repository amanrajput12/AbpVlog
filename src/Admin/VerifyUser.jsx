import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifyUserData } from "./VerifyUserData";
import { userVerfication, viewImage } from "./VerifyUserSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const VerifyUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.VerifyUser);
  const [userId, setUserId] = useState(Cookies.get('myid'));

  useEffect(() => {
    dispatch(VerifyUserData(userId));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-1">
      {user.loading && <h2 className="text-center text-xl">Loading...</h2>}

      {!user.loading && user.data?.length > 0 && (
        <div className="">
          <h3 className="text-2xl font-bold mb-4">Verify Users</h3>
          <table className="bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-900 text-sm xl:text-3xl uppercase leading-normal">
                <th className="p-1 xl:py-3 xl:px-6 text-left">S.NO</th>
                <th className="p-1 xl:py-3 xl:px-6 text-left">UserName</th>
                <th className="p-1 xl:py-3 xl:px-6 text-center">Email</th>
               
                
               
                <th className="hidden xl:table-cell p-1 xl:py-3 xl:px-6 text-left">
                  isVerified
                </th>
                <th className=" p-1 xl:py-3 xl:px-6 text-left">
                  Date
                </th>
             
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm xl:text-3xl font-light">
              {user.data.map((user, i) => (
                <tr   onClick={()=>{
                  dispatch(userVerfication({userId:user._id,email:user.email,username:user.username,Photo:user.paymentPhoto,ifscCode:user.ifscCode,bankAccountNumber:user.bankAccountNumber,mobileNumber:user.mobileNumber}))
                  navigate("check")
                }} 
                  key={user._id}
                  className=" hover:cursor-pointer border-b border-gray-200 hover:bg-gray-500  "
                >
                  <td className="p-1 xl:py-3 xl:px-6 text-left whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-1 xl:py-3 xl:px-6 text-left whitespace-normal break-words leading-relaxed">
                    {user.username}
                  </td>
                  <td className="p-1 xl:py-3 max-w-[25vh] xl:max-w-[100vw] xl:px-6 text-left whitespace-normal break-words leading-relaxed">
                    {user.email}
                  </td>
                  <td className=" hidden xl:table-cell xl:py-3 xl:px-6 text-left">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className=" xl:py-3 xl:px-6 text-left">
                    { `${new Date(user.createdAt).toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
