"use client";

import { useState, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const { data: session } = useSession();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // signIn('credentials', {
        //   username: "admin",
        //   password: "admin123",
        //   callbackUrl: '/ManageUsers'
        // });

    };
    
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 flex justify-center items-center bg-cover"
                style={{ backgroundImage: "url('./LoginBackground1.png')" }}>
                <div className="w-full h-full md:hidden bg-black bg-opacity-50 flex justify-center items-center">
                    {/* Form container for small screens */}    
                    <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded-3xl m-4 p-8">
                        <div className="flex justify-center mb-8">
                            <img src="./LoginLogo.png" className="h-12" alt="Login Logo" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-black">Login!</h1>
                        <h2 className="text-sm mb-4 text-black">Enter your credentials to get access</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-black">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-black">Password</label>
                            <div className="relative">
                                <input
                                    id="hs-toggle-password-multi-toggle"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Enter current password"
                                />
                                <button type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 right-0 p-3.5 rounded-r-md"
                                >
                                    {/* SVG for toggle icon */}
                                    <svg className="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {showPassword ? (
                                        <>
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </>
                                        ) : (
                                        <>
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                            <line x1="2" y1="2" x2="22" y2="22"></line>
                                        </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <input
                                type="checkbox"
                                id="remember"
                                className="text-blue-500 h-4 w-4"
                            />
                            <label htmlFor="remember" className="ml-2 text-black text-sm">Remember Me</label>
                        </div>
                        <div className="mb-6">
                            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                            Login
                        </button>
                        <p className="text-gray-400 text-sm text-center mt-1">© 2024 OpenCV University All Rights Reserved.</p>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex md:flex-1 justify-center items-center max-sm:h-full sm:h-full p-4 bg-white bg-opacity-80 md:bg-transparent">
                {/* The form for large screens, duplicated for maintainability */}
                <form method="POST" onSubmit={handleSubmit} className="w-full max-w-md p-4">
                        <div className="flex justify-center mb-8">
                            <img src="./LoginLogo.png" className="h-12" alt="Login Logo" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-black">Login!</h1>
                        <h2 className="text-sm mb-4 text-black">Enter your credentials to get access</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-black">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border border-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-black">Password</label>
                            <div className="relative">
                                <input
                                    id="hs-toggle-password-multi-toggle"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Enter current password"
                                />
                                <button type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 right-0 p-3.5 rounded-r-md"
                                >
                                    <svg className="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {showPassword ? (
                                        <>
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </>
                                        ) : (
                                        <>
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                            <line x1="2" y1="2" x2="22" y2="22"></line>
                                        </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <input
                                type="checkbox"
                                id="remember"
                                className="text-blue-500 h-4 w-4"
                            />
                            <label htmlFor="remember" className="ml-2 text-black text-sm">Remember Me</label>
                        </div>
                        <div className="mb-6">
                            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                            Login
                        </button>
                        <p className="text-gray-400 text-sm text-center mt-1">© 2024 OpenCV University All Rights Reserved.</p>
                    </form>
            </div>
        </div>
    );
};

export default LoginForm;
