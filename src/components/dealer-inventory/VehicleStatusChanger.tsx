interface VehicleStatusChangerProps {
    currentStatus: string,
    setMainStatus: (status: string) => void
}

const VehicleStatusChanger = ({currentStatus, setMainStatus}: VehicleStatusChangerProps) => {
    return (
        <div className="flex bg-mainSecondBg mx-auto mb-4 md:mt-4 rounded-md w-[90%] md:w-[70%] xl:w-[60%] p-1">
            <button
                onClick={() => setMainStatus('New')}
                className={`px-4 py-2 rounded-lg w-[50%] text-mainBlack ${currentStatus === 'New' && 'text-mainBlue bg-white shadow-dropCustomLighter border border-white'}`}>
                New
            </button>
            <button
                onClick={() => setMainStatus('Used')}
                className={`px-4 py-2 rounded-lg w-[50%] text-mainBlack ${currentStatus === 'Used' && 'text-mainBlue bg-white shadow-dropCustomLighter border border-white'}`}>
                Used
            </button>
        </div>
    );
};

export default VehicleStatusChanger;