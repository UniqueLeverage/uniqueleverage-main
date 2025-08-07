import {useState} from "react";

import mainLogo from "../assets/logoLandscape.png";
import googleIcon from "../assets/google_icon.png";
import microsoftIcon from "../assets/microsoft_icon.png";
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";

const Login = () => {
    const [userEmail, setUserEmail] = useState<string>("")

    return (
        <div className="login-page-container grid grid-cols-12 overflow-hidden min-h-screen">
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col">
                <div className="flex-grow p-12 xl:p-20 sm:pt-32">
                    <div className="mb-10 xl:mb-14">
                        <img src={mainLogo} alt=""/>
                    </div>
                    <div className="text-[#0B3558] text-4xl font-bold mb-2">
                        Login
                    </div>
                    <div className="text-[#476788] font-light">
                        Welcome back!
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            className="form-input px-4 py-2 rounded-md border border-[#E7EDF6] placeholder-[#839099] text-sm font-light w-full focus:outline-none h-12 placeholder:text-[#A6BBD1]"
                            placeholder="Enter your email"
                            name="email"
                            id="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full text-white bg-[#006BFF] py-3 rounded-lg hover:bg-[#044eb6] duration-300 font-medium"
                            type="button">
                            Continue
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-[#E5E5E5] my-8 relative">
                        <div
                            className="bg-white absolute start-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 text-[#476788] text-xs font-light">
                            OR
                        </div>
                    </div>
                    <div className="mb-3">
                        <button
                            className="border border-[#476788] text-[#476788] font-medium flex items-center justify-center w-full rounded-lg py-3 duration-300 hover:bg-[#f8f9fb]"
                            type="button">
                            <img src={googleIcon} alt="" className="w-6 mr-3"/> Continue with Google
                        </button>
                    </div>
                    <div className="mb-6">
                        <button
                            className="border border-[#476788] text-[#476788] font-medium flex items-center justify-center w-full rounded-lg py-3 duration-300 hover:bg-[#f8f9fb]"
                            type="button">
                            <img src={microsoftIcon} alt="" className="w-6 mr-3"/> Continue with Microsoft
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center font-medium text-[#476788] justify-center">
                        Don't have an account? <Link to="/register"
                                                     className="flex items-center ml-1 text-[#006BFF]"> Sign up for
                        free <FaArrowRightLong size="16" className="ml-2"/> </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block md:col-span-7 xl:col-span-8">
                <div className="main-auth-gradient w-full h-full relative">
                    <div className="relative row-span-2 pt-32">
                        <div className="p-4 bg-[#e4e4e42e] mx-auto rounded-xl h-[433px] w-[666px] max-w-full">
                            {/*<img*/}
                            {/*    src={presentationImg}*/}
                            {/*    alt=""*/}
                            {/*    className="mx-auto object-contain h-[433px] w-[666px] rounded-md border-0"/>*/}
                        </div>
                    </div>
                    <div className="text-center text-white flex flex-col justify-center mt-16">
                        <div className="text-sm mb-5 text-[#9AA3B2] leading-[2px] font-light">
                            AUTOMOTIVE SCHEDULING
                        </div>
                        <div className="font-semibold mb-2 text-[36px]">
                            Accurate Data
                        </div>
                        <div className="mt-4 text-[#9AA3B2] font-light">
                            Streamline your work-flow so you can focus on
                            <br/>
                            optimizing and scaling your ads profitably.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;