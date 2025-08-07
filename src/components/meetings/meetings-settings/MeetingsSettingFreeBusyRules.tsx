import {IoCalendarClearOutline, IoClose} from "react-icons/io5";
import {useEffect, useState} from "react";
import {TbPlus} from "react-icons/tb";

interface MeetingsSettingDurationProps {
    type: string,
    activeSection: string | null
}

interface MeetingRule {
    id: number;
    type: 'includes' | 'matches exactly';
    name: string;
    isEditing: boolean;
}

const MeetingsSettingFreeBusyRules = ({type, activeSection}: MeetingsSettingDurationProps) => {
    const [rules, setRules] = useState<MeetingRule[]>([]);
    const [nextId, setNextId] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const addRule = () => {
        if (rules.some(rule => rule.isEditing && !rule.name.trim())) {
            setError('Meeting name is required.');
            return;
        }

        setError(null);
        setRules([...rules, { id: nextId, type: 'includes', name: '', isEditing: true }]);
        setNextId(nextId + 1);
    };

    const removeRule = (id: number) => {
        setRules(rules.filter(rule => rule.id !== id));
    };

    const updateRule = (id: number, updatedRule: Partial<MeetingRule>) => {
        setRules(rules.map(rule => (rule.id === id ? { ...rule, ...updatedRule } : rule)));
    };

    const handleBlurOrEnter = (id: number) => {
        const rule = rules.find(rule => rule.id === id);
        if (rule?.name.trim()) {
            updateRule(id, { isEditing: false });
        } else {
            setError('Meeting name is required.');
        }
    };

    useEffect(() => {
        if (activeSection === 'free-busy-rules') {
            setRules(rules.map(rule => ({ ...rule, isEditing: false })));
            setError(null);
        } else {
            setRules(rules.filter(rule => rule.name.trim() || !rule.isEditing));
            setError(null);
        }
    }, [activeSection]);

    return (
        type === "title" ? (
            <div className="title-holder">
                <div className="mb-1 text-left text-md font-bold text-[#1A1A1A]">
                    Free/busy rules
                </div>
                <div className={`flex items-center text-[#1A1A1A9C] text-xs font-light ${activeSection === 'free-busy-rules' ? 'hidden' : ''}`}>
                    <IoCalendarClearOutline size="15" className="inline me-1.5"/>
                    <div className="w-[333px] text-ellipsis overflow-hidden text-nowrap">
                        Allow invitees to book over selected meetings on your connected calendars
                    </div>
                </div>
            </div>
        ) : type === "content" ? (
            <div className="content-holder contents">
                {rules.map(rule => (
                    <div key={rule.id} className="flex items-center mb-2 p-3 bg-gray-100 rounded">
                        {rule.isEditing ? (
                            <>
                                <select
                                    value={rule.type}
                                    onChange={(e) => updateRule(rule.id, {type: e.target.value as 'includes' | 'matches exactly'})}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm mr-2"
                                >
                                    <option value="includes">includes</option>
                                    <option value="matches exactly">matches exactly</option>
                                </select>
                                <input
                                    type="text"
                                    value={rule.name}
                                    onChange={(e) => {
                                        updateRule(rule.id, {name: e.target.value});
                                        setError(null);
                                    }}
                                    onBlur={() => handleBlurOrEnter(rule.id)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleBlurOrEnter(rule.id)}
                                    placeholder="Meeting name"
                                    className="border border-gray-300 rounded px-2 py-1 text-sm flex-grow"
                                />
                            </>
                        ) : (
                            <>
                                <div className="flex-grow">
                                    <span
                                        className="font-bold">Meeting name {rule.type === 'includes' ? 'includes' : 'is'}:</span>
                                    <span className="ml-2">{rule.name}</span>
                                </div>
                                <button onClick={() => updateRule(rule.id, {isEditing: true})}
                                        className="ml-2 text-blue-500 hover:text-blue-700">
                                    Edit
                                </button>
                                <button onClick={() => removeRule(rule.id)}
                                        className="ml-2 text-gray-500 hover:text-gray-700">
                                    <IoClose size="18"/>
                                </button>
                            </>
                        )}
                    </div>
                ))}
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <div
                    className="text-sm font-light text-mainBlue my-3 flex items-center cursor-pointer hover:text-[#00347b]"
                    onClick={() => addRule()}>
                    <TbPlus size="15" className="inline me-1"/> Add meeting exception
                </div>
            </div>
        ) : null
    );
};

export default MeetingsSettingFreeBusyRules;