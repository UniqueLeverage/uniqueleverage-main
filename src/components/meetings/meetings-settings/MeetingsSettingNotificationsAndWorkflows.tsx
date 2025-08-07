import {FaRegBell} from "react-icons/fa";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null
}

const MeetingsSettingNotificationsAndWorkflows = ({type, activeSection}: MeetingsSettingDurationProps) => {
    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Notifications and workflows
                </div>
                <div className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'notifications-and-workflows' ? 'hidden' : ''}`}>
                    <FaRegBell size="15" className="inline me-1.5"/> Calendar invitations + 3
                    workflows
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents">
                MeetingsSettingNotificationsAndWorkflows content
            </div>
        ) : null
    );
};

export default MeetingsSettingNotificationsAndWorkflows;