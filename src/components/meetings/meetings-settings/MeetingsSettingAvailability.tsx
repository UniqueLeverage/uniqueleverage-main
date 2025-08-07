import {useState} from "react";
import {FiX, FiPlus} from "react-icons/fi";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {DateRange, RangeKeyDict} from "react-date-range";
import {addDays} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {PiArrowsCounterClockwiseBold} from "react-icons/pi";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null,
    weeklyAvailability: DayAvailability[],
    setWeeklyAvailability: (value: (((prevState: DayAvailability[]) => DayAvailability[]) | DayAvailability[])) => void
}

interface TimeSlot {
    start: string;
    end: string;
}

interface DayAvailability {
    name: string;
    label: string;
    unavailable: boolean;
    slots: TimeSlot[];
}

type DateRangeType = "rolling" | "dateRange" | "indefinite";
type RollingUnit = "weekdays" | "calendarDays";
type NoticeUnit = "minutes" | "hours" | "days";

const getAvailabilitySummary = (weeklyAvailability: DayAvailability[]): string => {
    const availableDays = weeklyAvailability.filter(
        (day) => !day.unavailable && day.slots.length > 0
    );
    if (availableDays.length === 0) {
        return "No days selected";
    }
    const dayLabels = availableDays.map((day) => day.name.slice(0, 3)).join(", ");
    return `${dayLabels}, hours vary`;
};

