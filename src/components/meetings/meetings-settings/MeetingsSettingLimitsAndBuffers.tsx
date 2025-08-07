import {useEffect, useRef, useState} from "react";
import {TbCalendarCancel, TbPlus} from "react-icons/tb";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";
import {RiCloseLargeLine} from "react-icons/ri";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null,
    meetingsSettingsLimitsBuffersData: {
        perMonth: string;
        perWeek: string;
        beforeEvent: string;
        perDay: string;
        afterEvent: string
    },
    setMeetingsSettingLimitsBuffersData: (params: any) => void
}

const MeetingsSettingLimitsAndBuffers = ({
                                             type,
                                             activeSection,
                                             meetingsSettingsLimitsBuffersData,
                                             setMeetingsSettingLimitsBuffersData
                                         }: MeetingsSettingDurationProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownState({beforeEvent: false, afterEvent: false});
                setDropdownLimitsState({});
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [isBufferTime, setIsBufferTime] = useState<boolean>(false)
    const [dropdownState, setDropdownState] = useState<Record<string, boolean>>({
        beforeEvent: false,
        afterEvent: false
    });
    const [dropdownLimitsState, setDropdownLimitsState] = useState<Record<string, boolean>>({});
    const [limits, setLimits] = useState<{ period: string; value: string }[]>([]);
    const periods = ["day", "week", "month"];

    const toggleDropdown = (key: string) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    const toggleDropdownLimits = (index: number) => {
        setDropdownLimitsState((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    const selectOption = (key: string, value: string) => {
        updateMeetingsSettingLimitsBuffersData(key, value);
        toggleDropdown(key);
    };
    const updateMeetingsSettingLimitsBuffersData = (key: string, value: string) => {
        setMeetingsSettingLimitsBuffersData({...meetingsSettingsLimitsBuffersData, [key]: value});
    };

    const addLimit = () => {
        const availablePeriods = periods.filter(
            (period) => !limits.some((limit) => limit.period === period)
        );
        if (availablePeriods.length > 0) {
            setLimits([...limits, {period: availablePeriods[0], value: ""}]);
        }
    };
    const removeLimit = (index: number) => {
        const updatedLimits = [...limits];
        updatedLimits.splice(index, 1);
        setLimits(updatedLimits);
    };
    const updateLimit = (index: number, field: "period" | "value", value: string) => {
        const updatedLimits = [...limits];
        updatedLimits[index][field] = value;
        setLimits(updatedLimits);
        if (field === "period") {
            setDropdownLimitsState((prevState) => ({
                ...prevState,
                [index]: false,
            }));
        } else if (field === "value") {
            const periodMapping: Record<string, string> = {
                day: "perDay",
                week: "perWeek",
                month: "perMonth",
            };
            const periodKey = periodMapping[updatedLimits[index].period];
            if (periodKey) {
                updateMeetingsSettingLimitsBuffersData(periodKey, value);
            }
        }
    };
    const availablePeriods = (index: number) =>
        periods.filter((period) => {
            return (
                period === limits[index]?.period ||
                !limits.some((limit, i) => limit.period === period && i !== index)
            );
        });

    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Limits and buffers
                </div>
                <div
                    className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'limits-and-buffers' ? 'hidden' : ''}`}>
                    <TbCalendarCancel size="15" className="inline me-1.5"/> Buffer times, max limits
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents" ref={dropdownRef}>
                <div className="text-mainBlack text-sm font-light mb-1">
                    Buffer times
                </div>
                <div className="text-xs font-light text-[#476788]">
                    Add buffer time before or after booked Calendly events
                </div>
                {isBufferTime ? (
                    <div className="border-l border-l-mainStroke my-3 pl-4 pb-3 text-sm">
                        <div className="text-xs text-[#476788] mb-2">
                            Before event:
                        </div>
                        <div className="relative">
                            <button
                                className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center"
                                onClick={() => toggleDropdown("beforeEvent")}
                            >
                                {meetingsSettingsLimitsBuffersData.beforeEvent}
                                {dropdownState.beforeEvent ? (
                                    <FaAngleUp size={16} className="text-gray-500"/>
                                ) : (
                                    <FaAngleDown size={16} className="text-gray-500"/>
                                )}
                            </button>
                            {dropdownState.beforeEvent && (
                                <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                                    {["0 min", "5 min", "10 min", "15 min", "30 min", "45 min", "1 hr", "1 hr 30 min", "2 hrs", "2 hrs 30 min", "3 hrs"].map(
                                        (option) => (
                                            <li
                                                key={option}
                                                onClick={() => selectOption('beforeEvent', option)}
                                                className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer
                                            ${option === meetingsSettingsLimitsBuffersData.beforeEvent ?
                                                    'relative' :
                                                    ''
                                                }`}
                                            >
                                                <div
                                                    className={`${option === meetingsSettingsLimitsBuffersData.beforeEvent ? 'absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue' : 'hidden'}`}>
                                                    <FaCheck size="15"/>
                                                </div>
                                                {option}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                        <div className="text-xs text-[#476788] my-2">
                            After event:
                        </div>
                        <div className="relative">
                            <button
                                className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center"
                                onClick={() => toggleDropdown("afterEvent")}
                            >
                                {meetingsSettingsLimitsBuffersData.afterEvent}
                                {dropdownState.afterEvent ? (
                                    <FaAngleUp size={16} className="text-gray-500"/>
                                ) : (
                                    <FaAngleDown size={16} className="text-gray-500"/>
                                )}
                            </button>
                            {dropdownState.afterEvent && (
                                <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                                    {["0 min", "5 min", "10 min", "15 min", "30 min", "45 min", "1 hr", "1 hr 30 min", "2 hrs", "2 hrs 30 min", "3 hrs"].map(
                                        (option) => (
                                            <li
                                                key={option}
                                                onClick={() => selectOption('afterEvent', option)}
                                                className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer
                                            ${option === meetingsSettingsLimitsBuffersData.afterEvent ?
                                                    'relative' :
                                                    ''
                                                }`}
                                            >
                                                <div
                                                    className={`${option === meetingsSettingsLimitsBuffersData.afterEvent ? 'absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue' : 'hidden'}`}>
                                                    <FaCheck size="15"/>
                                                </div>
                                                {option}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className="text-sm font-light text-mainBlue my-3 flex items-center cursor-pointer hover:text-[#00347b]"
                        onClick={() => setIsBufferTime(true)}>
                        <TbPlus size="15" className="inline me-1"/> Set buffer time
                    </div>
                )}
                <div className="text-mainBlack text-sm font-light mb-1">
                    Max meetings
                </div>
                <div className="text-xs font-light text-[#476788]">
                    Set the maximum events allowed per day, week or month
                </div>
                {limits.length === 0 && (
                    <div
                        className="text-sm font-light text-mainBlue mt-3 flex items-center cursor-pointer hover:text-[#00347b]"
                        onClick={addLimit}
                    >
                        <TbPlus size="15"
                                className="inline me-1"/> Set limit
                    </div>
                )}
                {limits.length > 0 && (
                    <div className="border-l border-l-mainStroke my-3 pl-4 text-sm">
                        {limits.map((limit, index) => (
                            <div key={index} className="flex items-center pb-2">
                                <div className="w-[90px]">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none hide-number-arrows"
                                        value={limit.value}
                                        onChange={(e) => updateLimit(index, "value", e.target.value)}
                                    />
                                </div>
                                <div className="text-xs px-2 text-darkGray font-light">meetings per</div>
                                <div className="relative flex-auto">
                                    <button
                                        disabled={limits.length === 3}
                                        className={`w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center ${limits.length === 3 ? 'bg-gray-200 text-darkGray' : ''}`}
                                        onClick={() => toggleDropdownLimits(index)}
                                    >
                                        {limit.period || "Select period"}
                                        {dropdownLimitsState[index] ? (
                                            <FaAngleUp size={16} className="text-gray-500"/>
                                        ) : (
                                            <FaAngleDown size={16} className="text-gray-500"/>
                                        )}
                                    </button>
                                    {dropdownLimitsState[index] && (
                                        <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                                            {availablePeriods(index).map((period) => (
                                                <li
                                                    key={period}
                                                    onClick={() => updateLimit(index, "period", period)}
                                                    className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer ${
                                                        period === limit.period ? "relative" : ""
                                                    }`}
                                                >
                                                    <div
                                                        className={`${
                                                            period === limit.period
                                                                ? "absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue"
                                                                : "hidden"
                                                        }`}
                                                    >
                                                        <FaCheck size="15"/>
                                                    </div>
                                                    {period}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div
                                    className="pl-4 pr-2 text-mainBlack cursor-pointer"
                                    onClick={() => removeLimit(index)}
                                >
                                    <RiCloseLargeLine size="18"/>
                                </div>
                            </div>
                        ))}
                        {limits.length < periods.length && (
                            <div
                                className="text-sm font-light text-mainBlue mt-3 flex items-center cursor-pointer hover:text-[#00347b]"
                                onClick={addLimit}
                            >
                                <TbPlus size="15"
                                        className="inline me-1"/> Add another limit
                            </div>
                        )}
                    </div>
                )}
            </div>
        ) : null
    );
};

export default MeetingsSettingLimitsAndBuffers;