import {LocationChanger, LocationHeader} from "../../";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null,
    meetingsSettingsLocationData: string[],
    setMeetingsSettingLocationData: (value: (((prevState: string[]) => string[]) | string[])) => void
}

const MeetingsSettingLocation = ({
                                     type,
                                     activeSection,
                                     meetingsSettingsLocationData,
                                     setMeetingsSettingLocationData
                                 }: MeetingsSettingDurationProps) => {
    return (
        type === "title" ? (
            <LocationHeader
                activeSection={activeSection}
                meetingsSettingsLocationData={meetingsSettingsLocationData}
            />
        ) : type === "content" ? (
            <LocationChanger
                meetingsSettingsLocationData={meetingsSettingsLocationData}
                setMeetingsSettingLocationData={setMeetingsSettingLocationData}
            />
        ) : null
    );
};

export default MeetingsSettingLocation;