const MeetingsSettingAvailability = ({
                                         type,
                                         activeSection,
                                         weeklyAvailability,
                                         setWeeklyAvailability
                                     }: MeetingsSettingDurationProps) => {
    const [dateRangeType, setDateRangeType] = useState<DateRangeType>("rolling");
    const [rollingNumber, setRollingNumber] = useState<number>(60);
    const [rollingUnit, setRollingUnit] = useState<RollingUnit>("weekdays");

    const [rangeValue, setRangeValue] = useState<string>("");
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [showDateRangeSettings, setShowDateRangeSettings] = useState(false);

    const [noticeNumber, setNoticeNumber] = useState<number>(4);
    const [noticeUnit, setNoticeUnit] = useState<NoticeUnit>("hours");

    const [showNoticeSettings, setShowNoticeSettings] = useState(false);

    const toggleDateRangePanel = (nextType: DateRangeType) => {
        if (showDateRangeSettings && dateRangeType === nextType) {
            setShowDateRangeSettings(false);
            return;
        }
        setDateRangeType(nextType);
        setShowDateRangeSettings(true);
        setShowNoticeSettings(false);
    };

    const toggleNoticePanel = () => {
        if (showNoticeSettings) {
            setShowNoticeSettings(false);
            return;
        }
        setShowDateRangeSettings(false);
        setShowNoticeSettings(true);
    };

    const [selectionRange, setSelectionRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 4),
            key: "selection",
        },
    ]);

    const handleSelectDates = (ranges: RangeKeyDict) => {
        const selection = ranges.selection;
        if (selection.startDate && selection.endDate) {
            setSelectionRange([
                {
                    startDate: selection.startDate,
                    endDate: selection.endDate,
                    key: selection.key || "selection",
                },
            ]);
        }
    };

    const handleApplyDates = () => {
        const {startDate, endDate} = selectionRange[0];
        if (startDate && endDate) {
            const formatted = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            setRangeValue(formatted);
        }
        setShowCalendar(false);
    };
    const handleCancelDates = () => {
        setShowCalendar(false);
    };
    const getDateRangeIcon = (panelType: DateRangeType) => {
        if (showDateRangeSettings && dateRangeType === panelType) {
            return <FaChevronUp className="ml-1.5 mt-0.5 inline"/>;
        }
        return <FaChevronDown className="ml-1.5 mt-0.5 inline"/>;
    };
    const getNoticeIcon = () => {
        return showNoticeSettings ? (
            <FaChevronUp className="ml-1.5 mt-0.5 inline"/>
        ) : (
            <FaChevronDown className="ml-1.5 mt-0.5 inline"/>
        );
    };
    const renderPreviewText = () => {
        let mainText: JSX.Element | string;
        let noticePart: JSX.Element | string;

        if (dateRangeType === "rolling") {
            mainText = (
                <>
                    Invitees can schedule{" "}
                    <span
                        onClick={() => toggleDateRangePanel("rolling")}
                        className="text-mainBlue cursor-pointer inline-flex items-center mx-1"
                    >
                        {rollingNumber}{" "}
                        {rollingUnit === "weekdays" ? "weekdays" : "calendar days"}
                        {getDateRangeIcon("rolling")}
                    </span>
                    into the future
                </>
            );
        } else if (dateRangeType === "dateRange") {
            const displayRange = rangeValue || "a date range";
            mainText = (
                <>
                    Invitees can schedule within{" "}
                    <span
                        onClick={() => toggleDateRangePanel("dateRange")}
                        className="text-mainBlue cursor-pointer inline-flex items-center mx-1"
                    >
                        {displayRange}
                        {getDateRangeIcon("dateRange")}
                    </span>
                </>
            );
        } else {
            mainText = (
                <>
                    Invitees can schedule{" "}
                    <span
                        onClick={() => toggleDateRangePanel("indefinite")}
                        className="text-mainBlue cursor-pointer inline-flex items-center mx-1"
                    >
                        indefinitely into the future
                        {getDateRangeIcon("indefinite")}
                    </span>
                </>
            );
        }

        noticePart = (
            <span
                onClick={toggleNoticePanel}
                className="text-mainBlue cursor-pointer inline-flex items-center ml-1"
            >
                {noticeNumber} {noticeUnit}
                {getNoticeIcon()}
            </span>
        );

        return (
            <div className="text-sm text-darkGray font-light leading-6">
                {mainText}
                {" with at least"}
                {noticePart}
                {" notice"}
            </div>
        );
    };
    const [timezone, setTimezone] = useState<string>('Eastern Time - US & Canada');

    const removeSlot = (dayIndex: number, slotIndex: number) => {
        setWeeklyAvailability((prev) => {
            const copy = [...prev];
            copy[dayIndex].slots.splice(slotIndex, 1);
            if (!copy[dayIndex].slots.length) {
                copy[dayIndex].unavailable = true;
            }
            return copy;
        });
    };
    const addSlot = (dayIndex: number) => {
        setWeeklyAvailability((prev) => {
            const copy = [...prev];
            if (copy[dayIndex].unavailable) {
                copy[dayIndex].unavailable = false;
            }
            copy[dayIndex].slots.push({start: "09:00", end: "10:00"});
            return copy;
        });
    };
    const handleSlotChange = (
        dayIndex: number,
        slotIndex: number,
        field: "start" | "end",
        value: string
    ) => {
        setWeeklyAvailability((prev) => {
            const copy = [...prev];
            copy[dayIndex].slots[slotIndex][field] = value;
            return copy;
        });
    };

    if (type === "title") {
        const availabilitySummary = getAvailabilitySummary(weeklyAvailability);

        return (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Availability
                </div>
                <div
                    className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${
                        activeSection === "availability" ? "hidden" : ""
                    }`}
                >
                    {availabilitySummary}
                </div>
            </div>
        );
    }

    if (type === "content") {
        return (
            <div className="content-holder contents">
                <div className="">
                    <div className="text-sm font-semibold text-mainBlack mb-2">Date-range</div>
                    {renderPreviewText()}
                </div>
                {showDateRangeSettings && (
                    <div className="border-l border-l-mainStroke my-3 pl-4 pb-3 ">
                        <label htmlFor="rolling" className="text-sm cursor-pointer">
                            <div className="flex items-center mb-5">
                                <input
                                    id="rolling"
                                    name="dateRangeType"
                                    type="radio"
                                    value="rolling"
                                    checked={dateRangeType === "rolling"}
                                    onChange={() => setDateRangeType("rolling")}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${dateRangeType === "rolling" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={rollingNumber}
                                        onChange={(e) => setRollingNumber(Number(e.target.value))}
                                        className="w-20 h-11 px-2 py-2 text-center border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue hide-number-arrows mr-2"
                                    />
                                    <select
                                        value={rollingUnit}
                                        onChange={(e) =>
                                            setRollingUnit(e.target.value as RollingUnit)
                                        }
                                        className="px-2 py-2 h-11 border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue mr-3"
                                    >
                                        <option value="weekdays">weekdays</option>
                                        <option value="calendarDays">calendar days</option>
                                    </select>
                                    <span className="font-light text-darkGray">into the future</span>
                                </div>
                            </div>
                        </label>
                        <div className="flex items-center mb-3">
                            <input
                                id="dateRange"
                                name="dateRangeType"
                                type="radio"
                                value="dateRange"
                                checked={dateRangeType === "dateRange"}
                                onChange={() => setDateRangeType("dateRange")}
                                className="sr-only"
                            />
                            <label htmlFor="dateRange"
                                   className="text-sm cursor-pointer flex items-center text-darkGray font-light">
                                <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${dateRangeType === "dateRange" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                                Within a date range
                            </label>
                        </div>
                        {dateRangeType === "dateRange" && (
                            <div className="ml-6 relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={rangeValue}
                                    onClick={() => setShowCalendar(true)}
                                    className="w-56 cursor-pointer h-11 px-2 py-2 text-center font-light text-darkGray border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue"
                                />
                                {!rangeValue && (
                                    <div className="text-red-500 text-xs mt-1">
                                        Can't be blank
                                    </div>
                                )}
                                {showCalendar && (
                                    <div className="fixed top-5 right-0 mt-2 z-50">
                                        <div className="bg-white rounded-md shadow-lg p-4">
                                            <DateRange
                                                ranges={selectionRange}
                                                onChange={handleSelectDates}
                                                moveRangeOnFirstSelection={false}
                                                showPreview={false}
                                                months={2}
                                                direction="horizontal"
                                                showMonthAndYearPickers={false}
                                            />
                                            <div className="flex items-center justify-end mt-3 space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={handleCancelDates}
                                                    className="text-mainGray hover:text-darkGray text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleApplyDates}
                                                    className="bg-mainBlue text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center mt-5">
                            <input
                                id="indefinite"
                                name="dateRangeType"
                                type="radio"
                                value="indefinite"
                                checked={dateRangeType === "indefinite"}
                                onChange={() => setDateRangeType("indefinite")}
                                className="sr-only"
                            />
                            <label htmlFor="indefinite"
                                   className="text-sm cursor-pointer flex items-center text-darkGray font-light">
                                <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${dateRangeType === "indefinite" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                                Indefinitely into the future
                            </label>
                        </div>
                    </div>
                )}
                {showNoticeSettings && (
                    <div className="border-l border-l-mainStroke my-3 pl-4 pb-3 ">
                        <div className="flex items-center">
                            <input
                                type="number"
                                value={noticeNumber}
                                onChange={(e) => setNoticeNumber(Number(e.target.value))}
                                className="w-20 h-11 px-2 py-2 text-center border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue hide-number-arrows mr-2"
                            />
                            <select
                                value={noticeUnit}
                                onChange={(e) => setNoticeUnit(e.target.value as NoticeUnit)}
                                className="px-2 py-2 h-11 border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue mr-3"
                            >
                                <option value="minutes">minutes</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                            <span className="font-light text-darkGray">of an event start time.</span>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <div className="text-sm font-semibold text-mainBlack mb-4">Schedule</div>
                    <div className="text-sm flex items-center text-darkGray font-light">
                        <PiArrowsCounterClockwiseBold size="16" className="inline mr-1"/>
                        Weekly hours
                    </div>
                    <div className="text-xs font-light text-darkGray mt-1.5">
                        Set when you are available for meetings
                    </div>
                    <div className="mt-6">
                        {weeklyAvailability.map((day, dayIndex) => (
                            <div key={day.name} className="flex items-center mb-3">
                                <div
                                    className={`font-semibold w-6 h-6 leading-6 bg-[#004796] text-center text-white rounded-full text-xs mr-2 ${day.unavailable ? '' : 'self-start mt-3'}`}>{day.label}</div>
                                {day.unavailable ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-mainGray font-light text-xs">Unavailable</span>
                                        <button
                                            onClick={() => addSlot(dayIndex)}
                                            className="p-1 text-center flex items-center justify-center gap-1 duration-300 hover:bg-[#f0f3f8] w-8 h-8 rounded-md"
                                        >
                                            <div className="flex items-center border border-mainBlack rounded-full">
                                                <FiPlus size="14"/>
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {day.slots.map((slot, slotIndex) => (
                                            <div
                                                key={`${day.name}-${slotIndex}`}
                                                className="flex items-center gap-2 text-sm mt-2"
                                            >
                                                <input
                                                    type="time"
                                                    step="900"
                                                    value={slot.start}
                                                    onChange={(e) =>
                                                        handleSlotChange(
                                                            dayIndex,
                                                            slotIndex,
                                                            "start",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-md font-light text-center px-1 h-10 w-20 bg-[#fafafa]"
                                                />
                                                <span className="px-1 text-darkGray">-</span>
                                                <input
                                                    type="time"
                                                    step="900"
                                                    value={slot.end}
                                                    onChange={(e) =>
                                                        handleSlotChange(
                                                            dayIndex,
                                                            slotIndex,
                                                            "end",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-md font-light text-center px-1 h-10 w-20 bg-[#fafafa]"
                                                />
                                                <button
                                                    onClick={() => removeSlot(dayIndex, slotIndex)}
                                                    className="p-1 text-center flex items-center justify-center gap-1 duration-300 hover:bg-[#f0f3f8] w-8 h-8 rounded-md"
                                                >
                                                    <div
                                                        className="flex items-center">
                                                        <FiX size="14"/>
                                                    </div>
                                                </button>
                                                {slotIndex === 0 && (
                                                    <button
                                                        onClick={() => addSlot(dayIndex)}
                                                        className="p-1 text-center flex items-center justify-center gap-1 duration-300 hover:bg-[#f0f3f8] w-8 h-8 rounded-md"
                                                    >
                                                        <div
                                                            className="flex items-center border border-mainBlack rounded-full">
                                                            <FiPlus size="14"/>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-xs text-mainBlue mt-4">
                    <select
                        name="timezone"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="bg-white border-0 focus:outline-none"
                    >
                        <option value="Eastern Time - US & Canada">Eastern Time - US & Canada
                        </option>
                        <option value="Central Time - US & Canada">Central Time - US & Canada
                        </option>
                        <option value="Mountain Time - US & Canada">Mountain Time - US & Canada
                        </option>
                        <option value="Pacific Time - US & Canada">Pacific Time - US & Canada
                        </option>
                        <option value="UTC">UTC</option>
                        <option value="GMT">GMT</option>
                    </select>
                </div>
            </div>
        );
    }

    return null;
};

export default MeetingsSettingAvailability;