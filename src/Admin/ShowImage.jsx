import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";
import Cookies from "js-cookie"
const ShowImage = () => {
  const user = useSelector((store) => store?.VerifyUser.Verification);
  const [imagevalue, setImagevalue] = useState(0);
  const [loading, setloading] = useState(null);
  const [userId, setUserId] = useState(Cookies.get('myid'));
  const gradepay = useRef(null);
  console.log(user);
  async function verified(value) {
    const { email, gradepay } = value;
    console.log("on frontend", email, gradepay);
    const result = confirm("Do you want to verify this user?");

    if (result) {
      setloading("flex");
      const data = await fetch(`/v1/admin/profileverify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          gradepay,
          userId
        }),
      });
      const resp = await data.json();
      console.log("after verify", resp);
      if (resp) {
        setloading(null);
        toast.success("User verified Sucessfully");
      }
    } else {
      return null;
    }
  }
  return (
    <div>
      <ReactLoading
        className={`mx-auto ${loading} sticky top-12 z-30 `}
        hidden
        type="balls"
        color={"#00000"}
        height={100}
        width={100}
      />
      {user && (
        <div className="flex flex-col">
          <div className="flex flex-col-reverse xl:flex-row justify-center gap-7 items-center">
            {user?.Photo && user.Photo[imagevalue] ? (
              <img
                className="h-[90vh] xl:h-[60vh]"
                src={user.Photo[imagevalue]}
                alt="photo"
              />
            ) : (
              <h2>Not Available</h2>
            )}

            <div>
              <table className=" bg-white border-4 border-gray-500 border-collapse w-full">
                <tbody>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2 font-bold">
                      UserName
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {user.username}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2 font-bold">
                      Email
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {user.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2 font-bold">
                      IFSC Code
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {user.ifscCode}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2 font-bold">
                      Bank Account Number
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {user.bankAccountNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <button
              onClick={() => {
                if (imagevalue > 0) {
                  setImagevalue(imagevalue - 1);
                }
              }}
              className={` ${
                imagevalue == 0 ? "bg-green-200" : "flex"
              } bg-green-500 p-2 rounded-md text-white `}
            >
              Prev
            </button>
            <button
              onClick={() => {
                if (imagevalue < 2) {
                  console.log(imagevalue);

                  setImagevalue(imagevalue + 1);
                }
              }}
              className={` ${
                imagevalue == 2 ? "bg-green-200" : "flex"
              } bg-green-500 p-2 rounded-md text-white `}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center xl:mt-9 p-3 gap-9 ">
            <h2 className="xl:text-3xl xl:font-bold">GradePay</h2>
            <select
              className="xl:text-2xl xl:w-32"
              onChange={(e) => {
                gradepay.current = e.target.value;
                console.log("gradepay", gradepay);
              }}
              name=""
              id=""
            >
              <option className="p-2" value="1600">
                1600
              </option>
              <option className="p-2" value="3100">
                3100
              </option>
              <option className="p-2" value="5100">
                5100
              </option>
            </select>
          </div>
          <button
            onClick={() => {
              verified({ email: user.email, gradepay: gradepay.current });
            }}
            className="xl:text-3xl xl:p-5  self-center rounded-md  mt-4 p-2 w-20 xl:w-44 bg-gradient-to-r from-stone-700 to-orange-400 hover:from-orange-700 hover:to-stone-700 text-white hover:text-gray-900"
          >
            Verified
          </button>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ShowImage;
