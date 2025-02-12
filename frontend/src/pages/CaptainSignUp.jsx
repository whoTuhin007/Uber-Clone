import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const { captain, setcaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!email || !password || !firstName || !lastName || !vehicleType || !vehicleColor || !plate || !capacity) {
      alert("Please fill out all fields.");
      return;
    }

    // Prepare data for API
    const captaindata = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        vehicleType: vehicleType,
        color: vehicleColor,
        plate:plate,
        capacity:capacity,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captaindata);
      if (response.status === 201) {
        const data = response.data;
        setcaptain(captaindata);
        localStorage.setItem("token", data.token);
        navigate("/captainHome");
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleType("");
    setVehicleColor("");
    setPlate("");
    setCapacity("");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-7 pb-2 font-sans text-lg font-semibold">
      {/* Header */}
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
          className="w-1/4"
        />

        {/* Form */}
        <form className="flex flex-col mt-8 gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex gap-1">
            <div>
              <label htmlFor="firstName" className="text-xl">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                className="bg-slate-200 p-4 mt-2 rounded-md w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-xl">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                className="bg-slate-200 p-4 mt-2 rounded-md w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <label htmlFor="email" className="text-xl">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="bg-slate-200 p-4 mt-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Vehicle Type */}
          <label htmlFor="vehicleType" className="text-xl">Vehicle Type</label>
          <select
            id="vehicleType"
            className="bg-slate-200 p-4 mt-2 rounded-md"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
          </select>

          {/* Vehicle Details */}
          <div className="flex gap-1">
            <div>
              <label htmlFor="vehicleColor" className="text-xl">Vehicle Color</label>
              <input
                type="text"
                id="vehicleColor"
                placeholder="Red"
                className="bg-slate-200 p-4 mt-2 rounded-md w-full"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="vehicleCapacity" className="text-xl">Vehicle Capacity</label>
              <input
                type="number"
                id="vehicleCapacity"
                placeholder="3"
                className="bg-slate-200 p-4 mt-2 rounded-md w-full"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Vehicle Plate Number */}
          <label htmlFor="vehiclePlate" className="text-xl">Vehicle Plate Number</label>
          <input
            type="text"
            id="vehiclePlate"
            placeholder="12345"
            className="bg-slate-200 p-4 mt-2 rounded-md"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
          />

          {/* Password */}
          <label htmlFor="password" className="text-xl">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="bg-slate-200 p-4 mt-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white w-full py-3 mt-4 rounded-md"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center mt-4">
          Already a captain?{" "}
          <Link
            to="/captainLogin"
            className="underline text-blue-600 hover:text-slate-900"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <p className="text-center text-[10px] font-thin">
          By proceeding, you consent to receive calls, WhatsApp, or SMS messages,
          including automated ones, from Uber and its affiliates to the provided number.
          <Link to="/"> Terms & Conditions </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
