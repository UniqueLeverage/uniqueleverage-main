import {useState} from "react";

import mainLogo from "../assets/logoLandscape.png";
import googleIcon from "../assets/google_icon.png";
import microsoftIcon from "../assets/microsoft_icon.png";
import {Link} from "react-router-dom";

const Register = () => {
    const [userEmail, setUserEmail] = useState<string>("")

    return (
        <div className="register-page-container grid grid-cols-12 overflow-hidden min-h-screen">
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col">
                <div className="flex-grow p-12 xl:p-20 sm:pt-32">
                    <div className="mb-10 xl:mb-14">
                        <img src={mainLogo} alt=""/>
                    </div>
                    <div className="text-[#0B3558] text-4xl font-bold mb-2">
                        Sign up for your account
                    </div>
                    <div className="text-[#476788] font-light">
                        Always free! No credit card required.
                    </div>
                    <div className="mt-6">
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
                            Sign up
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-[#E5E5E5] mt-8 relative">
                        <div
                            className="bg-white absolute start-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 text-[#476788] text-xs font-light">
                            OR
                        </div>
                    </div>
                    <div className="text-xs text-[#476788] my-5">
                        Easily connect your calendar by signing up with your Google, Microsoft Office 365, or Outlook
                        account.
                    </div>
                    <div className="mb-3">
                        <button
                            className="bg-[#006BFF] text-white font-medium flex items-center justify-center w-full rounded-lg py-2 duration-300 hover:bg-[#004eba]"
                            type="button">
                            <div className="bg-white flex justify-center items-center p-2 rounded-md mr-3">
                                <img src={googleIcon} alt="" className="w-5"/>
                            </div>
                            Sign up with Google
                        </button>
                    </div>
                    <div className="mb-6">
                        <button
                            className="bg-[#0B3558] text-white font-medium flex items-center justify-center w-full rounded-lg py-2 duration-300 hover:bg-[#476788]"
                            type="button">
                            <div className="bg-white flex justify-center items-center p-2 rounded-md mr-3">
                                <img src={microsoftIcon} alt="" className="w-5"/>
                            </div>
                            Sign up with Microsoft
                        </button>
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="text-[#006BFF] font-semibold">
                            Log In
                        </Link>
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

export default Register;