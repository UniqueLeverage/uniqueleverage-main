import {TiWarning} from "react-icons/ti";
import {LuExternalLink} from "react-icons/lu";

const LocationGoogleMeetForm = () => {
    return (
        <div className="bg-[#fff2f4] text-sm font-light py-2 px-4 rounded-lg mt-2 mb-4">
            <div className="flex items-center mb-2.5">
                <TiWarning size="20" className="mr-2"/> Your Google Meet account is not connected
            </div>
            <button
                type="button"
                className="border  border-[#476788] w-fit flex items-center py-1.5 px-3 rounded-3xl ms-7 hover:bg-[#e6f0ff]">
                Connect Google Meet <LuExternalLink size="16" className="ml-2"/>
            </button>
        </div>
    );
};

export default LocationGoogleMeetForm;