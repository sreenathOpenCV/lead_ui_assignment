"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logIn } from "../app/Redux/authSlice";

interface ApiError {
  message: string;
}

const Login = ({handleLogin}:{handleLogin:any}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {

    event.preventDefault();
    dispatch(logIn());
    handleLogin(true);
  };

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"  
      />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
        <div className="relative min-h-screen  sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-2xl xl:max-w-xl sm:max-w-sm max-sm:max-w-sm sm:p-6 max-sm:p-6 z-10">
            <div className="text-gray-300 sm:mt-10 max-sm:mt-12">
              <h1 className="my-3 font-semibold text-4xl">OpenCV University</h1>
              <p className="pr-3 text-sm opacity-75 lg:block md:block sm:hidden max-sm:hidden">
                Your go-to for seamless management and lead tracking. Empower
                your team to hit targets effortlessly with intuitive tools and
                streamlined workflows. Stay ahead with easy task assignments and
                shift scheduling. Maximize productivity by optimizing sales
                records and workflows. Elevate your sales game with our
                user-friendly platform.
              </p>
              <p className="pr-3 text-sm opacity-75 sm:block max-sm:block lg:hidden md:hidden">
                Your go-to for seamless management and lead tracking.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center z-10">
            <div className="lg:p-12 md:p-12 max-sm:m-2 sm:p-8 max-sm:p-8 bg-white shadow-2xl mx-auto rounded-3xl w-96">
            <div className="mb-7">
                <h3 className="font-semibold text-2xl text-gray-800">Login</h3>
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-600">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="username"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="text-blue-500"
                    />
                    <label className="text-gray-600 ml-2">Remember Me</label>
                  </div>
                  <div className="mb-6 text-blue-500">
                    <a href="#" className="hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <button
                  type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                  >
                 Login
                  </button> 
                </form>
              </div>
              <div className="mt-7 text-center text-gray-300 text-xs">
                <span>Copyright ©2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0">
        <Image src="/logo.png" alt="openCV_logo" priority width={160} height={160} className="m-4"/>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};

export default Login;