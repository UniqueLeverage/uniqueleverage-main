import {GrSort} from "react-icons/gr";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null
}

const MeetingsSettingInviteeForm = ({type, activeSection}: MeetingsSettingDurationProps) => {
    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Invitee form
                </div>
                <div className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'invitee-form' ? 'hidden' : ''}`}>
                    <GrSort size="15" className="inline me-1.5"/> Asking for first name, last name,
                    email, +4 questions
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents">
                MeetingsSettingInviteeForm content
            </div>
        ) : null
    );
};

export default MeetingsSettingInviteeForm;