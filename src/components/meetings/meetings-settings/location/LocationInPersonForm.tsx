import {useEffect, useState} from "react";
import {TbPlus} from "react-icons/tb";

const LocationInPersonForm = () => {
    const [physicalLocation, setPhysicalLocation] = useState<string>("");
    const [physicalLocationNote, setPhysicalLocationNote] = useState<string>("");
    const [error, setError] = useState<string | null>();
    const [isAddNote, setIsAddNote] = useState(false);

    useEffect(() => {
        if (physicalLocation.trim()) {
            setError('');
        } else {
            setError('Physical location is required.')
        }
    }, [physicalLocation]);

    console.log('customLocation, physicalLocationNote', physicalLocation, physicalLocationNote)

    return (
        <div className="mt-3 mb-4 border-l border-l-mainStroke pl-4 pb-1 text-sm">
            <div className="font-bold text-mainBlack mb-2">
                Location name/address
            </div>
            <textarea
                className={`placeholder:font-light placeholder:text-[#476788] w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:outline-none ${error ? 'border-[#b31f1fcc] focus:ring-[#b31f1fcc]' : 'focus:ring-mainBlue'}`}
                onChange={(e) => setPhysicalLocation(e.target.value)}
                placeholder="(e.g. Hollywood Bowl, 2301 Highland Ave, Los Angeles, CA 90068)"
                rows={2}
            ></textarea>
            <div className="text-xs text-[#b03200] font-light mt-1">
                {error}
            </div>
            {!isAddNote && (
                <div
                    className="text-sm font-light text-mainBlue flex items-center cursor-pointer hover:text-[#00347b] mt-2"
                    onClick={() => setIsAddNote(true)}>
                    <TbPlus size="15" className="inline me-1"/> Add a note
                </div>
            )}
            {isAddNote && (
                <textarea
                    className="placeholder:font-light placeholder:text-[#476788] w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:outline-none focus:ring-mainBlue mt-3"
                    onChange={(e) => setPhysicalLocationNote(e.target.value)}
                    placeholder="Add a note..."
                    rows={2}
                ></textarea>
            )}
        </div>
    );
};

export default LocationInPersonForm;