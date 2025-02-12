import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setcaptain,setToken,setcaptainId } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email format
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    // Form Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const captainData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData
      );

      const token = response.data.token;
      setToken(token)
      // localStorage.setItem("captainToken", token);
      const captain = response.data.captain
      console.log('captain:',captain)
      setcaptain(captain);
      // localStorage.setItem("captain", JSON.stringify(captainData)); // Save in localStorage
      // localStorage.setItem("captainId", captain._id);
      setcaptainId(captain._id)


      // Navigate to dashboard or home after successful login
      navigate("/captainHome");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-7 pb-14 font-sans font-semibold">
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Logo"
          className="w-1/4"
        />
        <div>
          <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-xl">
              What&apos;s your Email?
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="bg-slate-200 p-4 mb-4 mt-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="text-xl">
              Enter password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="bg-slate-200 p-4 mt-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="bg-black text-white w-full flex items-center justify-center py-3 px-4 mt-4 rounded-md font-mono text-lg"
            >
              Login
            </button>
          </form>
          <p className="ml-4 text-center mt-4">
            New Captain?{" "}
            <Link
              to="/captainSignUp"
              className="underline underline-offset-2 text-blue-600 hover:text-slate-900"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#ff8f0fee] text-white w-full flex items-center justify-center py-3 px-4 mt-4 rounded-md text-lg"
        >
          Sign In as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
