import React, { useRef, useState } from 'react';
import ReactLoading from "react-loading";
import toast, { Toaster } from 'react-hot-toast';

const YoutubeRegister = () => {
  const [loading, setLoading] = useState(false);
  const userEmail = useRef("");
  const Name = useRef("");
  const ChannelName = useRef("");
  const MobileNo = useRef("");
  const EmplId = useRef("");
  const Subscription = useRef("");
  const channelId = useRef("");
  const thumbnail = useRef(null); // New ref for thumbnail upload

  const Register = async function (e) {
    e.preventDefault();
    try {
      console.log(
        "youtube register",
        Name.current,
        userEmail.current,
        MobileNo.current,
        Subscription.current,
        EmplId.current,
        ChannelName.current,
        channelId.current
      );
      setLoading(true);

      // Use FormData to handle both text inputs and file uploads
      const formData = new FormData();
      formData.append('Name', Name.current);
      formData.append('UserEmail', userEmail.current);
      formData.append('MobileNo', MobileNo.current);
      formData.append('Subscription', Subscription.current);
      formData.append('EmplId', EmplId.current);
      formData.append('ChannelName', ChannelName.current);
      formData.append('channelId', channelId.current);

      // Append the file to the FormData
      if (thumbnail.current.files[0]) {
        formData.append('thumbnail', thumbnail.current.files[0]);
      }

      const data = await fetch('/v1/youtube/register', {
        method: "POST",
        body: formData, // Send formData directly (no need for headers with FormData)
      });

      const resp = await data.json();
      console.log("after register", resp);

      setLoading(false);
      if (resp.success) {
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.log("error on register the youtube", error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-[90vw] xl:w-[50vw] text-black bg-white p-8 rounded-lg shadow-md">
        <Toaster />
        {loading && (
          <ReactLoading className="mx-auto sticky top-12" type="balls" color={"#000"} height={100} width={100} />
        )}
        <h2>Youtube Registration</h2>
        <form onSubmit={Register} encType="multipart/form-data">
          {/* Other form fields */}
          <div>
            <label htmlFor="userEmail" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">User Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              placeholder="email"
              ref={userEmail}
              onChange={(e) => userEmail.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="Name" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Name"
              ref={Name}
              onChange={(e) => Name.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="Channel Name" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Channel Name</label>
            <input
              type="text"
              id="Channel Name"
              name="Channel Name"
              placeholder="Channel Name"
              ref={ChannelName}
              onChange={(e) => ChannelName.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mt-4 mb-4">
            <h1>Subscription</h1>
            <select onChange={(e) => Subscription.current = e.target.value} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" name="Subscription">
              <option className='p-2' value="500">500</option>
              <option className='p-2' value="1000">1000</option>
              <option className='p-2' value="2000">2000</option>
              <option className='p-2' value="5000">5000</option>
              <option className='p-2' value="10000">10000</option>
              <option className='p-2' value="25000">25000</option>
              <option className='p-2' value="50000">50000</option>
              <option className='p-2' value="75000">75000</option>
              <option className='p-2' value="100000">100000</option>
            </select>
          </div>

          <div>
            <label htmlFor="Mobile No." className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Mobile No.</label>
            <input
              type="number"
              id="Mobile No."
              name="Mobile No."
              placeholder="Mobile No."
              ref={MobileNo}
              onChange={(e) => MobileNo.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="Empl Id" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Empl Id</label>
            <input
              type="text"
              id="Empl Id"
              name="Empl Id"
              placeholder="Empl Id"
              ref={EmplId}
              onChange={(e) => EmplId.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="Channel Id" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Channel Id</label>
            <input
              type="text"
              id="Channel Id"
              name="Channel Id"
              placeholder="Channel Id"
              ref={channelId}
              onChange={(e) => channelId.current = e.target.value}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Thumbnail field */}
          <div>
            <label htmlFor="thumbnail" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              ref={thumbnail}
              accept="image/*" // Accept image file types
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default YoutubeRegister;
