"use client";

import React from 'react';
import  LoginForm  from '../components/LoginForm';
import {  useSession } from 'next-auth/react';

type PageProps = {
  children: React.ReactNode;
};

export default function Home({ children }: PageProps) {

  return (
        <>
        </>
  );
}
