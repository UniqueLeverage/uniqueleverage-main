import {Link} from "react-router-dom";
import routerPaths from "../../routerPaths.tsx";
import {IoArrowBack, IoCalendarClearOutline} from "react-icons/io5";
import companyLogo from "../../assets/dfa_logo_landscape.png";
import carExample1 from "../../assets/carExample1.jpg"
import {HiOutlineDuplicate} from "react-icons/hi";
import {TbAutomaticGearbox, TbWorld} from "react-icons/tb";
import {LuClock3, LuFuel, LuPaintbrushVertical, LuPhone} from "react-icons/lu";
import {AiOutlineCar} from "react-icons/ai";
import {GoDotFill} from "react-icons/go";
import {format, addMinutes} from "date-fns";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti";

interface VehicleSchedulingSidebarProps {
    step: number,
    setStep: (value: (((prevState: number) => number) | number)) => void,
    selectedDate: Date | null,
    selectedTime: string | null,
    timezone: string,
    showDetails: boolean,
    setShowDetails: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const VehicleSchedulingSidebar = ({
                                      step,
                                      setStep,
                                      selectedDate,
                                      selectedTime,
                                      timezone,
                                      showDetails,
                                      setShowDetails
                                  }: VehicleSchedulingSidebarProps) => {

    const toggleDetails = () => setShowDetails((prev) => !prev);

    return (
        <div className="pb-6 lg:border-r border-[#1a1a1a1a] rounded-l-xl h-full overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-center relative border-b border-b-[#1a1a1a1a] px-4 py-4 md:py-3">
                {step === 3 ? (
                    <button
                        className="absolute top-1/2 -translate-y-1/2 start-5 p-1.5 rounded-full border border-mainStroke/50 cursor-pointer"
                        onClick={() => {
                            setStep(2);
                            window.scrollTo(0, 0);
                        }}>
                        <IoArrowBack className="text-mainBlue" size="20"/>
                    </button>
                ) : (
                    <Link to={routerPaths.home} className="absolute start-0 top-1/2 -translate-y-1/2 pl-4">
                        <IoArrowBack className="text-mainBlue" size="20"/>
                    </Link>
                )}
                <div className="justify-self-center">
                    <img src={companyLogo} alt="" height="36" className="w-full"/>
                </div>
            </div>
            <div className="mt-3">
                <div className="text-mainGray font-medium px-4">
                    David Family Autos
                </div>
                <div className="text-[#17181A] font-semibold text-xl px-4">
                    2020 Ford Explorer ST
                </div>
                <div className="relative my-2 lg:px-4">
                    <img src={carExample1} alt="2020 Ford Explorer ST"
                         className="w-full h-48 object-cover lg:rounded-md"/>
                    <div
                        className="bg-[#262B2F33] text-white font-semibold text-xs absolute top-2 left-2 lg:left-5 backdrop-blur-sm py-1 px-3 rounded-full">
                        New listing
                    </div>
                </div>
                <div className="flex items-center mb-3 px-4">
                    <div className="text-[#17181A] font-medium pr-3 border-r border-r-[#BEC0C3]">
                        $38,998
                    </div>
                    <div className="text-[#17181A] font-medium pl-3">
                        30K Miles
                    </div>
                </div>
                {step !== 3 && (
                    <div className="flex lg:hidden items-center px-4 mt-2 mb-4">
                        <div
                            className="bg-mainSecondBg flex items-center rounded-xl py-2 px-3 mr-1">
                            <div className="mr-1">
                                <LuClock3 className="text-mainGray" size="15"/>
                            </div>
                            <div className="text-mainGray text-xxs text-nowrap">
                                15 min
                            </div>
                        </div>
                        <div className="bg-mainSecondBg flex items-center rounded-xl py-2 px-3">
                            <div className="mr-1">
                                <LuPhone className="text-mainGray" size="15"/>
                            </div>
                            <div className="text-mainGray text-xxs text-nowrap">
                                Phone Call
                            </div>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="px-4 mt-2 mb-4">
                        <div
                            className="flex items-center font-semibold py-2 mr-1">
                            <div className="mr-2">
                                <LuClock3 className="text-[#1a1a1a9c]" size="20"/>
                            </div>
                            <div className="text-[#1a1a1a9c]">
                                15 min
                            </div>
                        </div>
                        <div className="flex items-center font-semibold py-2">
                            <div className="mr-2">
                                <LuPhone className="text-[#1a1a1a9c]" size="20"/>
                            </div>
                            <div className="text-[#1a1a1a9c]">
                                Phone Call
                            </div>
                        </div>
                        <div className="flex items-center font-semibold py-2">
                            <div className="mr-2">
                                <IoCalendarClearOutline className="text-[#1a1a1a9c]" size="20"/>
                            </div>
                            <div className="text-[#1a1a1a9c]">
                                {selectedTime && selectedDate ? `${selectedTime} - ${format(addMinutes(new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`), 15), 'HH:mm')}, ${format(selectedDate, 'EEEE')}, ${format(selectedDate, 'MMMM d, yyyy')}` : ''}
                            </div>
                        </div>
                        <div className="flex items-center font-semibold pt-2">
                            <div className="mr-2">
                                <TbWorld className="text-[#1a1a1a9c]" size="20"/>
                            </div>
                            <div className="text-[#1a1a1a9c]">
                                {timezone}
                            </div>
                        </div>
                    </div>
                )}
                {(!showDetails && step !== 3) && (
                    <div
                        className="text-[#0a2540] cursor-pointer font-bold text-sm px-5 pb-2 lg:hidden"
                        onClick={toggleDetails}
                    >
                        SHOW MORE
                    </div>
                )}
                {step === 3 && (
                    showDetails ? (
                        <div
                            className="text-[#0a2540] flex items-center cursor-pointer text-sm px-5 py-4 bg-[#fafafa]"
                            onClick={toggleDetails}
                        >
                            <TiArrowSortedUp size="25" className="text-mainBlue"/>
                            Less Details
                        </div>
                    ) : (
                        <div
                            className="text-[#0a2540] flex items-center cursor-pointer text-sm px-5 py-4 bg-[#fafafa]"
                            onClick={toggleDetails}
                        >
                            <TiArrowSortedDown size="25" className="text-mainBlue"/>
                            More Details
                        </div>
                    )
                )}
                <div
                    className={`${showDetails ? "block" : "hidden"} ${step !== 3 ? 'lg:block' : ''} transition-all duration-300 ease-in-out px-4 ${step === 3 ? 'bg-[#fafafa] pb-4' : ''}`}
                >

                    <div className="flex items-center mb-3">
                        <div className="mr-2">
                            <TbAutomaticGearbox className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            Automatic Transmission
                        </div>
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="mr-2">
                            <LuPaintbrushVertical className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            Exterior color: White
                            <span className="px-1"><GoDotFill className="inline text-mainGray" size="8"/></span>
                            Interior color: Black
                        </div>
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="mr-2">
                            <LuFuel className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            Fuel type: Gasoline
                        </div>
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="mr-2">
                            <HiOutlineDuplicate className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            Stock 268393803
                        </div>
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="mr-2">
                            <HiOutlineDuplicate className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            VIN 2RN368394M3803
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="mr-2">
                            <AiOutlineCar className="text-mainGray" size="18"/>
                        </div>
                        <div className="text-[#292B2E] text-sm">
                            Good condition
                        </div>
                    </div>
                    <div className={`hidden ${step !== 3 ? 'lg:flex' : ''} items-center justify-center`}>
                        <div className="flex items-center pr-3">
                            <div className="mr-1">
                                <LuClock3 className="text-darkGray" size="15"/>
                            </div>
                            <div className="text-darkGray text-sm font-medium">
                                15 minutes
                            </div>
                        </div>
                        <div className="flex items-center pl-3">
                            <div className="mr-1">
                                <LuPhone className="text-darkGray" size="15"/>
                            </div>
                            <div className="text-darkGray text-sm font-medium">
                                Phone Call
                            </div>
                        </div>
                    </div>
                </div>
                {(showDetails && step !== 3) && (
                    <div
                        className="text-[#0a2540] cursor-pointer font-bold text-sm px-5 pb-2 lg:hidden"
                        onClick={toggleDetails}
                    >
                        SHOW LESS
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleSchedulingSidebar;