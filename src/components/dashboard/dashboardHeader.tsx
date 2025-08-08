import {FiSearch} from "react-icons/fi";
import {LuCalendarDays} from "react-icons/lu";
import {DateRange} from "react-date-range";
import {useState} from "react";

const DashboardHeader = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-10-01"),
        key: "selection",
    });
    const handleSelect = (ranges: any) => {
        setDateRange({
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
            key: "selection",
        });
        setShowPicker(false);
    };
    const formatDate = (date: Date) =>
        date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="flex items-center mb-3">
            <div className="relative flex-grow max-w-sm mr-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <FiSearch className="text-mainGray" size="20"/>
                </div>
                <input
                    type="text"
                    className="form-input pl-8 py-2 rounded-lg border border-gray-200 placeholder-[#839099] text-sm font-light w-full focus:outline-none"
                    placeholder="Search inventory, contacts and more..."
                    name="search"
                    id="search"
                />
            </div>

            <div className="flex items-center border border-mainStroke bg-elementBackground rounded-xl py-1 px-4 ml-auto">
                <div className="pr-2 border-r">
                    <select
                        className="form-select text-xs border-0 text-mainBlack font-light focus:outline-none"
                        defaultValue="7-days"
                    >
                        <option value="7-days">Last 7 days</option>
                        <option value="month">Last month</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>

                <div className="flex items-center text-mainBlack text-xs pl-3 space-x-2 relative font-light">
                    <span>{formatDate(dateRange.startDate)}</span>
                    <span className="px-0.5">-</span>
                    <span>{formatDate(dateRange.endDate)}</span>
                    <LuCalendarDays
                        className="cursor-pointer"
                        size="20"
                        onClick={() => setShowPicker(!showPicker)}
                    />
                    {showPicker && (
                        <div className="absolute top-0 right-0 mt-2 z-10">
                            <DateRange
                                className="border shadow-md"
                                ranges={[dateRange]}
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;