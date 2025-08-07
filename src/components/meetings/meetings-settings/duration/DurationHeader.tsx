import {GoClock} from "react-icons/go";
import {useEffect, useState} from "react";

interface DurationHeaderProps {
    meetingsSettingsDurationData: string,
    activeSection: string | null
}

const DurationHeader = ({meetingsSettingsDurationData, activeSection}: DurationHeaderProps) => {
    const [formattedDuration, setFormattedDuration] = useState<string>(meetingsSettingsDurationData);

    useEffect(() => {
        const formatDuration = () => {
            const duration = meetingsSettingsDurationData;
            const [value, unit] = duration.split(' ');
            if (unit === 'min') {
                const minutes = parseInt(value, 10);
                if (minutes >= 60) {
                    const hours = Math.floor(minutes / 60);
                    const remainingMinutes = minutes % 60;
                    return `${hours} hr${hours > 1 ? 's' : ''}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ''}`;
                }
            } else if (unit === 'hrs' || unit === 'hr') {
                const hours = parseInt(value, 10);
                return `${hours} hr${hours > 1 ? 's' : ''}`;
            }
            return duration;
        };
        setFormattedDuration(formatDuration());
    }, [meetingsSettingsDurationData]);

    return (
        <div className="title-holder">
            <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                Duration
            </div>
            <div
                className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'duration' ? 'hidden' : ''}`}>
                <GoClock size="15" className="inline me-1.5"/> {formattedDuration}
            </div>
        </div>
    );
};

export default DurationHeader;