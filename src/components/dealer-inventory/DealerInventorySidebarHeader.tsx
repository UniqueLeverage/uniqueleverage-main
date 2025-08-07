import companyLogo from "../../assets/dfa_logo_landscape.png";
import {LuCalendarDays} from "react-icons/lu";
import {FiSearch} from "react-icons/fi";
import React from "react";

interface DealerInventorySidebarHeaderProps {
    searchQuery: string,
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DealerInventorySidebarHeader = ({handleSearchInputChange, searchQuery}: DealerInventorySidebarHeaderProps) => {
    return (
        <div>
            <div className="md:hidden">
                <div className="flex items-center justify-between px-5 mb-4 h-[76px] shadow-dropBottomCustom">
                    <div>
                        <img src={companyLogo} alt="" height="36" className="w-full"/>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-2">
                            <LuCalendarDays
                                className="cursor-pointer text-mainBlue"
                                size="30"
                            />
                        </div>
                        <div className="border border-[#BEC0C342] bg-[#F5F6F8] p-1 rounded-full">
                            <FiSearch color="#82868C" size="24"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <img src={companyLogo} alt="" height="36" className="w-full"/>
                    </div>
                    <div>
                        <LuCalendarDays
                            className="cursor-pointer text-mainBlue"
                            size="21"
                        />
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <FiSearch color="#82868C" size="20"/>
                    </div>
                    <input
                        type="text"
                        className="form-input pl-10 p-4 border border-[#BEC0C342] placeholder-[#82868C] text-sm font-light w-full focus:outline-none bg-[#F8F9F9] h-[48px] rounded-3xl"
                        placeholder="Search inventory"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onInput={handleSearchInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DealerInventorySidebarHeader;