import {VscSettings} from "react-icons/vsc";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null
}

const MeetingsSettingBookingPageOptions = ({type, activeSection}: MeetingsSettingDurationProps) => {
    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Booking page options
                </div>
                <div className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'booking-page-options' ? 'hidden' : ''}`}>
                    <VscSettings size="15" className="inline me-1.5"/> /scheduler <span
                    className="h-1 w-1 rounded-full bg-[#1A1A1A9C] mx-1"></span> 30 min
                    increments <span
                    className="h-1 w-1 rounded-full bg-[#1A1A1A9C] mx-1"></span> auto time zone
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents">
                MeetingsSettingBookingPageOptions content
            </div>
        ) : null
    );
};

export default MeetingsSettingBookingPageOptions;