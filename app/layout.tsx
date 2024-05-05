"use client";

import React, { useState } from 'react';
import { ReduxProvider } from './Redux/StoreProvider';
import { Karla } from 'next/font/google';
import './globals.css';
import PageWrapper from '../components/pagewrapper';
import { SideBar } from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm'; // Import the LoginForm component

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
});

export default function RootLayout({ children }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <ReduxProvider>
        <body className={karla.className}>
          <div className=''>
            {!isLoggedIn ? ( // Render login page if not logged in
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : ( // Render main content if logged in
              <div className="flex flex-col h-full w-full">
                <SideBar />
                <Header />
                <PageWrapper children={children} />
                <Footer />
              </div>
            )}
          </div>
        </body>
      </ReduxProvider>
    </html>
  );
}
