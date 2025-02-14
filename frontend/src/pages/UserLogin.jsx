import { useEffect, useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserDataContext } from "../context/UserContext";


const UserLogin = () => {
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {user,setUser,usId,setusId,token,setToken} = useContext(UserDataContext); 


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const loginUser = {
            email:email,
            password: password
          }
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginUser);
          if ( response.status == 200){
            const data = response.data;
         
            setUser(data.user);
            setusId(data.user._id);
            // localStorage.setItem('token', data.token);
            setToken(data.token)
            // localStorage.setItem('userId',data.user._id)



            navigate('/home')
          }
       
        setEmail('');
        setPassword('');
    }


  return (
    <div className=" h-screen w-full flex flex-col justify-between p-7 pb-14 font-sans font-semibold">
      <div >
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" className="w-1/4   " />
        <div >
          <form action="" className="flex flex-col mt-12" onSubmit={handleSubmit} >
            <label htmlFor="email" className="text-xl">What&apos;s your Email ?</label>
            <input type="email" id="email" placeholder="example@gmail.com" className="bg-slate-200 p-4 mb-4 mt-2 rounded-md" value={email}  onChange={(e)=>{
                setEmail(e.target.value);
            }} required / >
            <label htmlFor="password"  className="text-xl" >Enter password </label>
            <input type="password" id="password"  placeholder="password" className="bg-slate-200 p-4 mt-2  rounded-md  " value={password} onChange={(e)=>{
            setPassword(e.target.value)}} required/>
            <button className='bg-black text-white w-full flex items-center justify-center py-3 px-4 mt-4 rounded-md font-mono text-lg' onClick={handleSubmit} >Login</button>
          </form>
          <p className="ml-4 text-center mt-4">
            New here? <Link  to='/signUp' className="underline underline-offset-2 text-blue-600 hover:text-slate-900 ">Create New Account</Link>
          </p>
        </div>
      </div>
      <div >
        <Link to='/captainLogin' className='bg-[#04f966ee] text-white w-full flex items-center justify-center py-3 px-4 mt-4 rounded-md  text-lg'>Sign In as Captain  </Link>
      </div>
    </div>
  );
};

export default UserLogin;
