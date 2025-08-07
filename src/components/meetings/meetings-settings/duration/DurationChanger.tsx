import {useEffect, useState, useRef} from "react";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";

interface DurationChangerProps {
    meetingsSettingsDurationData: string,
    setMeetingsSettingDurationData: (value: (((prevState: string) => string) | string)) => void
}

const DurationChanger = ({meetingsSettingsDurationData, setMeetingsSettingDurationData}: DurationChangerProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownState({ main: false, custom: false });
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [dropdownState, setDropdownState] = useState<Record<string, boolean>>({
        main: false,
        custom: false
    });
    const [customValue, setCustomValue] = useState<string>('');
    const [customUnit, setCustomUnit] = useState<string | null>('min');
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const updateCustomDuration = (value: string) => {
        const duration = `${value} ${customUnit}`;
        if (customUnit === "hrs" && parseInt(value) > 12) {
            setCustomValue('');
            setMeetingsSettingDurationData('');
            setError("Must be less than or equal to 12 hrs");
        } else if (customUnit === "min" && parseInt(value) > 720) {
            setCustomValue('');
            setMeetingsSettingDurationData('');
            setError("Must be less than or equal to 720 min");
        } else {
            setError("");
            setCustomValue(value);
            setMeetingsSettingDurationData(duration);
        }
    };
    const updateCustomStatus = () => {
        setIsCustom(true)
        setMeetingsSettingDurationData('');
        toggleDropdown('main')
    };
    const toggleDropdown = (key: string) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    const selectOption = (value: string, dropdown: string) => {
        setMeetingsSettingDurationData(value)
        setIsCustom(false);
        setCustomValue('');
        setCustomUnit('min');
        toggleDropdown(dropdown);
    };
    const selectCustomUnitOption = (value: string, dropdown: string) => {
        setCustomUnit(value);
        toggleDropdown(dropdown);
    };
    useEffect(() => {
        if (isCustom) {
            const numericValue = parseInt(customValue);
            if (isNaN(numericValue) || customValue.trim() === '') {
                setMeetingsSettingDurationData('');
                setError('');
                return;
            }

            const duration = `${customValue} ${customUnit}`;
            setMeetingsSettingDurationData(duration);
            if (customUnit === "hrs" && numericValue > 12) {
                setCustomValue('');
                setMeetingsSettingDurationData('');
                setError("Must be less than or equal to 12 hrs");
            } else if (customUnit === "min" && numericValue > 720) {
                setCustomValue('');
                setMeetingsSettingDurationData('');
                setError("Must be less than or equal to 720 min");
            } else {
                setError("");
                setCustomValue(customValue);
                setMeetingsSettingDurationData(duration);
            }
        }
    }, [isCustom, customUnit, customValue]);

    return (
        <div className="content-holder contents" ref={dropdownRef}>
            <div className="relative text-sm">
                <button
                    className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center"
                    onClick={() => toggleDropdown("main")}
                >
                    {isCustom ? 'Custom' : meetingsSettingsDurationData}
                    {dropdownState.main ? (
                        <FaAngleUp size={16} className="text-gray-500"/>
                    ) : (
                        <FaAngleDown size={16} className="text-gray-500"/>
                    )}
                </button>
                {dropdownState.main && (
                    <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                        {["15 min", "30 min", "45 min", "60 min"].map(
                            (option) => (
                                <li
                                    key={option}
                                    onClick={() => selectOption(option, 'main')}
                                    className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer
                                            ${(option === meetingsSettingsDurationData && !isCustom) ?
                                        'relative' :
                                        ''
                                    }`}
                                >
                                    <div
                                        className={`${(option === meetingsSettingsDurationData && !isCustom) ? 'absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue' : 'hidden'}`}>
                                        <FaCheck size="15"/>
                                    </div>
                                    {option}
                                </li>
                            )
                        )}
                        <li
                            key="Custom"
                            onClick={() => updateCustomStatus()}
                            className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer
                                            ${isCustom ?
                                'relative' :
                                ''
                            }`}
                        >
                            <div
                                className={`${isCustom ? 'absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue' : 'hidden'}`}>
                                <FaCheck size="15"/>
                            </div>
                            Custom
                        </li>
                    </ul>
                )}
                {isCustom && (
                    <>
                        <div className="grid grid-cols-[2fr_3fr] gap-2 pt-4">
                            <div>
                                <input type="number"
                                       className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none hide-number-arrows"
                                       onChange={(e) => updateCustomDuration(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center"
                                    onClick={() => toggleDropdown("custom")}
                                >
                                    {customUnit}
                                    {dropdownState.custom ? (
                                        <FaAngleUp size={16} className="text-gray-500"/>
                                    ) : (
                                        <FaAngleDown size={16} className="text-gray-500"/>
                                    )}
                                </button>
                                {dropdownState.custom && (
                                    <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                                        {["min", "hrs"].map(
                                            (option) => (
                                                <li
                                                    key={option}
                                                    onClick={() => selectCustomUnitOption(option, 'custom')}
                                                    className={`px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer
                                                            ${option === customUnit ?
                                                        'relative' :
                                                        ''
                                                    }`}
                                                >
                                                    <div
                                                        className={`${option === customUnit ? 'absolute top-1/2 -translate-y-1/2 right-5 text-mainBlue' : 'hidden'}`}>
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
                        <div className="text-sm text-[#b03200] font-light mt-1">
                            {error}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DurationChanger;