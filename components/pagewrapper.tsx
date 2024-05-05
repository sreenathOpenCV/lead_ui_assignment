'use client'

import classNames from 'classnames';
import { ReactNode } from 'react';
import Footer from "./Footer";
import { useSideBarToggle } from '../hooks/use-sidebar-toggle';
import { SideBar } from './sidebar';
import Header from './header';

export default function PageWrapper({ children }: { children: ReactNode }) {
    
    const { toggleCollapse } = useSideBarToggle();
    const bodyStyle = classNames("bg-background flex flex-col mt-14 h-full overflow-y-auto",
        {
            ["sm:pl-[13rem]"]: !toggleCollapse,
            ["sm:pl-[4.4rem]"]: toggleCollapse,
        });

    return (
        <>
        <div className={bodyStyle}>
            {children}
        </div>
        </>
    );
}
    //     <>
    //     <SideBar />
    //     <div className="flex flex-col h-full w-full">
    //       <Header />
    //       <div className={bodyStyle}>
    //           {children}
    //           <Footer />
    //       </div>
    //     </div>
    //   </>