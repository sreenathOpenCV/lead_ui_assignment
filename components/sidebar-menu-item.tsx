import {  useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';
import { SideNavItem } from '../types/type';
import { useSideBarToggle } from '../hooks/use-sidebar-toggle';

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {

    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const sidebarToggle = () =>{ 
        invokeToggleCollapse();
    console.log("toggled")
    }

    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

    const inactiveLink = classNames("flex items-center min-h-[40px] h-full text-black py-2 px-1 text-sidebar-muted-foreground transition duration-200",
        { ["justify-center bg-sidebar-muted"]: toggleCollapse }
    );

    const activeLink = classNames("text-sidebar-muted-foreground bg-[#138DFF]");

    const navMenuDropdownItem = "py-2 hover:text-sidebar-muted-foreground transition duration-200 p-2";

    const dropdownMenuHeaderLink = classNames(inactiveLink, { ["bg-sidebar-muted"]: subMenuOpen });

    return (
        <>
        {item.submenu ? (
            <div className="min-w-[18px]">
                <a className={`${dropdownMenuHeaderLink} ${pathname.includes(item.path) && !subMenuOpen ? activeLink : ''}`}
                    onClick={toggleSubMenu}>
                    <div className='min-w-[20px]' onClick={sidebarToggle}>{item.icon}</div>
                    {!toggleCollapse && <>
                        <span className='ml-3 text-base leading-6'>{item.title}</span>
                        <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />
                    </>
                    }
                </a>
                {subMenuOpen && !toggleCollapse && (
                    <div>
                        <div className='grid gap-y-1 leading-5 py-2'>
                            {item.subMenuItems?.map((subItem, idx) => (
                                <Link
                                    key={idx}
                                    href="/ManageUsersSheet"
                                    className={navMenuDropdownItem}
                                >
                                    <span>{subItem.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>)
                }
            </div>
        ) :
            (<Link href={item.path} className={`${inactiveLink} ${pathname === item.path ? activeLink : ''}`}>
                <div className='min-w-[20px]' onClick={sidebarToggle}>{item.icon}</div>
                {!toggleCollapse && (<span className="ml-3 leading-6 font-semibold">{item.title}</span>)}
            </Link>)
        }
        </>
    );
};
