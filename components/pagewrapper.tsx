'use client'

import classNames from 'classnames';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Footer from "./Footer";
import { useSideBarToggle } from '../hooks/use-sidebar-toggle';
import { SideBar } from './sidebar';
import Header from './header';

export default function PageWrapper({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    // Check if user is logged in and not loading
    const isLoggedIn = !isLoading && session;

    const { toggleCollapse } = useSideBarToggle();
    const bodyStyle = classNames("bg-background flex flex-col mt-14 h-full overflow-y-auto",
        {
            ["sm:pl-[13rem]"]: !toggleCollapse,
            ["sm:pl-[4.4rem]"]: toggleCollapse,
        });

    if (isLoggedIn) {
        return (
            <>
                <div className="flex flex-col h-full w-full">
                    <SideBar />
                    <Header />
                    <div className={bodyStyle}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </>
        );
    } else {
        return (
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        );
    }
}
