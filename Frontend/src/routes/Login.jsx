import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-center items-center">
      <section className=" flex flex-col gap-3 bg-gray-950 rounded-2xl shadow-lg shadow-orange-400  w-[500px] h-[470px] justify-center items-center font-mono">
        <h2 className=" text-2xl text-white mb-10">
          Register for a free account.
        </h2>
        <div className=" flex gap-3 ">
          <input
            type="text"
            placeholder="FirstName"
            className=" w-[200px] rounded-lg text-gray-800 px-1 bg-gray-700 py-3"
          />
          <input
            type="text"
            placeholder="LastName"
            className=" w-[200px] rounded-lg text-gray-800 px-1 bg-gray-700 py-3"
          />
        </div>

        <input
          type="text"
          className="rounded-lg text-gray-800  bg-gray-700 w-[410px] px-1  py-3"
          placeholder="Password"
        />

        <button className=" flex gap-2 bg-orange-500 text-white px-24 py-3 rounded-3xl mt-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Login
        </button>
        <p className=" text-white">
          Don't have an account?{" "}
          <span
            className=" text-orange-500"
            onClick={() => {
              navigate("/Register");
            }}
          >
            Register
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
