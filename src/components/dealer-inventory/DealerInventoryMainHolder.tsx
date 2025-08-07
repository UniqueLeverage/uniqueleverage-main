import React, {useEffect, useState} from "react";
import {
    DealerInventorySidebar,
    DealerInventorySidebarHeader,
    DealerInventoryVehiclesList,
    VehicleStatusChanger
} from "../index.tsx";
import {GiSettingsKnobs} from "react-icons/gi";
import {TbMobiledata} from "react-icons/tb";
import {publicDealerService} from "../../_services";

interface Make {
    name: string;
    models: { name: string; bodyStyles: string[] }[];
}

interface MainFiltersData {
    make: Make[];
}

interface DealerInventoryMainHolderProps {
    dealer_id: number,
    dealer_name_www: string
}

const DealerInventoryMainHolder = ({dealer_id, dealer_name_www}: DealerInventoryMainHolderProps) => {
    const [mainStatus, setMainStatus] = useState("Used");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterParams, setFilterParams] = useState({
        dealer_id: dealer_id,
        minPrice: '',
        maxPrice: '',
        make: '',
        minYear: '',
        maxYear: '',
        model: '',
        minMileage: '',
        maxMileage: '',
        bodyStyle: '',
    })

    const [mainFiltersData, setMainFiltersData] = useState<MainFiltersData>({
        make: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await publicDealerService.getFiltersData(dealer_id);
                setMainFiltersData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dealer_id]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const selectMainStatus = (status: string) => {
        setMainStatus(status);
    };

    return (
        <div
            className="md:h-[700px] md:pr-[5%] md:pl-[5%] md:mt-[66px] md:mb-[30px] flex justify-center transition-all duration-150 ease-in-out">
            <div
                className="md:flex flex-auto md:min-w-[600px] md:w-[95%] lg:min-w-[900px] md:max-w-[1060px] bg-white md:shadow-dropCustom md:rounded-lg md:border border-[#1a1a1a1a] transition-all duration-150 ease-in-out">
                <div className="hidden md:block md:w-1/3">
                    <DealerInventorySidebar
                        searchQuery={searchQuery}
                        handleSearchInputChange={handleSearchInputChange}
                        filterParams={filterParams}
                        setFilterParams={setFilterParams}
                        mainFiltersData={mainFiltersData}
                    />
                </div>
                <div className="md:hidden">
                    <DealerInventorySidebarHeader
                        searchQuery={searchQuery}
                        handleSearchInputChange={handleSearchInputChange}/>
                </div>
                <div className="md:w-2/3 overflow-y-auto no-scrollbar">
                    <VehicleStatusChanger
                        currentStatus={mainStatus}
                        setMainStatus={selectMainStatus}
                    />
                    <div className="flex items-center justify-between md:hidden w-[90%] mx-auto mb-5">
                        {/*<div className="text-mainBlue mb-2 flex items-center justify-center">*/}
                        {/*    <CiLocationOn size="17" className="text-mainBlue"/>*/}
                        {/*    <span className="ml-1">Delaware, 10299</span>*/}
                        {/*</div>*/}
                        <div className="flex items-center">
                            <div className="border border-[#CACCCE] rounded-lg p-2 mr-2.5">
                                <GiSettingsKnobs color="#33363A" size="24"/>
                            </div>
                            <div className="border border-[#CACCCE] rounded-lg p-2">
                                <TbMobiledata color="#33363A" size="24"/>
                            </div>
                        </div>
                    </div>
                    <DealerInventoryVehiclesList
                        searchQuery={searchQuery}
                        mainStatus={mainStatus}
                        filterParams={filterParams}
                        dealer_name_www={dealer_name_www}
                    />
                </div>
            </div>
        </div>
    );
};

export default DealerInventoryMainHolder;