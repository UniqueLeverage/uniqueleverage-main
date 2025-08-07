import {useEffect, useState} from "react";
import usaFlag from "../../../../assets/usa_flag.png";
import {TbPlus} from "react-icons/tb";

const LocationPhoneCallForm = () => {
    const [displayOption, setDisplayOption] = useState("requireInviteeNumber");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [phoneNumberNote, setPhoneNumberNote] = useState<string>("");
    const [isAddNote, setIsAddNote] = useState(false);
    const [error, setError] = useState<string | null>();

    const handleDisplayOptionChange = (value: "requireInviteeNumber" | "provideAPhoneNumber") => {
        setDisplayOption(value);
    };

    useEffect(() => {
        if (phoneNumber.trim()) {
            setError('');
        } else {
            setError('A valid phone number is required.')
        }
    }, [phoneNumber]);

    console.log('phoneNumberNote', phoneNumberNote)
    return (
        <div className="mt-3 mb-4 border-l border-l-mainStroke pl-4 pb-1 text-sm">
            <div className="font-bold text-mainBlack mb-2 mt-3">
                How will you get in touch?
            </div>
            <div className="flex flex-col font-light">
                <label className="inline-flex items-center cursor-pointer mb-3">
                    <input
                        type="radio"
                        className="sr-only"
                        name="displayOption"
                        checked={displayOption === "requireInviteeNumber"}
                        onChange={() => handleDisplayOptionChange("requireInviteeNumber")}
                    />
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${displayOption === "requireInviteeNumber" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                    <span className="text-mainBlack">Require invitee's phone number.</span>
                </label>
                <label className="inline-flex items-center cursor-pointer mb-3">
                    <input
                        type="radio"
                        className="sr-only"
                        name="displayOption"
                        checked={displayOption === "provideAPhoneNumber"}
                        onChange={() =>
                            handleDisplayOptionChange("provideAPhoneNumber")
                        }
                    />
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center mr-2.5 ${displayOption === "provideAPhoneNumber" ? 'border-[5px] border-[#006bff]' : 'border border-[#a6bbd1]'}`}/>
                    <span className="text-mainBlack">
                        Provide a phone number to invitees after they book.
                    </span>
                </label>
            </div>
            {displayOption === "provideAPhoneNumber" && (
                <div className="ps-6">
                    <div className="relative">
                        <input
                            type="tel"
                            name="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`w-full h-[46px] pl-11 pr-4 py-1.5 border rounded-md focus:ring-2 focus:outline-none hide-number-arrows ${error ? 'border-[#b31f1fcc] focus:ring-[#b31f1fcc]' : 'focus:ring-mainBlue'}`}
                        />
                        <div className="absolute top-[11px] start-3">
                            <img src={usaFlag} alt="" className="h-6"/>
                        </div>
                    </div>
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
                            onChange={(e) => setPhoneNumberNote(e.target.value)}
                            placeholder="Add a note..."
                            rows={2}
                        ></textarea>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationPhoneCallForm;