import {
    MeetingsSettingAvailability,
    MeetingsSettingBookingPageOptions,
    MeetingsSettingConfirmationPage,
    MeetingsSettingDuration,
    MeetingsSettingFreeBusyRules,
    MeetingsSettingInviteeForm,
    MeetingsSettingLimitsAndBuffers,
    MeetingsSettingLocation,
    MeetingsSettingNotificationsAndWorkflows
} from "../index.tsx";

import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import {useEffect, useState} from "react";

interface MeetingsSettingsContentProps {
    isCanvasOpen: boolean
}

interface TimeSlot {
    start: string;
    end: string;
}

interface DayAvailability {
    name: string;
    label: string;
    unavailable: boolean;
    slots: TimeSlot[];
}

const MeetingsSettingsContent = ({isCanvasOpen}: MeetingsSettingsContentProps) => {
    const [activeSection, setActiveSection] = useState<string | null>('free-busy-rules');

    useEffect(() => {
        if (!isCanvasOpen) {
            setActiveSection(null);
        }
    }, [isCanvasOpen])
    const toggleSection = (sectionId: string) => {
        setActiveSection((prev) => (prev === sectionId ? null : sectionId));
    };

    const [meetingsSettingsDurationData, setMeetingsSettingDurationData] = useState<string>('15 min');
    const [meetingsSettingsLocationData, setMeetingsSettingLocationData] = useState<string[]>([]);
    const [weeklyAvailability, setWeeklyAvailability] = useState<DayAvailability[]>([
        {name: "Sunday", label: "S", unavailable: true, slots: []},
        {name: "Monday", label: "M", unavailable: false, slots: [{start: "09:00", end: "17:00"}],},
        {name: "Tuesday", label: "T", unavailable: false, slots: [{start: "09:00", end: "17:00"}],},
        {name: "Wednesday", label: "W", unavailable: false, slots: [{start: "09:00", end: "17:00"}],},
        {name: "Thursday", label: "T", unavailable: false, slots: [{start: "09:00", end: "17:00"}],},
        {name: "Friday", label: "F", unavailable: false, slots: [{start: "09:00", end: "17:00"}],},
        {name: "Saturday", label: "S", unavailable: true, slots: []},
    ]);
    const [meetingsSettingsLimitsBuffersData, setMeetingsSettingLimitsBuffersData] = useState({
        beforeEvent: '0 min',
        afterEvent: '0 min',
        perDay: '',
        perWeek: '',
        perMonth: ''
    });

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar">
            {[
                {
                    id: "duration",
                    title: (
                        <MeetingsSettingDuration
                            type="title"
                            activeSection={activeSection}
                            meetingsSettingsDurationData={meetingsSettingsDurationData}
                            setMeetingsSettingDurationData={setMeetingsSettingDurationData}
                        />
                    ),
                    content: (
                        <MeetingsSettingDuration
                            type="content"
                            activeSection={activeSection}
                            meetingsSettingsDurationData={meetingsSettingsDurationData}
                            setMeetingsSettingDurationData={setMeetingsSettingDurationData}
                        />
                    ),
                },
                {
                    id: "location",
                    title: (
                        <MeetingsSettingLocation
                            type="title"
                            activeSection={activeSection}
                            meetingsSettingsLocationData={meetingsSettingsLocationData}
                            setMeetingsSettingLocationData={setMeetingsSettingLocationData}
                        />
                    ),
                    content: (
                        <MeetingsSettingLocation
                            type="content"
                            activeSection={activeSection}
                            meetingsSettingsLocationData={meetingsSettingsLocationData}
                            setMeetingsSettingLocationData={setMeetingsSettingLocationData}
                        />
                    ),
                },
                {
                    id: "availability",
                    title: (
                        <MeetingsSettingAvailability
                            type="title"
                            activeSection={activeSection}
                            weeklyAvailability={weeklyAvailability}
                            setWeeklyAvailability={setWeeklyAvailability}
                        />
                    ),
                    content: (
                        <MeetingsSettingAvailability
                            type="content"
                            activeSection={activeSection}
                            weeklyAvailability={weeklyAvailability}
                            setWeeklyAvailability={setWeeklyAvailability}
                        />
                    ),
                },
                {
                    id: "limits-and-buffers",
                    title: (
                        <MeetingsSettingLimitsAndBuffers
                            type="title"
                            activeSection={activeSection}
                            meetingsSettingsLimitsBuffersData={meetingsSettingsLimitsBuffersData}
                            setMeetingsSettingLimitsBuffersData={setMeetingsSettingLimitsBuffersData}
                        />
                    ),
                    content: (
                        <MeetingsSettingLimitsAndBuffers
                            type="content"
                            activeSection={activeSection}
                            meetingsSettingsLimitsBuffersData={meetingsSettingsLimitsBuffersData}
                            setMeetingsSettingLimitsBuffersData={setMeetingsSettingLimitsBuffersData}
                        />
                    ),
                },
                {
                    id: "free-busy-rules",
                    title: (
                        <MeetingsSettingFreeBusyRules
                            type="title"
                            activeSection={activeSection}
                        />
                    ),
                    content: (
                        <MeetingsSettingFreeBusyRules
                            type="content"
                            activeSection={activeSection}
                        />
                    ),
                },
                {
                    id: "booking-page-options",
                    title: (
                        <MeetingsSettingBookingPageOptions
                            type="title"
                            activeSection={activeSection}
                        />
                    ),
                    content: (
                        <MeetingsSettingBookingPageOptions
                            type="content"
                            activeSection={activeSection}
                        />
                    ),
                },
                {
                    id: "invitee-form",
                    title: (
                        <MeetingsSettingInviteeForm
                            type="title"
                            activeSection={activeSection}
                        />
                    ),
                    content: (
                        <MeetingsSettingInviteeForm
                            type="content"
                            activeSection={activeSection}
                        />
                    ),
                },
                {
                    id: "notifications-and-workflows",
                    title: (
                        <MeetingsSettingNotificationsAndWorkflows
                            type="title"
                            activeSection={activeSection}
                        />
                    ),
                    content: (
                        <MeetingsSettingNotificationsAndWorkflows
                            type="content"
                            activeSection={activeSection}
                        />
                    ),
                },
                {
                    id: "confirmation-page",
                    title: (
                        <MeetingsSettingConfirmationPage
                            type="title"
                            activeSection={activeSection}
                        />
                    ),
                    content: (
                        <MeetingsSettingConfirmationPage
                            type="content"
                            activeSection={activeSection}
                        />
                    ),
                },
            ].map((section) => (
                <div key={section.id} className="contents">
                    <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex justify-between py-4 px-6 border-b border-b-[#f2f2f2]
                                ${
                            activeSection === section.id
                                ? "border-b-0 hover:bg-hoverGradient"
                                : "hover:bg-[#f2f8ff]"
                        }`}
                    >
                        {section.title}
                        <div className="pt-1">
                            {activeSection === section.id ?
                                <FaAngleUp color="#1A1A1A" size="12"/> :
                                <FaAngleDown color="#1A1A1A" size="13"/>}
                        </div>
                    </button>

                    <div
                        className={`px-6 pb-4 ${activeSection === section.id ? "border-b border-b-[#f2f2f2]" : "hidden"}`}>
                        {section.content}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MeetingsSettingsContent;