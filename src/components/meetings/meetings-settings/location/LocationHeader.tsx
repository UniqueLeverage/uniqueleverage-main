import {LuPen} from "react-icons/lu";
import {PiWarningCircleFill} from "react-icons/pi";

interface LocationHeaderProps {
    meetingsSettingsLocationData: string[],
    activeSection: string | null
}

const LocationHeader = ({meetingsSettingsLocationData, activeSection}: LocationHeaderProps) => {
    return (
        <div className="title-holder">
            <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                Location
            </div>
            <div
                className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'location' ? 'hidden' : ''}`}>
                {meetingsSettingsLocationData.length > 0 ? (
                    <div>
                        <LuPen size="15" className="inline me-1.5"/> https://uniqueleverage.com/nathan
                    </div>
                ) : (
                    <div className="bg-[#f2f8ff] flex items-start text-[#1a1a1a] py-2 px-3 rounded-lg">
                        <div className="flex items-center font-bold me-2">
                            <PiWarningCircleFill size="20" className="inline me-1.5"/> Tip:
                        </div>
                        <div className="pr-1 text-left">
                            Meetings with locations are more likely to start on time!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationHeader;