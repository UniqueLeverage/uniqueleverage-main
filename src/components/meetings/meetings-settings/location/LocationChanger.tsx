import React, {useEffect, useState} from "react";
import zoomLogo from "../../../../assets/zoom.svg"
import googleMeetLogo from "../../../../assets/google_meet.svg"
import microsoftTeamsLogo from "../../../../assets/microsoft_teams.svg"
import webexLogo from "../../../../assets/webex.svg"
import goToMeetingLogo from "../../../../assets/goto_meeting.svg"
import {LuMapPin, LuPhone} from "react-icons/lu";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import {TbMessagePin, TbPlus} from "react-icons/tb";
import {CgRename} from "react-icons/cg";
import {IoCloseOutline} from "react-icons/io5";
import {
    LocationZoomForm,
    LocationPhoneCallForm,
    LocationInPersonForm,
    LocationGoogleMeetForm,
    LocationMicrosoftTeamsForm,
    LocationWebexForm,
    LocationCustomForm,
    LocationAskInviteeForm,
    LocationGoToMeetingForm
} from "../../../";

interface LocationChangerProps {
    meetingsSettingsLocationData: string[],
    setMeetingsSettingLocationData: (value: (((prevState: string[]) => string[]) | string[])) => void
}

const LOCATION_OPTIONS = [
    {label: "Zoom", value: "zoom", unique: true},
    {label: "Phone call", value: "phone_call", unique: true},
    {label: "In-person", value: "in_person", unique: false},
    {label: "Google Meet", value: "google_meet", unique: true},
    {label: "Microsoft Teams", value: "microsoft_teams", unique: true},
    {label: "Webex", value: "webex", unique: true},
    {label: "Custom", value: "custom", unique: false},
    {label: "Ask invitee", value: "ask_invitee", unique: true},
    {label: "GoTo Meeting", value: "goto_meeting", unique: true}
];
const MOST_POPULAR_VALUES = ["zoom", "phone_call", "in_person"];
const isMostPopular = (value: string) => MOST_POPULAR_VALUES.includes(value);

function LocationForm({location}: { location: string }) {
    switch (location) {
        case "zoom":
            return <LocationZoomForm/>;
        case "phone_call":
            return <LocationPhoneCallForm/>;
        case "in_person":
            return <LocationInPersonForm/>;
        case "google_meet":
            return <LocationGoogleMeetForm/>;
        case "microsoft_teams":
            return <LocationMicrosoftTeamsForm/>;
        case "webex":
            return <LocationWebexForm/>;
        case "custom":
            return <LocationCustomForm/>;
        case "ask_invitee":
            return <LocationAskInviteeForm/>;
        case "goto_meeting":
            return <LocationGoToMeetingForm/>;
        default:
            return null;
    }
}

const iconMap: Record<string, React.ReactNode> = {
    zoom: <img src={zoomLogo} alt="Zoom" className="w-full h-full mr-2"/>,
    phone_call: <LuPhone className="text-[#0a2540] w-4 h-4 mr-2"/>,
    in_person: <LuMapPin className="text-[#0a2540] w-4 h-4 mr-2"/>,
    google_meet: <img src={googleMeetLogo} alt="Google meet" className="w-full h-full mr-2"/>,
    microsoft_teams: <img src={microsoftTeamsLogo} alt="Microsoft teams" className="w-full h-full mr-2"/>,
    webex: <img src={webexLogo} alt="Webex" className="w-full h-full mr-2"/>,
    custom: <CgRename className="text-[#0a2540] w-4 h-4 mr-2"/>,
    ask_invitee: <TbMessagePin className="text-[#0a2540] w-4 h-4 mr-2"/>,
    goto_meeting: <img src={goToMeetingLogo} alt="Goto meeting" className="w-full h-full mr-2"/>,
};

