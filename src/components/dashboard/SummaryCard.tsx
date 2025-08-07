import {Link} from "react-router-dom";
import {PiPlusCircleBold} from "react-icons/pi";

interface SummaryCardProps {
    title: string;
    links: { label: string; value: number }[];
    action?: boolean;
}

const SummaryCard = ({title, links, action}: SummaryCardProps) => {
    return (
        <div className="border-r border-[#C7DBE8] last:border-r-0 px-4">
            <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-mainBlack font-raleway">{title}</div>
                {action && <div><PiPlusCircleBold size="20" className="text-mainBlue cursor-pointer"/></div>}
            </div>
            <div>
                {links.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center mt-2 pb-1 border-b border-dashed border-gray-300 last:border-0"
                    >
                        <Link to="#" className="text-mainBlue text-sm underline">
                            {item.label}
                        </Link>
                        <div className="font-bold text-mainBlack">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryCard;