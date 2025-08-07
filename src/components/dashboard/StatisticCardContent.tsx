import {AiOutlineInfoCircle} from "react-icons/ai";
import {FaSortDown, FaSortUp} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {ReactNode} from "react";

interface StatisticCardContentProps {
    title: string;
    value: string | number;
    status: "up" | "down" | "new" | null;
    changedValue: string;
    icon: ReactNode;
}

const StatisticCardContent = ({
                                  title,
                                  value,
                                  status,
                                  changedValue,
                                  icon,
                              }: StatisticCardContentProps) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-3">
            <div className="bg-elementBackground border border-mainStroke rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-mainBlack text-xs font-semibold font-raleway">{title}</div>
                    <AiOutlineInfoCircle size="20" className="text-darkGray"/>
                </div>
                <div>
                    <div className="flex items-center my-2">
                        <div className="text-2xl font-semibold text-mainBlack mr-2">{value}</div>
                        {status === "up" && (
                            <div className="flex items-center bg-mainLightGreen text-mainDarkGreen rounded-lg px-2">
                                <span className="text-xs font-medium mr-1">{changedValue}</span>
                                <FaSortUp size="15" className="mt-2"/>
                            </div>
                        )}
                        {status === "down" && (
                            <div className="flex items-center bg-mainLightRed text-mainDarkRed rounded-lg px-2">
                                <span className="text-xs font-medium mr-1">{changedValue}</span>
                                <FaSortDown size="15" className="mb-2"/>
                            </div>
                        )}
                        {status === "new" && (
                            <Link to="#" className="text-xs text-mainBlue">
                                {changedValue} <span className="underline">(new)</span>
                            </Link>
                        )}
                    </div>
                    <div className="text-xs text-darkGray">vs prior 7 days</div>
                    <div className="bg-[#FAFCFF] mt-5 p-2 rounded-lg border border-[#C8EAFF] flex items-center justify-center w-10 h-10">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticCardContent;