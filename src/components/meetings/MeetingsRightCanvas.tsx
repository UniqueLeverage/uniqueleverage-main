import {MeetingsSettingsContent} from "../../components";

import {IoCloseOutline} from "react-icons/io5";
import {BsThreeDotsVertical} from "react-icons/bs";
import {PiEyeBold} from "react-icons/pi";
import {FiChevronLeft} from "react-icons/fi";

interface MeetingsRightCanvasProps {
    openCanvas: () => void,
    closeCanvas: () => void
    isCanvasOpen: boolean,
}

const MeetingsRightCanvas = ({isCanvasOpen, closeCanvas}: MeetingsRightCanvasProps) => {

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full md:w-[440px] bg-white shadow-canvasDropShadow transform transition-transform duration-300 ease-in-out pt-6 ${
                isCanvasOpen ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="border-b border-b-[#F2F2F2] pb-4">
                    <div className="text-right pr-10">
                        <button
                            onClick={closeCanvas}
                            className="hover:text-gray-700 focus:outline-none"
                        >
                            <IoCloseOutline color="#0A2540" size="25"/>
                        </button>
                    </div>
                    <div className="flex items-center justify-between pr-10 pl-14">
                        <div>
                            <div className="text-[#476788] text-xxs font-bold pl-1">
                                YOUR MEETINGS
                            </div>
                            <div
                                className="text-[#1A1A1A] font-bold text-xl w-64 mb-1 relative before:bg-[#17E885] before:w-4 before:h-4 before:absolute before:rounded-full before:top-1.5 before:-left-[22px]">
                                David Family Autos
                                Scheduler Settings.
                            </div>
                            <div className="text-[#476788] text-xs">
                                One-on-One
                            </div>
                        </div>
                        <div>
                            <BsThreeDotsVertical size="20" className="cursor-pointer"/>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <MeetingsSettingsContent
                    isCanvasOpen={isCanvasOpen}
                />

                {/* Footer */}
                <div className="border-t py-4 px-6 flex items-center justify-between text-sm">
                    <div className="text-[#0A2540] flex items-center cursor-pointer">
                        <PiEyeBold size="18" className="inline me-1"/> Preview
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={closeCanvas}
                            className="px-4 py-3 text-[#0A2540] flex items-center me-3"
                        >
                            <FiChevronLeft size="18" className="inline me-1.5"/> Back
                        </button>
                        <button
                            onClick={closeCanvas}
                            className="px-4 py-2.5 bg-[#006BFF] text-white rounded-3xl"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingsRightCanvas;