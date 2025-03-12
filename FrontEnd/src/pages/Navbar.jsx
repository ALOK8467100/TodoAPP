import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-4  w-full bg-[#CCE5E3]">
      <h1 className="text-[25px] font-bold text-white">ToDo App</h1>
      <div>
      <button
        onClick={logoutHandler}
        className="bg-[#4C5B5C] text-[18px] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#FEE1B6] transition-all duration-300"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Navbar;
