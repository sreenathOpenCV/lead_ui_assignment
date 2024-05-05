'use client'

import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import SideBarMenuGroup from './sidebar-menu-group';
import Image from "next/image";
import { BsList } from 'react-icons/bs';
import { FaArrowCircleRight } from "react-icons/fa";
import { useSideBarToggle } from '../hooks/use-sidebar-toggle';
import { SIDENAV_ITEMS } from '../app/menu_constants';

export const SideBar = ({handleSubmitData}:{handleSubmitData?:any}) => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const sidebarToggle = () => {
        invokeToggleCollapse();
    }
    

    const asideStyle = classNames("sidebar overflow-y-auto overflow-x-auto fixed bg-sidebar border-r border-gray-500 h-full shadow-2xl shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
        {
            ["w-[13rem]"]: !toggleCollapse,
            ["sm:w-[4.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
        });

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div className='flex items-center justify-around'>
                <div className={classNames("sidebar-top relative flex items-center px-3.5 py-5 mt-1",
                        { hidden: toggleCollapse })}>
                    <Image src="/logo.png" width={150} height={150} alt="Logo" />
                </div>
                <button
                    onClick={sidebarToggle}
                    className={` ${!toggleCollapse ? '' : 'hidden'} order-2 mr-2 sm:order-1 shrink-btn bg-[#374151] hover:bg-foreground border border-white rounded-sm text-background mt-1 w-[30px] h-[30px] flex items-center justify-center shadow-md shadow-black/10  transition duration-300 ease-in-out`}
                >
                    <BsList />
                </button>
            </div>
            <div className={classNames("sidebar-top relative flex items-center px-3.5 py-5 mt-1",
                    { hidden: !toggleCollapse })}>
                <Image src="/logo_opencv.png" width={44} height={44} alt="Logo" />
            </div>
            <nav className="flex flex-col flex-grow transition duration-300 ease-in-out">
                <div className="flex flex-col flex-grow">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
            </nav>
            <button className='text-white absolute bottom-0 right-0 mr-4 p-2' onClick={sidebarToggle}>
                <FaArrowCircleRight className={`${toggleCollapse ? '' : 'rotate-180'}`} style={{fontSize: "25px"}}/>
            </button>
        </aside>
    )
}
