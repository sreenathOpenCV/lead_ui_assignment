import { VscGraphLine } from "react-icons/vsc";
import { SiGooglesheets } from "react-icons/si";
import { SiFiles } from "react-icons/si";
import { SideNavItemGroup } from "../types/type";


export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    // {
    //     title: "Dashboards",
    //     menuList: [{
    //         title: 'Dashboard',
    //         path: '/',
    //         icon: <BsHouseDoor size={20} />,
    //     }]
    // },
    {
        title: "Dashboard",
        menuList: [
            {
                title: 'Manage Users',
                path: '/ManageUsers',
                icon: <SiGooglesheets size={20} />,
            },
            {
                title: 'Manage Sheets',
                path: '/ManageUsersSheet',
                icon: <SiFiles size={20} />,
                // submenu: true,
                // subMenuItems: [
                //     {title: "Black Friday SignUp", path: "black_friday_signup"},
                //     {title: "CarrerX", path: "careerx"},
                //     {title: "Courses Certificates", path: "courses_certificates"},
                //     {title: "Curriculum", path: "curriculum"},
                //     {title: "Decision", path: "decision"},
                //     {title: "Free Courses", path: "free_courses"},
                //     {title: "Organization", path: "organization"},
                //     {title: "Program Upgrade", path: "program_upgrade"},
                //     {title: "Student Certified", path: "student_certified"},
                //     {title: "Students", path: "students"},
                //     {title: "Waitlist", path: "waitlist"},
                //     {title: "Webinar Export", path: "webinar_export"},
                //     {title: "Webinar Live Attended", path: "webinar_live_attended"}
                // ],
            },
            {
                title: 'Utm Tracker',
                path: '/LineChart',
                icon: <VscGraphLine fontSize="1.4rem"/>,
            },
            {
                title: 'MSG',
                path: '/webinar_notifications',
                icon: <VscGraphLine fontSize="1.4rem"/>,
                submenu: true,
                subMenuItems: [
                    {title: "Sales Campaign", path: "/sales_campaign"},
                    {title: "Webinar Natifications", path: "/webinar_notifications"},
                ],
            }
        ]
    },
    // {
    //     title: "Others",
    //     menuList: [
    //         {
    //             title: 'Account',
    //             path: '/account',
    //             icon: <BsGear size={20} />,
    //         },
    //         {
    //             title: 'Help',
    //             path: '/help',
    //             icon: <BsQuestionCircle size={20} />,
    //         }
    //     ]
    // }

];