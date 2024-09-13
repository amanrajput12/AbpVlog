import  { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header/Header.jsx';


import Cookies from "js-cookie"
import OutletComp from './OutletComp.jsx';
import { useSelector } from 'react-redux';

const App = () => {

  const [userId, setUserId] = useState(Cookies.get('myid'));
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
 
  const register = useSelector((store) => store.Register.register);
   
  const acess = useSelector((store) => store.user.sucess);
    const navigate = useNavigate()
    const location = useLocation() 
    const isHomeRoute = location.pathname === '/';

    useEffect(() => {
      if (accessToken && userId && accessToken!=="undefined" && userId!=="undefined" ) {
        navigate('/video');
      }
    }, [accessToken, userId, navigate]);
    
  useEffect(() => {
    if (acess) {
      navigate('/video');
    }
  }, [acess]);

  useEffect(() => {
    if (register) {
      navigate('/register');
    }
  }, [register]);

  return (
    <div className={`${isHomeRoute?"null":"bg-black"} max-w-[100vw] text-white flex flex-col`}>
    
      <Header />
      <div className="flex  flex-col">
        <OutletComp/>
       
      </div>
    
    </div>
  );
};

export default App;
