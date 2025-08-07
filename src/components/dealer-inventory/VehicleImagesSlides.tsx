import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import pagination styles
import { Pagination } from "swiper/modules"; // Import pagination module

interface VehicleImagesSlidesProps {
    images: string | string[];
}

const VehicleImagesSlides = ({images}: VehicleImagesSlidesProps) => {
    const imageArray = typeof images === "string" ? images.split(/[,;]/) : images;

    return (
        <div className="w-full h-40 bg-white overflow-hidden rounded-md border border-mainStroke/40">
            <Swiper
                className="w-full h-full"
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
            >
                {imageArray.map((image, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <img
                            src={image.trim()}
                            alt={`Vehicle ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default VehicleImagesSlides;