import { DealerInventoryMainHolder } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicDealerService } from "../_services";

interface DealerData {
    id: number;
    name: string;
    dealer_name_www: string;
}

const DealerInventory = () => {
    const { dealername } = useParams<{ dealername: string }>();
    const [dealerData, setDealerData] = useState<DealerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!dealername) return;

                const data: DealerData = await publicDealerService.getDealerDataByDealerName(dealername);
                setDealerData(data);

                if (data.name) {
                    document.title = `Unique Leverage | ${data.name}`;
                }
            } catch (error) {
                console.error("Error fetching dealer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dealername]);

    return (
        <div className="md:flex flex-col md:min-h-screen">
            {loading ? (
                <></>
            ) : (
                dealerData && (
                    <DealerInventoryMainHolder
                        dealer_id={dealerData.id}
                        dealer_name_www={dealerData.dealer_name_www}
                    />
                )
            )}
        </div>
    );
};

export default DealerInventory;
