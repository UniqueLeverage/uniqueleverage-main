import React, {useState, useEffect, useRef} from "react";
import {DealerInventorySidebarHeader} from "../index.tsx";

interface Make {
    name: string;
    models: Model[];
}

interface Model {
    name: string;
    bodyStyles: string[];
}

interface MainFiltersData {
    make: Make[];
}

interface DealerInventorySidebarProps {
    searchQuery: string,
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    filterParams: {
        minYear: string;
        maxYear: string;
        minPrice: string;
        dealer_id: number;
        maxMileage: string;
        bodyStyle: string;
        model: string;
        maxPrice: string;
        make: string;
        minMileage: string
    },
    setFilterParams: (params: any) => void,
    mainFiltersData: MainFiltersData
}

const DealerInventorySidebar = ({
                                    searchQuery,
                                    handleSearchInputChange,
                                    filterParams,
                                    setFilterParams,
                                    mainFiltersData,
                                }: DealerInventorySidebarProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [makesFilterData, setMakesFilterData] = useState<string[]>([]);
    const [modelsFilterData, setModelsFilterData] = useState<string[]>([]);
    const [bodyStylesFilterData, setBodyStylesFilterData] = useState<string[]>([]);

    useEffect(() => {
        if (mainFiltersData.make && mainFiltersData.make.length > 0) {
            const makes = mainFiltersData.make.map((make) => make.name);
            setMakesFilterData(makes);
        }
    }, [mainFiltersData]);

    useEffect(() => {
        if (filterParams.make) {
            const selectedMake = mainFiltersData.make.find((make) => make.name === filterParams.make);
            if (selectedMake) {
                const models = selectedMake.models.map((model) => model.name);
                setModelsFilterData(models);
                setBodyStylesFilterData([]);
            }
        } else {
            setModelsFilterData([]);
            setBodyStylesFilterData([]);
        }
    }, [filterParams.make, mainFiltersData]);

    useEffect(() => {
        if (filterParams.model) {
            const selectedMake = mainFiltersData.make.find((make) => make.name === filterParams.make);
            if (selectedMake) {
                const selectedModel = selectedMake.models.find((model) => model.name === filterParams.model);
                if (selectedModel) {
                    setBodyStylesFilterData(selectedModel.bodyStyles);
                }
            }
        } else {
            setBodyStylesFilterData([]);
        }
    }, [filterParams.model, filterParams.make, mainFiltersData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownState({
                    make: false,
                    model: false,
                    bodyStyle: false,
                });
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const updateFilterParam = (key: string, value: string) => {
        if (key === "make") {
            setFilterParams({ ...filterParams, make: value, model: "", bodyStyle: "" });
        } else if (key === "model") {
            setFilterParams({ ...filterParams, model: value, bodyStyle: "" });
        } else {
            setFilterParams({ ...filterParams, [key]: value });
        }
    };

    const [dropdownState, setDropdownState] = useState<Record<string, boolean>>({
        make: false,
        model: false,
        bodyStyle: false,
    });

    const toggleDropdown = (key: string) => {
        setDropdownState((prevState) => ({
            make: false,
            model: false,
            bodyStyle: false,
            [key]: !prevState[key],
        }));
    };

    const selectOption = (key: string, value: string, defaultValue: string) => {
        updateFilterParam(key, value === defaultValue ? "" : value);
        toggleDropdown(key);
    };

    return (
        <div className="p-4 pb-6 border-r border-[#1a1a1a1a] rounded-l-xl h-full overflow-y-auto no-scrollbar" ref={dropdownRef}>
            <DealerInventorySidebarHeader
                searchQuery={searchQuery}
                handleSearchInputChange={handleSearchInputChange}/>
            <div className="border-b border-[#E7E9EA] mt-3 mb-4"/>
            <div className="price-filter-holder mb-3">
                <label className="block font-semibold text-sm mb-1 text-mainDarkBlack">Price</label>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder="Min"
                        onChange={(e) => updateFilterParam("minPrice", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                    <span className="px-2 font-bold">
                            -
                        </span>
                    <input
                        type="number"
                        placeholder="Max"
                        onChange={(e) => updateFilterParam("maxPrice", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                </div>
            </div>
            <div className="relative inline-block w-full mb-3">
                <div
                    onClick={() => toggleDropdown("make")}
                    className="flex justify-between items-center cursor-pointer text-sm font-semibold text-mainDarkBlack"
                >
                    <span>{filterParams.make || "Make"}</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                            dropdownState.make ? "rotate-180" : "rotate-0"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
                {dropdownState.make && (
                    <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10 max-h-[400px] overflow-auto">
                        {makesFilterData.map(
                            (make, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectOption("make", make, "Make")}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {make}
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
            <div className="year-filter-holder mb-3">
                <label className="block font-semibold text-sm mb-1 text-mainDarkBlack">Year</label>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder="Min"
                        onChange={(e) => updateFilterParam("minYear", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                    <span className="px-2 font-bold">
                            -
                        </span>
                    <input
                        type="number"
                        placeholder="Max"
                        onChange={(e) => updateFilterParam("maxYear", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                </div>
            </div>
            <div className="relative inline-block w-full mb-3">
                <div
                    onClick={() => toggleDropdown("model")}
                    className="flex justify-between items-center cursor-pointer text-sm font-semibold text-mainDarkBlack"
                >
                    <span>{filterParams.model || "Model"}</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                            dropdownState.model ? "rotate-180" : "rotate-0"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
                {dropdownState.model && (
                    <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10 max-h-[400px] overflow-auto">
                        {modelsFilterData.map(
                            (model, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectOption("model", model, "Model")}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {model}
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
            <div className="mileage-filter-holder mb-3">
                <label className="block font-semibold text-sm mb-1 text-mainDarkBlack">Mileage</label>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder="Min"
                        onChange={(e) => updateFilterParam("minMileage", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                    <span className="px-2 font-bold">
                            -
                        </span>
                    <input
                        type="number"
                        placeholder="Max"
                        onChange={(e) => updateFilterParam("maxMileage", e.target.value)}
                        className="w-1/2 border border-[#BEC0C342] rounded-xl px-3 placeholder-[#82868C] text-sm font-light focus:outline-none bg-[#F8F9F9] h-[40px] hide-number-arrows"
                    />
                </div>
            </div>
            <div className="relative inline-block w-full mb-3">
                <div
                    onClick={() => toggleDropdown("bodyStyle")}
                    className="flex justify-between items-center cursor-pointer text-sm font-semibold text-mainDarkBlack"
                >
                    <span>{filterParams.bodyStyle || "Body style"}</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                            dropdownState.bodyStyle ? "rotate-180" : "rotate-0"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
                {dropdownState.bodyStyle && (
                    <ul className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10 max-h-[400px] overflow-auto">
                        {bodyStylesFilterData.map((bodyStyle, index) => (
                            <li
                                key={index}
                                onClick={() => selectOption("bodyStyle", bodyStyle, "Body style")}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {bodyStyle}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DealerInventorySidebar;