const LocationChanger = ({meetingsSettingsLocationData, setMeetingsSettingLocationData}: LocationChangerProps) => {
    const [selectedLocations, setSelectedLocations] = useState<string[]>(meetingsSettingsLocationData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const [showSelectButton, setShowSelectButton] = useState(meetingsSettingsLocationData.length === 0);

    useEffect(() => {
        setMeetingsSettingLocationData(selectedLocations);
    }, [selectedLocations, setMeetingsSettingLocationData]);

    useEffect(() => {
        if (selectedLocations.length === 0) {
            setShowSelectButton(true);
            setIsDropdownOpen(true);
        }
    }, [selectedLocations]);

    const usedSingleOptions = new Set(
        selectedLocations.filter((loc) => {
            const def = LOCATION_OPTIONS.find((opt) => opt.value === loc);
            return def && def.unique;
        })
    );

    const dropdownOptions = LOCATION_OPTIONS.filter((opt) => {
        return !(opt.unique && usedSingleOptions.has(opt.value));
    });

    const handleSelectLocation = (locationValue: string) => {
        if (selectedLocations.length >= 10) {
            alert("You have reached the maximum of 10 locations.");
            return;
        }
        setSelectedLocations((prev) => [...prev, locationValue]);
        setIsDropdownOpen(false);
        setShowSelectButton(false);
    };

    const handleRemoveLocation = (locationValue: string) => {
        setSelectedLocations((prev) => prev.filter((loc) => loc !== locationValue));
    };

    const handleAddAnotherLocation = () => {
        setShowSelectButton(true);
        setIsDropdownOpen(true);
    };


    return (
        <div className="content-holder contents">
            {selectedLocations.map((loc, index) => (
                <div
                    key={`${loc}-${index}`}
                    className="contents"
                >
                    <div
                        className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center">
                        <div className="flex items-center font-light text-sm">
                            <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                {(() => {
                                    const foundOption = LOCATION_OPTIONS.find((o) => o.value === loc);
                                    // If foundOption is undefined, we return null; else we return iconMap
                                    if (!foundOption) {
                                        return null;
                                    }
                                    return iconMap[foundOption.value] ?? null;
                                })()}                            </div>
                            {LOCATION_OPTIONS.find((o) => o.value === loc)?.label}
                        </div>
                        <IoCloseOutline size="20"
                                        className="text-darkGray cursor-pointer"
                                        onClick={() => handleRemoveLocation(loc)}
                        />
                    </div>
                    <LocationForm location={loc}/>
                </div>
            ))}

            {showSelectButton && selectedLocations.length < 10 ? (
                <div className="relative text-sm">
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-left border rounded-md focus:ring-2 focus:ring-mainBlue focus:outline-none flex justify-between items-center"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        Select location
                        {isDropdownOpen ? (
                            <FaAngleUp size={16} className="text-gray-500"/>
                        ) : (
                            <FaAngleDown size={16} className="text-gray-500"/>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div
                            className="absolute left-0 right-0 bg-white border border-[#BEC0C342] rounded-md shadow-lg mt-1 py-2 z-10">
                            <div className="text-xs font-bold text-darkGray px-4 mb-1">
                                MOST POPULAR
                            </div>
                            {dropdownOptions
                                .filter((opt) => isMostPopular(opt.value))
                                .map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelectLocation(option.value)}
                                        className="flex items-center px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer font-light"
                                    >
                                        <div className="w-4 h-4 mr-2">
                                            {iconMap[option.value] ?? null}
                                        </div>
                                        {option.label}
                                    </div>
                                ))}

                            <div className="text-xs font-bold text-darkGray px-4 mt-2 mb-1">
                                OTHER OPTIONS
                            </div>
                            {dropdownOptions
                                .filter((opt) => !isMostPopular(opt.value))
                                .map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelectLocation(option.value)}
                                        className="flex items-center px-4 py-2 hover:bg-[#e6f0ff] cursor-pointer font-light"
                                    >
                                        <div className="w-4 h-4 mr-2">
                                            {iconMap[option.value] ?? null}
                                        </div>
                                        {option.label}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            ) : (
                !showSelectButton &&
                selectedLocations.length < 10 && (
                    <div className="bg-[#fafafa] py-3 px-4 rounded-lg">
                        {selectedLocations.length < 2 && (
                            <div className="mb-3 text-xs font-light text-mainBlack">
                                Let your invitee choose from multiple meeting locations.
                            </div>
                        )}
                        <div
                            className="text-sm font-light text-mainBlue flex items-center cursor-pointer hover:text-[#00347b]"
                            onClick={handleAddAnotherLocation}
                        >
                            <TbPlus size="15" className="inline me-1"/> Add location
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default LocationChanger;