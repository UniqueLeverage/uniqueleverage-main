import {FiPhone} from "react-icons/fi";
import {LuUserPlus} from "react-icons/lu";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
    SummaryCard,
    StatisticCardContent,
    DashboardHeader,
    AdsSpendAndResult,
    InventoryHealth,
} from "../components";
import {LiaHandsHelpingSolid} from "react-icons/lia";
import {TfiWorld} from "react-icons/tfi";
import {IoPersonOutline} from "react-icons/io5";
import {RiCarLine} from "react-icons/ri";

interface StatisticCardData {
    title: string;
    value: string | number;
    status: "up" | "down" | "new" | null;
    changedValue: string;
    icon: JSX.Element;
}

const Dashboard = () => {
    const statisticsData: StatisticCardData[] = [
        {
            title: "Deals",
            value: "8",
            status: "up",
            changedValue: "+5%",
            icon: <LiaHandsHelpingSolid size="20" className="text-mainBlue"/>,
        },
        {
            title: "Appointments",
            value: "6",
            status: "up",
            changedValue: "+12.8%",
            icon: <TfiWorld size="20" className="text-mainBlue"/>,
        },
        {
            title: "Rescheduled",
            value: "2",
            status: "down",
            changedValue: "-2%",
            icon: <IoPersonOutline size="20" className="text-mainBlue"/>,
        },
        {
            title: "Phone Calls",
            value: "2",
            status: "new",
            changedValue: "1",
            icon: <FiPhone size="20" className="text-mainBlue"/>,
        },
        {
            title: "Messenger Chats",
            value: "12",
            status: "down",
            changedValue: "-2%",
            icon: <IoPersonOutline size="20" className="text-mainBlue"/>,
        },
        {
            title: "Vehicle Views",
            value: "79",
            status: "new",
            changedValue: "9",
            icon: <RiCarLine size="20" className="text-mainBlue"/>,
        },
        {
            title: "Impressions",
            value: "2,400",
            status: "down",
            changedValue: "-2%",
            icon: <IoPersonOutline size="20" className="text-mainBlue"/>,
        },
        {
            title: "Total Leads",
            value: "34",
            status: "down",
            changedValue: "-0.4%",
            icon: <LuUserPlus size="20" className="text-mainBlue"/>,
        },
    ];

    return (
        <div className="p-3 overflow-x-hidden h-full">
            <DashboardHeader/>
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-elementBackground rounded-lg border border-mainStroke pb-4 pt-5 mb-3">
                <SummaryCard
                    title="Inventory"
                    links={[
                        {label: "Active Inventory", value: 82},
                        {label: "Sold Inventory", value: 20},
                        {label: "Drafts", value: 20},
                        {label: "Vehicles In Recon", value: 1},
                    ]}
                    action={true}
                />
                <SummaryCard
                    title="Contacts"
                    links={[
                        {label: "New Leads", value: 8},
                        {label: "Live Chats", value: 8},
                        {label: "Phone Calls", value: 16},
                        {label: "Total Contacts", value: 144},
                    ]}
                    action={true}
                />
                <SummaryCard
                    title="Leads Sources"
                    links={[
                        {label: "Facebook Ad Leads", value: 8},
                        {label: "Website Form Fills", value: 8},
                        {label: "Phone Calls", value: 16},
                    ]}
                    action={true}
                />
                <SummaryCard
                    title="Deals By Source"
                    links={[
                        {label: "Auto Trader", value: 5},
                        {label: "Facebook", value: 9},
                        {label: "CarFax", value: 1},
                        {label: "CarZing", value: 17},
                    ]}
                />
            </div>
            <div className="flex flex-wrap -mx-2">
                {statisticsData.map((stat) => (
                    <StatisticCardContent {...stat} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7">
                    <AdsSpendAndResult/>
                </div>
                <div className="lg:col-span-5">
                    <InventoryHealth/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;