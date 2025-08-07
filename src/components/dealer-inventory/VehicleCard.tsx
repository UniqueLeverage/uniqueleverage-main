import {useNavigate} from "react-router-dom";
import {VehicleImagesSlides} from "../index.tsx";

interface VehicleCardProps {
    key?: number,
    ID: number,
    title: string,
    price: string,
    mileage: string,
    images: string,
    dealer_name_www: string
}

const VehicleCard = ({ID, title, price, mileage, images, dealer_name_www}: VehicleCardProps) => {
    const navigate = useNavigate();

    const handleVehicleClick = () => {
        navigate(`/vehicle-scheduling/${dealer_name_www}/${ID}`, {
            state: {ID, title, price, mileage, images},
        });
    };

    const formatMileage = (mileage: number) => {
        if (mileage >= 1000000) {
            return (mileage / 1000000).toFixed(1) + "M";
        } else if (mileage >= 1000) {
            return Math.floor(mileage / 1000) + "K";
        }
        return mileage.toString();
    };

    return (
        <div
            className="overflow-hidden mb-2 cursor-pointer">
            <div className="relative">
                <VehicleImagesSlides images={images}/>
                {/*<div*/}
                {/*    className="bg-[#262B2F33] text-white font-semibold text-xs absolute top-2 left-2 backdrop-blur-sm py-1 px-3 rounded-full">*/}
                {/*    New listing*/}
                {/*</div>*/}
            </div>
            <div className="p-2 pt-1.5" onClick={handleVehicleClick}>
                <div className="text-sm text-[#33363A]">{title}</div>
                <div
                    className="text-mainDarkBlack font-semibold text-lg">${new Intl.NumberFormat("en-US").format(Number(price))}</div>

                <div className="text-[#82868C] text-xs">{formatMileage(parseInt(mileage))}</div>
            </div>
        </div>
    );
};

export default VehicleCard;