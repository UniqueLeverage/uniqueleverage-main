import {TbInfoTriangle} from "react-icons/tb";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {BsCurrencyDollar} from "react-icons/bs";
import {LuImageOff} from "react-icons/lu";

const InventoryHealth = () => {
    const issues = [
        {
            id: 1,
            color: "text-mainDarkRed",
            icon: <AiOutlineInfoCircle size="25"/>,
            title: "2022 Toyota Camry",
            description: "Missing description",
            buttonText: "Add Details",
        },
        {
            id: 2,
            color: "text-mainYellow",
            icon: <BsCurrencyDollar size="25"/>,
            title: "2023 Honda CR-V",
            description: "Price above market average",
            buttonText: "Review Price",
        },
        {
            id: 3,
            color: "text-mainDarkRed",
            icon: <LuImageOff size="25"/>,
            title: "2021 Ford F-150",
            description: "Missing Images",
            buttonText: "Add Photos",
        },
    ];

    return (
        <div className="bg-elementBackground rounded-lg border border-mainStroke py-4 px-3">
            <div className="flex items-center justify-between mb-6">
                <div className="font-bold text-mainBlack font-raleway">Inventory Health</div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                        <TbInfoTriangle size="20" className="text-mainYellow"/>
                        <span className="text-xs text-darkGray">3 issues</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <AiOutlineInfoCircle size="20" className="text-mainDarkRed"/>
                        <span className="text-xs text-darkGray">2 high priority</span>
                    </div>
                </div>
            </div>
            <div>
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        className="flex items-center border-b pb-3 mb-4 last:border-b-0 last:pb-0"
                    >
                        <div className={`mr-3 ${issue.color}`}>{issue.icon}</div>
                        <div className="mr-2">
                            <div className="font-medium text-mainBlack font-raleway">{issue.title}</div>
                            <div className="text-sm text-darkGray font-light">{issue.description}</div>
                        </div>
                        <div className="ml-auto">
                            <button
                                className="bg-transparent text-darkGray border rounded-lg py-1 px-3 hover:border-mainBlack">
                                {issue.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryHealth;
