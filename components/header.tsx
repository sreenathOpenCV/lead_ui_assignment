'use client';

import classNames from "classnames";
import { UserNav } from "./usernav";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import { useSideBarToggle } from "../hooks/use-sidebar-toggle";

export default function Header() {

    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const sidebarToggle = () => {
        invokeToggleCollapse();
    }
    const headerStyle = classNames("bg-sidebar fixed w-full z-[99997] px-4 shadow-2xl shadow-slate-500/40",
        {
            ["sm:pl-[20rem]"]: !toggleCollapse,
            ["sm:pl-[5.6rem]"]: toggleCollapse,
        });
    return (
        <header className={headerStyle}>
            <div className="h-12 flex items-center justify-between">
                <div>
                <button onClick={sidebarToggle} className="lg:hidden md:hidden order-2 sm:order-1 shrink-btn float-right bg-sidebar-muted text-sidebar-muted-foreground hover:bg-foreground hover:text-background ml-3 rounded-md w-[30px] h-[30px] flex items-center justify-center shadow-md shadow-black/10  transition duration-300 ease-in-out">
                    <BsList />
                </button>
                </div>
                <div className="flex items-center justify-between sm:order-2 order-1">
                    <div className="p-2">
                    <IoNotificationsOutline style={{color: "#fbfbfb", fontSize: "25px"}}/>
                    </div>
                    <div className="p-2">
                    <FiRefreshCcw style={{color: "#fbfbfb", fontSize: "25px"}}/>
                    </div>
                    {/* <div className="p-2">
                        <ThemeSwitcher></ThemeSwitcher>
                    </div> */}
                    <div className="h-10 w-10 rounded-full bg-sidebar-muted flex items-center justify-center text-center">
                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    )
}