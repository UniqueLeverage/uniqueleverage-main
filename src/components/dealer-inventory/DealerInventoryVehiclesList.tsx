import {ThreeDots} from "react-loader-spinner";
import {VehicleCard} from "../index.tsx";
import {useEffect, useState, useMemo} from "react";
import {publicDealerService} from "../../_services";

interface DealerVehiclesResponse {
    vehicles: Vehicle[];
}

interface Vehicle {
    ID: number;
    year: string;
    price: string;
    mileage: string;
    bodyStyle: string;
    images: string;
    model: string;
    make: string;
    condition: string;
}

interface DealerInventoryVehiclesListProps {
    searchQuery: string;
    mainStatus: string;
    filterParams: {
        minYear: string;
        maxYear: string;
        minPrice: string;
        dealer_id: number;
        maxMileage: string;
        bodyStyle: string;
        model: string;
        maxPrice: string;
        make: string;
        minMileage: string;
    };
    dealer_name_www: string;
}

const DealerInventoryVehiclesList = ({
                                         searchQuery,
                                         mainStatus,
                                         filterParams,
                                         dealer_name_www,
                                     }: DealerInventoryVehiclesListProps) => {
    const [allVehiclesData, setAllVehiclesData] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data: DealerVehiclesResponse = await publicDealerService.getDealerVehiclesData(filterParams.dealer_id, 1, 9999);
                setAllVehiclesData(data.vehicles);
            } catch (error) {
                console.error("Error fetching vehicles data:", error);
                setAllVehiclesData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filterParams.dealer_id]);

    const filteredVehicles = useMemo(() => {
        return allVehiclesData.filter((vehicle) => {
            const vehicleYear = Number(vehicle.year);
            const vehiclePrice = Number(vehicle.price);
            const vehicleMileage = Number(vehicle.mileage);

            const matchesYear =
                (!filterParams.minYear || vehicleYear >= Number(filterParams.minYear)) &&
                (!filterParams.maxYear || vehicleYear <= Number(filterParams.maxYear));

            const matchesPrice =
                (!filterParams.minPrice || vehiclePrice >= Number(filterParams.minPrice)) &&
                (!filterParams.maxPrice || vehiclePrice <= Number(filterParams.maxPrice));

            const matchesMileage =
                (!filterParams.minMileage || vehicleMileage >= Number(filterParams.minMileage)) &&
                (!filterParams.maxMileage || vehicleMileage <= Number(filterParams.maxMileage));

            const matchesBodyStyle =
                !filterParams.bodyStyle || vehicle.bodyStyle.toLowerCase().includes(filterParams.bodyStyle.toLowerCase());

            const matchesModel =
                !filterParams.model || vehicle.model.toLowerCase().includes(filterParams.model.toLowerCase());

            const matchesMake =
                !filterParams.make || vehicle.make.toLowerCase().includes(filterParams.make.toLowerCase());

            const matchesMainStatus =
                !mainStatus || vehicle.condition.toLowerCase() === mainStatus.toLowerCase();

            const matchesSearch =
                !searchQuery ||
                vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.bodyStyle.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesPrice && matchesMileage && matchesBodyStyle && matchesModel && matchesMake && matchesMainStatus && matchesSearch;
        });
    }, [allVehiclesData, filterParams, searchQuery, mainStatus]);

    return loading ? (
        <div className="flex justify-center">
            <ThreeDots height={100} width={100} radius={5} color="#1B74E4" ariaLabel="ball-triangle-loading"/>
        </div>
    ) : (
        <div className="px-4">
            <div className="text-[#292B2E] font-semibold text-lg pl-6 mb-3">
                Vehicles <span>({filteredVehicles.length})</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {filteredVehicles.map((vehicle) => (
                    // <VehicleCard dealer_name_www={dealer_name_www} {...vehicle} key={vehicle.id} />
                    <VehicleCard
                        key={vehicle.ID}
                        dealer_name_www={dealer_name_www}
                        ID={vehicle.ID}
                        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        price={vehicle.price}
                        mileage={vehicle.mileage}
                        images={vehicle.images}
                    />
                ))}
            </div>
        </div>
    );
};

export default DealerInventoryVehiclesList;
