import React, {useState} from 'react';
import {format, subMonths, addDays, addMonths, startOfMonth, endOfMonth, eachDayOfInterval} from 'date-fns';
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import usaFlag from "../../assets/usa_flag.png";
import {Link} from "react-router-dom";
import {GoChevronDown} from "react-icons/go";
import {TbWorld} from "react-icons/tb";
import {IoArrowBack} from "react-icons/io5";

interface ScheduleInformationProps {
    vehicle_id: string | undefined,
    step: number,
    setStep: (value: (((prevState: number) => number) | number)) => void,
    selectedDate: Date | null,
    selectedTime: string | null,
    timezone: string,
    setSelectedDate: (value: (((prevState: (Date | null)) => (Date | null)) | Date | null)) => void,
    setSelectedTime: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void,
    setTimezone: (value: (((prevState: string) => string) | string)) => void,
    setShowDetails: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ScheduleInformation = ({
                                 vehicle_id,
                                 step,
                                 setStep,
                                 selectedDate,
                                 selectedTime,
                                 timezone,
                                 setSelectedDate,
                                 setSelectedTime,
                                 setTimezone,
                                 setShowDetails
                             }: ScheduleInformationProps) => {
    const [formDetails, setFormDetails] = useState({
        name: '',
        email: '',
        phone: '',
        style: '',
        payment: '',
        repo: '',
        notes: '',
        smsNumber: ''
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const availableTimes = ['00:00', '00:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormDetails({...formDetails, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
        console.log('Form Submitted:', {vehicle_id, selectedDate, selectedTime, timezone, ...formDetails});
        // alert('Booking Confirmed!');
        // setSelectedDate(null);
        // setSelectedTime(null);
        // setFormDetails({name: '', email: '', phone: '', style: '', payment: '', repo: '', notes: '', smsNumber: ''});
        // setStep(1);
        // setShowDetails(false)
        // window.scrollTo(0, 0);
    };


    return (
        <div
            className={`border-t border-t-[#D9D9D9] lg:border-0 pt-5 px-3 md:px-3 h-full overflow-y-auto no-scrollbar flex flex-col md:items-center lg:items-start ${step === 2 ? 'lg:pr-0.5' : ''} ${step === 3 ? 'lg:py-[25px] lg:px-[30px]' : ''}`}>
            {step !== 3 && (
                <>
                    <div
                        className={`text-[#17181A] text-center md:text-left font-semibold pt-2 text-xl mb-6 lg:mb-8 md:block lg:pl-5 ${step === 2 ? 'hidden' : 'block'}`}>
                        Select a {step === 1 && (<span className="md:hidden">{step === 1 ? 'Day' : 'Time'}</span>)}
                        <span className="hidden md:inline">Date & Time</span>
                    </div>
                    <div
                        className="flex flex-col items-center md:flex-row md:w-full md:max-w-full md:items-start lg:flex-grow lg:flex-shrink lg:basis-[300px]">
                        {(step === 1 || step === 2) && (
                            <div
                                className={`step-one-holder px-2 md:px-0 w-full md:block pb-[70px] md:w-[60%] md:max-w-full ${step === 2 ? 'hidden lg:w-[60%]' : 'block md:mx-auto lg:w-full'}`}>
                                <div className="flex items-center mb-5 lg:mb-8 w-fit mx-auto max-w-full">
                                    <button
                                        onClick={() => {
                                            if (subMonths(currentMonth, 1) >= startOfMonth(new Date())) {
                                                setCurrentMonth(subMonths(currentMonth, 1));
                                            }
                                        }}
                                        disabled={subMonths(currentMonth, 1) <= startOfMonth(new Date())}
                                        className={`text-mainGray ${
                                            subMonths(currentMonth, 1) <= startOfMonth(new Date()) ? 'cursor-default' : ''
                                        }`}
                                    >
                                        <LuChevronLeft size="20"/>
                                    </button>
                                    <div className="text-[#292B2E] font-light mx-10 md:mx-6 xl:mx-6 2xl:mx-10">
                                        {format(currentMonth, 'MMMM yyyy')}
                                    </div>
                                    <button
                                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                        className="text-mainGray"
                                    >
                                        <LuChevronRight size="20"/>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center flex-col w-full mx-auto md:px-[19px]">
                                    <div
                                        className="grid grid-cols-7 justify-items-center md:w-full gap-x-0.5 lg:gap-2 text-center mb-1">
                                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                                            <div key={day}
                                                 className="text-[#33363A] text-xs font-light w-[44px] h-3 leading-3">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="grid grid-cols-7 justify-items-center md:w-full gap-x-0.5 lg:gap-2 gap-y-1 md:gap-y-2 text-center">
                                        {[...Array(daysInMonth[0].getDay() === 0 ? 6 : daysInMonth[0].getDay() - 1)].map((_, index) => (
                                            <div key={index} className="w-[44px] h-[44px]"></div>
                                        ))}
                                        {daysInMonth.map((date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            const isToday = date.toDateString() === today.toDateString();
                                            const isWithinNext10Days =
                                                date >= today &&
                                                date <= addDays(today, 9);

                                            return (
                                                <button
                                                    key={date.toString()}
                                                    onClick={() => {
                                                        if (isWithinNext10Days) {
                                                            setSelectedDate(date);
                                                            setStep(2);
                                                            setShowDetails(false)
                                                            window.scrollTo(0, 0);
                                                        }
                                                    }}
                                                    disabled={!isWithinNext10Days}
                                                    className={`w-[44px] h-[44px] rounded-full ${
                                                        selectedDate?.toDateString() === date.toDateString()
                                                            ? 'text-white bg-mainBlue font-bold'
                                                            : isToday
                                                                ? 'text-mainBlue bg-[#EFF9FF] relative font-bold after:content-[""] after:absolute after:bottom-1.5 after:start-1/2 after:-translate-x-1/2 after:bg-mainBlue after:h-[5px] after:w-[5px] after:rounded-full'
                                                                : isWithinNext10Days
                                                                    ? 'text-[#0060e6] bg-[#0069ff11] font-bold'
                                                                    : 'text-[#1a1a1a9c] font-light'
                                                    }`}
                                                >
                                                    {format(date, 'd')}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mt-1 pb-10 px-4 lg:pl-7">
                                    <div className="text-[#17181A] font-bold text-sm">
                                        Time zone
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="timezone"
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="px-10 w-full bg-white border-0 h-10 focus:outline-none appearance-none text-[#292B2E] font-light"
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
                                        <div className="absolute top-[9px] start-3">
                                            <TbWorld className="text-xl text-mainGray"/>
                                        </div>
                                        <div className="absolute top-[10px] end-3">
                                            <GoChevronDown className="text-xl text-[#292B2E]"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="step-two-holder w-full md:w-[40%] py-2 lg:pt-0 h-full flex flex-col">
                                <div
                                    className={`text-center text-[#0A2540] border-b fixed top-0 pt-5 bg-white h-[170px] w-full mb-5 md:hidden`}>
                                    <div
                                        className="absolute start-0 top-5 p-1.5 rounded-full border border-mainStroke/50 cursor-pointer"
                                        onClick={() => {
                                            setSelectedDate(null);
                                            setSelectedTime(null);
                                            setFormDetails({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                style: '',
                                                payment: '',
                                                repo: '',
                                                notes: '',
                                                smsNumber: ''
                                            });
                                            setShowDetails(false)
                                            setStep(1);
                                            window.scrollTo(0, 0);
                                        }}>
                                        <IoArrowBack className="text-mainBlue" size="25"/>
                                    </div>
                                    <div className="font-bold text-lg mb-1">
                                        {selectedDate ? format(selectedDate, 'EEEE') : ''}
                                    </div>
                                    <div className="font-light">
                                        {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
                                    </div>
                                    <div className="mt-3 pb-3 px-4 text-left">
                                        <div className="text-[#17181A] font-semibold text-sm pl-4">
                                            Time zone
                                        </div>
                                        <div className="relative mx-auto">
                                            <select
                                                name="timezone"
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                                className="px-10 w-full bg-white border-0 h-10 focus:outline-none appearance-none text-[#292B2E] font-light"
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
                                            <div className="absolute top-[9px] start-3">
                                                <TbWorld className="text-xl text-mainGray"/>
                                            </div>
                                            <div className="absolute top-[10px] end-3">
                                                <GoChevronDown className="text-xl text-[#292B2E]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4 pt-3 mt-[150px] text-center md:hidden">
                                    <div className="text-[#17181A] text-center font-semibold text-xl mb-4">
                                        Select a Time
                                    </div>
                                    <div className="text-sm font-light">
                                        Duration: 15 min
                                    </div>
                                </div>
                                <div
                                    className="text-[#0A2540] text-sm text-nowrap mb-4 lg:mb-5 pt-3 md:pt-0 hidden md:block">
                                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Friday, December 27'}
                                </div>
                                <div
                                    className="w-full flex flex-col overflow-y-auto h-full px-2 md:pr-6 lg:pr-8 lg:pt-3.5 lg:flex-grow lg:flex-shrink lg:basis-[100px] custom-scrollbar">
                                    {availableTimes.map((time) => (
                                        <div
                                            key={time}
                                            className="flex items-center justify-between mb-2.5"
                                        >
                                            <button
                                                onClick={() => {
                                                    setSelectedTime(time);
                                                }}
                                                className={`py-3.5 lg:py-[13px] font-semibold border rounded-[4px] transition-all duration-150 ease-in-out ${
                                                    selectedTime === time
                                                        ? 'w-[48%] bg-[#666666] border-[#666666] text-white'
                                                        : 'w-full bg-white border-[#0069FF80] text-[#0069FF]'
                                                }`}
                                            >
                                                {time}
                                            </button>
                                            {selectedTime === time && (
                                                <button
                                                    onClick={() => {
                                                        setShowDetails(false)
                                                        setStep(3);
                                                        window.scrollTo(0, 0);
                                                    }}
                                                    className="py-3.5 lg:py-[13px] font-semibold border-[#0069FF] bg-[#0069FF] text-white rounded-[4px] w-[48%] transition-all duration-150 ease-in-out"
                                                >
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {step === 3 && (
                <div className="w-full mx-auto lg:mx-0 max-w-[400px] pb-5 lg:pb-0">
                    <h2 className="text-xl font-bold mb-4 text-[#0A2540]">Enter Details</h2>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formDetails.name}
                            onChange={handleFormChange}
                            className="px-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow rounded-lg h-[46px] focus:outline-none"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formDetails.email}
                            onChange={handleFormChange}
                            className="px-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow rounded-lg h-[46px] focus:outline-none"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Phone Number *</label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={formDetails.phone}
                                onChange={handleFormChange}
                                className="pl-11 pr-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow rounded-lg h-[46px] focus:outline-none"
                            />
                            <div className="absolute top-[11px] start-3">
                                <img src={usaFlag} alt="" className="h-6"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">What is your style?</label>
                        <div className="relative">
                            <select
                                name="style"
                                value={formDetails.style}
                                onChange={handleFormChange}
                                className="px-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow bg-white rounded-lg h-[46px] focus:outline-none appearance-none text-[#476788] font-light text-sm"
                            >

                                <option value="">Select...</option>
                                <option value="Modern">Modern</option>
                                <option value="Classic">Classic</option>
                                <option value="Casual">Casual</option>
                            </select>
                            <div className="absolute top-[14px] end-3">
                                <GoChevronDown className="text-lg text-[#006BFF]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Payment Method *</label>
                        <div className="relative">
                            <select
                                name="payment"
                                value={formDetails.payment}
                                onChange={handleFormChange}
                                className="px-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow bg-white rounded-lg h-[46px] focus:outline-none appearance-none text-[#476788] font-light text-sm"
                            >

                                <option value="">Select...</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Cash">Cash</option>
                            </select>
                            <div className="absolute top-[14px] end-3">
                                <GoChevronDown className="text-lg text-[#006BFF]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Previous Repo? *</label>
                        <div className="relative">
                            <select
                                name="repo"
                                value={formDetails.repo}
                                onChange={handleFormChange}
                                className="px-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow bg-white rounded-lg h-[46px] focus:outline-none appearance-none text-[#476788] font-light text-sm"
                            >

                                <option value="">Select...</option>
                                <option value="Repo1">Repo1</option>
                                <option value="Repo2">Repo2</option>
                                <option value="Repo3">Repo3</option>
                            </select>
                            <div className="absolute top-[14px] end-3">
                                <GoChevronDown className="text-lg text-[#006BFF]"/>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-[#0A2540]">Additional Notes</label>
                        <textarea
                            name="notes"
                            value={formDetails.notes}
                            onChange={handleFormChange}
                            rows={3}
                            className="p-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow rounded-lg focus:outline-none resize-none"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-[#0A2540]">Send text messages to</label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="smsNumber"
                                value={formDetails.smsNumber}
                                onChange={handleFormChange}
                                className="pl-11 pr-2 w-full border border-[#A6BBD1] focus:border-[#006bff] focus:shadow-focusInputShadow rounded-lg h-[46px] focus:outline-none"
                            />
                            <div className="absolute top-[11px] start-3">
                                <img src={usaFlag} alt="" className="h-6"/>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs leading-5 text-[#1A1A1A9C] mb-3">
                        By entering your phone number, you consent to receive
                        messages for this event via SMS. Message and data rates may
                        apply. Reply STOP to opt out.
                    </div>
                    <div className="text-xs text-[#0A2540] leading-5">
                        By proceeding, you confirm that you have read and agree to<br/>
                        <Link to="#" className="inline-block text-[#004EBA] font-semibold">Calendly's Terms of
                            Use</Link> and <Link to="#" className="inline-block text-[#004EBA] font-semibold">Privacy
                        Notice.</Link>
                    </div>
                    <div className="my-4 pb-10 lg:pb-0">
                        <button
                            onClick={handleSubmit}
                            className="text-white font-bold bg-[#006BFF] rounded-full py-3 px-4 text-sm md:text-base w-full md:w-fit"
                        >
                            Schedule Event
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleInformation;