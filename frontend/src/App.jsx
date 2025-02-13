import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignup";
import CaptainSignUp from "./pages/CaptainSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import HomePage from "./pages/HomePage";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";



export default function App() {
  return (
    <div className="  " >
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/captain/logout" element ={
            <CaptainProtectWrapper>
              <CaptainLogout/>
            </CaptainProtectWrapper>
              
            }/>
          <Route path="/user/logout" element={
            <UserProtectWrapper>
              <UserLogout/>
            </UserProtectWrapper>
          } >
            

          </Route>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signUp" element={<UserSignUp />} />
          <Route path="/captainSignUp" element={<CaptainSignUp />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/captainHome" element={
            <CaptainProtectWrapper>
                           <CaptainHome />

            </CaptainProtectWrapper>
             } />
          <Route path="/home" element={<UserProtectWrapper>
            <HomePage/>
          </UserProtectWrapper>}> 
       
            
          </Route>
          <Route path="/riding" element={ <Riding/> } />
          <Route path="/captain-riding" element={ <CaptainRiding/> } />

        </Routes>
    </div>
  );
}
