import {PiCheckSquareOffsetBold} from "react-icons/pi";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null
}

const MeetingsSettingConfirmationPage = ({type, activeSection}: MeetingsSettingDurationProps) => {
    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Confirmation page
                </div>
                <div className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'confirmation-page' ? 'hidden' : ''}`}>
                    <PiCheckSquareOffsetBold size="15" className="inline me-1.5"/> Redirect to an
                    external site
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents">
                MeetingsSettingConfirmationPage content
            </div>
        ) : null
    );
};

export default MeetingsSettingConfirmationPage;