import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
const EmployLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const intervalRef = useRef(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }

    // Reset error
    setError('');

    // Perform login action (for example, call an API)
    console.log('Form Data:', formData);
        handleLogin(formData)
    
    setFormData({
      email: '',
      password: ''
    });
  };

  async function handleLogin(data) {
     console.log("in handleLogin",data);
     try {
        
        const logindata = await fetch("/v1/employ/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                password:data.password,
                email:data.email
              })
        })
        const resp = await logindata.json()
        console.log("resp on login",resp);
        if(resp.success){
          const value = new Date(Date.now() + 55 * 60 * 1000)
          Cookies.set('employId',resp.employ.employId,{expires:value})
           toast.success(resp.message)
           intervalRef.current = setTimeout(() => {
              navigate('attendence')
           }, 2000);
        }
        else if(!resp.success){
          toast.error(resp.message)
        }
        
     } catch (error) {
        console.log("errror on employ Login",error.message);
        toast.error(error.message)
        
     }
     
  }
  useEffect(()=>{
     return ()=>{
      console.log("cleanup function run",intervalRef.current);
       clearTimeout(intervalRef.current)
     }
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster/>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <a href="#" className="font-medium text-blue-600 hover:text-blue-500">sign up here</a>
        </p>
        
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployLogin;
