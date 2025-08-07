import {NavLink} from "react-router-dom";
import mainLogo from "../../assets/logoLandscape.png";
import companyLogo from "../../assets/autoDealerEx1.png";
import userProfile from "../../assets/profileUserEx1.jpg";
import {LuCalendarDays, LuLayoutDashboard} from "react-icons/lu";
import {RiChatSmile2Line, RiDashboard3Line, RiShoppingBag2Line} from "react-icons/ri";
import {TbUsers} from "react-icons/tb";
import {FaChevronRight, FaRegUser} from "react-icons/fa";
import {BsThreeDots} from "react-icons/bs";

const Sidebar = () => {
    const menuItem = [
        {path: "/dashboard", name: "Dashboard", icon: <LuLayoutDashboard size="23"/>},
        {path: "/inventory", name: "Inventory", icon: <RiDashboard3Line size="23"/>},
        {path: "/meetings", name: "Meetings", icon: <LuCalendarDays size="23"/>},
        {path: "/contacts", name: "Contacts", icon: <FaRegUser size="23"/>},
        {path: "/live-chat", name: "Live Chat", icon: <RiChatSmile2Line size="23"/>},
        {path: "/fb-marketplace", name: "FB Marketplace", icon: <RiShoppingBag2Line size="23"/>},
        {path: "/team", name: "Team", icon: <TbUsers size="23"/>},
    ];

    return (
        <div
            className="w-[225px] h-screen bg-elementBackground fixed top-0 left-0 hidden lg:flex flex-col shadow-innerCustom">
            <div className="py-3 border-b border-gray-200 flex justify-center">
                <img src={mainLogo} alt="Unique Leverage" className="w-[80%]"/>
            </div>
            <div className="py-5 px-3 border-b border-gray-200">
                <div className="flex items-center">
                    <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm font-semibold text-mainBlack pl-2">Tac Auto Trades</div>
                    <BsThreeDots className="ml-auto text-gray-700 cursor-pointer" size="20"/>
                </div>
            </div>
            <div className="p-3 pt-5 flex-1 overflow-y-auto no-scrollbar">
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({isActive}) =>
                            `flex items-center p-3 rounded-md transition mb-1 font-raleway ${
                                isActive
                                    ? "bg-mainSecondBg text-mainBlue font-bold"
                                    : "text-mainGray hover:text-mainBlue"
                            }`
                        }
                    >
                        <div className="flex items-center justify-center w-10 text-inherit">{item.icon}</div>
                        <span className="text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </div>
            <div className="px-3 pb-5">
                <div className="font-semibold text-mainBlack mb-1">Spend</div>
                <div className="text-xs text-mainGray font-light mb-2">Resets 9 Sept, 2024</div>
                <div className="w-full h-2.5 bg-mainSecondBg rounded-full">
                    <div className="h-full bg-blue-600 rounded-full w-[25%]"></div>
                </div>
                <div className="text-sm text-mainGray mt-1">$321,900/$3M</div>
                <div className="text-mainBlue mt-3 font-medium cursor-pointer">
                    Manage ad plan
                </div>
            </div>
            <div className="py-6 px-2 border-t border-gray-200">
                <div className="flex items-center">
                    <img
                        src={userProfile}
                        alt="User Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="pl-2">
                        <div className="text-sm font-bold text-mainBlack font-raleway">Chris Hilgeman</div>
                        <div className="text-xxs text-mainGray">chrishilgeman1@gmail.com</div>
                    </div>
                    <FaChevronRight size="13" className="ml-auto text-mainGray cursor-pointer"/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;