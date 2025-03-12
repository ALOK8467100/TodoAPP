import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
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
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo");
        if (res.data.success) {
          console.log(res);
          setTodos(res.data.todos);
          console.log("first");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchTodo();
  }, []);

  return (
    <div className="h-screen" >
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center">
          <div className="mt-[40px]" >
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="add new todo"
              className="border border-black rounded-lg p-2 m-2 w-[320px]"
            />
            <button onClick={addTodoHandler}
            className=" relative bg-[#4C5B5C] text-[18px] text-white font-bold rounded-md cursor-pointer hover:bg-[#FEE1B6] transition-all duration-300 w-[150px] h-[40px]"
            >
              Add todo
              <svg
                className="absolute top-[2px] right-[0px]"
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
          <textarea
            id=""
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="write a description"
            className="border border-black rounded-lg p-2 m-2 w-[480px] h-[100px]"
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-[20px]">
        <h1 className="text-[45px] font-bold text-white">All To do</h1>
        <div className="flex flex-wrap justify-center items-center mt-[20px]">
          {todos.map((todo) => (
            <div className="" key={todo._id}  >
              <div className="bg-[#4C5B5C] h-[200px] w-[400px] rounded-lg shadow-lg px-[20px] py-[10px] m-2 text-white hover:bg-[#FEE1B6] cursor-pointer border border-[#fff]">
                <h2 className="text-[26px] font-bold">{todo.title}</h2>
                <p className="text-[20px] font-bold mt-[10px]">{todo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
