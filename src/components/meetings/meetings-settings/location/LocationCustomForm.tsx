import {useEffect, useState} from "react";

const LocationCustomForm = () => {
    const [customLocation, setCustomLocation] = useState<string>("");
    const [displayOption, setDisplayOption] = useState("onBookingPage");

    const [error, setError] = useState<string | null>();

    const handleDisplayOptionChange = (value: "onBookingPage" | "onlyAfterBookingConfirmation") => {
        setDisplayOption(value);
    };

    useEffect(() => {
        if (customLocation.trim()) {
            setError('');
        } else {
            setError('Custom location is required.')
        }
    }, [customLocation]);

    console.log('customLocation', customLocation)
    return (
        <div className="mt-3 mb-4 border-l border-l-mainStroke pl-4 pb-1 text-sm">
            <div className="font-bold text-mainBlack mb-2">
                Custom location
            </div>
            <input type="text"
                   className={`w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:outline-none ${error ? 'border-[#b31f1fcc] focus:ring-[#b31f1fcc]' : 'focus:ring-mainBlue'}`}
                   onChange={(e) => setCustomLocation(e.target.value)}
            />
            <div className="text-xs text-[#b03200] font-light mt-1">
                {error}
            </div>
            <div className="font-bold text-mainBlack mb-2 mt-3">
                Where should the location be displayed?
            </div>
            <div className="flex flex-col font-light">
                <label className="inline-flex items-center cursor-pointer mb-3">
                    <input
                        type="radio"
                        className="sr-only"
                        name="displayOption"
                        checked={displayOption === "onBookingPage"}
                        onChange={() => handleDisplayOptionChange("onBookingPage")}
                    />
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${displayOption === "onBookingPage" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                    <span className="text-mainBlack">On booking page</span>
                </label>
                <label className="inline-flex items-center cursor-pointer mb-3">
                    <input
                        type="radio"
                        className="sr-only"
                        name="displayOption"
                        checked={displayOption === "onlyAfterBookingConfirmation"}
                        onChange={() =>
                            handleDisplayOptionChange("onlyAfterBookingConfirmation")
                        }
                    />
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${displayOption === "onlyAfterBookingConfirmation" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                    <span className="text-mainBlack">
                        Only after booking confirmation
                    </span>
                </label>
            </div>
        </div>
    );
};

export default LocationCustomForm;