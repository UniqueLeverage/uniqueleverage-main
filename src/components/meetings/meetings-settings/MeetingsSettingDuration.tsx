import {DurationChanger, DurationHeader} from "../../";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null,
    meetingsSettingsDurationData: string,
    setMeetingsSettingDurationData: (value: (((prevState: string) => string) | string)) => void
}

const MeetingsSettingDuration = ({
                                     type,
                                     activeSection,
                                     meetingsSettingsDurationData,
                                     setMeetingsSettingDurationData
                                 }: MeetingsSettingDurationProps) => {

    return (
        type === "title" ? (
            <DurationHeader
                activeSection={activeSection}
                meetingsSettingsDurationData={meetingsSettingsDurationData}
            />
        ) : type === "content" ? (
            <DurationChanger
                meetingsSettingsDurationData={meetingsSettingsDurationData}
                setMeetingsSettingDurationData={setMeetingsSettingDurationData}
            />
        ) : null
    );
};

export default MeetingsSettingDuration;