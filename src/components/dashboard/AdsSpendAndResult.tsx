import {useState} from "react";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

const AdsSpendAndResult = () => {
    const [series] = useState([
        {name: "Ad Spend", data: [4040, 4002, 8098, 6000, 9024, 4503, 9756]},
        {name: "Result", data: [2615, 2594, 6551, 4354, 5745, 3264, 5756]},
    ]);

    const [options] = useState<ApexOptions>({
        chart: {
            type: "bar",
            zoom: {enabled: false},
            toolbar: {show: false},
        },
        grid: {
            show: false,
        },
        dataLabels: {enabled: false},
        colors: ["#488fe9", "#84b1ae"],
        xaxis: {
            categories: [
                "Sept 20",
                "Sept 21",
                "Sept 22",
                "Sept 23",
                "Sept 24",
                "Sept 25",
                "Sept 26",
            ],
            labels: {
                style: {
                    colors: "#8d9093",
                    fontSize: "13px",
                },
            },
            axisBorder: {show: false},
            axisTicks: {show: false},
        },
        stroke: {width: 2, colors: ["#fff"]},
        legend: {
            show: false,
        },
        yaxis: {
            labels: {
                formatter: (val: number) => {
                    if (val >= 1000) {
                        return `$${(val / 1000).toFixed(0)}K`;
                    }
                    return `$${val}`;
                },
                style: {
                    colors: "#8d9093",
                    fontSize: "13px",
                },
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "last",
                columnWidth: "55%",
            },
        },
        fill: {opacity: 1},
        tooltip: {
            y: {
                formatter: (val: number) => {
                    if (val >= 1000) {
                        return `$${(val / 1000).toFixed(1)}K`;
                    }
                    return `$${val}`;
                },
            },
        },
    });

    return (
        <div className="bg-elementBackground rounded-lg border border-mainStroke">
            <div className="flex items-center justify-between border-b border-mainStroke px-4 py-3">
                <div className="font-bold text-mainBlack font-raleway">Ads Spend vs Result</div>
                <div>
                    <select
                        className="text-sm font-medium text-darkGray border border-gray-200 rounded-md py-2 px-3"
                        id="filterBy"
                    >
                        <option value="days">Last 7 days</option>
                        <option value="months">Last month</option>
                        <option value="years">Last year</option>
                    </select>
                </div>
            </div>
            <div className="">
                <div id="chart">
                    <ReactApexChart options={options} series={series} type="bar" height={230}/>
                </div>
            </div>
        </div>
    );
};

export default AdsSpendAndResult;