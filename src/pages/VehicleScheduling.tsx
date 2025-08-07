import {VehicleSchedulingSidebar, ScheduleInformation} from "../components";
import {useParams} from "react-router-dom";
import {useState} from "react";

const VehicleScheduling = () => {
    let {vid} = useParams();
    const [step, setStep] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [timezone, setTimezone] = useState<string>('Eastern Time - US & Canada');

    return (
        <div className="md:flex flex-col md:min-h-screen">
            <div
                className="md:mt-[66px] md:mb-[30px] md:flex lg:min-h-[700px] lg:pr-[5%] lg:pl-[5%] justify-center transition-all duration-150 ease-in-out">
                <div
                    className={`md:max-w-[680px] md:w-[95%] lg:flex ${step > 1 ? 'lg:min-w-[900px] lg:max-w-[1060px]' : 'lg:max-w-[800px]'} lg:min-h-[550px] flex-auto bg-white md:shadow-dropCustom md:rounded-lg md:border border-[#1a1a1a1a] transition-all duration-150 ease-in-out`}>
                    <div
                        className={`${step > 1 ? 'lg:w-[35%]' : 'lg:w-1/2'} lg:min-w-[300px] md:block transition-all duration-150 ease-in-out ${step === 2 ? 'hidden' : 'block'}`}>
                        <VehicleSchedulingSidebar
                            step={step}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            timezone={timezone}
                            showDetails={showDetails}
                            setStep={setStep}
                            setShowDetails={setShowDetails}
                        />
                    </div>
                    <div
                        className={`md:min-h-[600px] lg:w-1/2 lg:flex-grow lg:flex-shrink lg:basis-1/2 transition-all duration-150 ease-in-out`}>
                        <ScheduleInformation
                            vehicle_id={vid}
                            step={step}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            timezone={timezone}
                            setStep={setStep}
                            setSelectedDate={setSelectedDate}
                            setSelectedTime={setSelectedTime}
                            setTimezone={setTimezone}
                            setShowDetails={setShowDetails}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleScheduling;