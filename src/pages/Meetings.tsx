import {FaRegCircleQuestion} from "react-icons/fa6";
import {BsThreeDots} from "react-icons/bs";
import {FaChevronDown, FaPlay} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {FiPlus} from "react-icons/fi";
import {MdHorizontalRule} from "react-icons/md";
import {MeetingsRightCanvas} from "../components";

const Meetings = () => {
    const [isCanvasOpen, setIsCanvasOpen] = useState(true);
    const openCanvas = () => setIsCanvasOpen(true);
    const closeCanvas = () => setIsCanvasOpen(false);

    const dropdownData = [
        {
            title: "Teams",
            label: "All Teams",
            options: ["Team A", "Team B", "Team C"]
        },
        {
            title: 'Host',
            label: "Host",
            options: ["Host A", "Host B", "Host C"]
        },
        {
            title: 'Event Types',
            label: "All Event Types",
            options: ["Event Type 1", "Event Type 2", "Event Type 3"],
        },
        {
            title: 'Status',
            label: "Active Events",
            options: ["Active", "Inactive", "Pending"]
        },
    ];
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
        dropdownData.reduce((acc, item) => ({...acc, [item.label]: item.label}), {})
    );

    const [dropdownOpen, setDropdownOpen] = useState<boolean[]>(
        Array(dropdownData.length).fill(false)
    );

    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleDropdown = (index: number) => {
        setDropdownOpen((prev) =>
            prev.map((open, i) => (i === index ? !open : false))
        );
    };

    const handleOptionClick = (label: string, option: string, index: number) => {
        setSelectedOptions((prev) => ({...prev, [label]: option}));
        setDropdownOpen((prev) => prev.map((open, i) => (i === index ? false : open)));
    };

    const closeAllDropdowns = () => {
        setDropdownOpen(Array(dropdownData.length).fill(false));
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRefs.current.every(
                    (ref) => ref && !ref.contains(event.target as Node)
                )
            ) {
                closeAllDropdowns();
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className="p-6 overflow-x-hidden h-full">
            <div className="flex items-center">
                <div className="text-2xl font-semibold font-raleway text-[#292B2E] me-1.5">
                    Meetings
                </div>
                <div>
                    <FaRegCircleQuestion size="18"/>
                </div>
                <div className="ms-auto pr-4">
                    <BsThreeDots size="25" className="cursor-pointer" onClick={openCanvas}/>
                </div>
            </div>
            <div className="flex items-center mt-5">
                <div className="w-[80%] me-1 relative">
                    <input
                        type="text"
                        className="h-12 pl-4 pr-16 rounded-lg border border-[#CFD3D6] placeholder-mainGray font-light w-full focus:outline-none caret-mainGray"
                        placeholder="Search or add filters"
                        name="search"
                        id="search"
                    />
                    <div
                        className="absolute inset-y-0 right-5 flex items-center pl-2 text-mainGray font-light cursor-pointer">
                        Clear
                    </div>
                </div>
                <div className="w-[20%] ms-1 relative">
                    <select
                        className="h-12 rounded-lg text-sm px-3 font-light text-mainBlack border border-[#CFD3D6] w-full focus:outline-none appearance-none"
                        id="filterBy"
                    >
                        <option value="days">Last 7 days</option>
                        <option value="months">Last month</option>
                        <option value="years">Last year</option>
                    </select>
                    <div className="absolute text-mainBlack top-1/2 -translate-y-1/2 right-5">
                        <FaChevronDown size="15"/>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-8 justify-between px-4">
                <div className="flex items-center w-[60%]">
                    {dropdownData.map((dropdown, index) => (
                        <div className="relative w-1/4"
                             key={index}
                             ref={(el) => (dropdownRefs.current[index] = el)}
                        >
                            <div className="text-[#1A1A1A9C] text-xxs font-bold mb-1">
                                {dropdown.title}
                            </div>
                            <button
                                onClick={() => toggleDropdown(index)}
                                className="text-[#004EBA] flex items-center text-sm"
                            >
                                {selectedOptions[dropdown.label]}
                                <svg
                                    className="ml-1 w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen[index] && (
                                <div
                                    className="absolute mt-1 w-48 bg-white border border-gray-200 rounded z-10">
                                    {dropdown.options.map((option, optionIndex) => (
                                        <button
                                            key={optionIndex}
                                            onClick={() =>
                                                handleOptionClick(dropdown.label, option, index)
                                            }
                                            className="w-full text-left px-4 py-2 text-gray-700"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <div className="me-1">
                        <FiPlus size="18" className="text-mainBlue"/>
                    </div>
                    <div>
                        <button className="text-mainBlue flex items-center self-end">
                            Add Meeting
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="">
                    <div
                        className="text-[#0A2540] text-md font-bold bg-[#FAFAFA] border-y border-y-[#D4E0ED] py-4 px-7">
                        Wednesday, November 27, 2024
                    </div>
                    <div className="py-8 px-7">
                        <div className="flex items-center justify-between">
                            <div className="flex w-1/4 items-center">
                                <div className="me-4">
                                    <div className="w-8 h-8 rounded-full bg-[#17E885]"></div>
                                </div>
                                <div className="text-[#0A2540] text-sm">
                                    3:30 pm<MdHorizontalRule size="14" className="inline mx-1"/>4 pm
                                </div>
                            </div>
                            <div className="w-1/2 flex items-center">
                                <div className="text-md text-[#0A2540] me-5">
                                    <span className="font-bold text-[#0A2540]">JASON FRIEDMAN</span><span
                                    className="text-[#1A1A1A9C]"> with you </span>
                                    Event type <span className="font-bold text-[#0A2540]">Discovery Call About Strategy and Quotes.</span>
                                </div>
                                <div className="text-[#0A2540] text-sm text-nowrap font-light">
                                    1 host | 0 non-hosts
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="text-[#1A1A1A9C] text-sm flex items-center justify-end">
                                    <FaPlay className="inline me-1"/>Details
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div
                        className="text-[#0A2540] text-md font-bold bg-[#FAFAFA] border-y border-y-[#D4E0ED] py-4 px-7">
                        Monday, November 25, 2024
                    </div>
                    <div className="py-8 px-7">
                        <div className="flex items-center justify-between">
                            <div className="flex w-1/4">
                                <div className="me-4">
                                    <div className="w-8 h-8 rounded-full bg-[#0099FF]"></div>
                                </div>
                                <div className="text-[#0A2540] text-sm">
                                    10 am<MdHorizontalRule size="14" className="inline mx-1"/>5 pm
                                    <div className="text-[#1A1A1A9C] text-xxs pr-2 pt-1">
                                        09:00am - 09:15am (Central Time - US &
                                        Canada)
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 flex items-center">
                                <div className="text-md text-[#0A2540] me-5">
                                    <span className="font-bold text-[#0A2540]">JASON FRIEDMAN</span><span
                                    className="text-[#1A1A1A9C]"> with you </span>
                                    Event type <span className="font-bold text-[#0A2540]">Discovery Call About Strategy and Quotes.</span>
                                </div>
                                <div className="text-[#0A2540] text-sm text-nowrap font-light">
                                    1 host | 0 non-hosts
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="text-[#1A1A1A9C] text-sm flex items-center justify-end">
                                    <FaPlay className="inline me-1"/>Details
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MeetingsRightCanvas
                isCanvasOpen={isCanvasOpen}
                openCanvas={openCanvas}
                closeCanvas={closeCanvas}
            />
        </div>
    );
};

export default Meetings;