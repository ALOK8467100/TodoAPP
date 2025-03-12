import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignUp = () => {
  const [user, setUser] = useState({
    fullName:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const SignUpHandler = async () => {
    console.log(user);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#CCE5E3] h-screen">
      <div className="flex flex-col justify-center px-[60px] items-center bg-[#FEE1B6] w-[500px] h-[500px] rounded-lg shadow-lg">
        <h1 className="text-[30px] font-bold text-[#4C5B5C]">SignUp</h1>
        <input
          type="text"
          value={user.fullName}
          name="fullName"
          onChange={changeHandler}
          placeholder="Enter FullName"
          className="border border-black rounded-lg p-2 m-2 w-full"
        />
        <input
          type="text"
          value={user.email}
          name="email"
          onChange={changeHandler}
          placeholder="Enter Email"
          className="border border-black rounded-lg p-2 m-2 w-full"
        />
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={changeHandler}
          placeholder="Enter Password"
          className="border border-black rounded-lg p-2 m-2 w-full"
        />
        <button 
          onClick={SignUpHandler}
          className="bg-[#4C5B5C] text-[18px] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#FEE1B6] hover:scale-105 transition-all duration-300 w-full"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default SignUp;