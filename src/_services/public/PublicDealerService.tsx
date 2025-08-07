import Axios from "../ServiceCaller";

const getDealerDataByDealerName = async (dealer_name: string) => {
    const {data} = await Axios.get(`?name=${dealer_name}`);
    return data.data;
};

const getFiltersData = async (dealer_id: number) => {
    const {data} = await Axios.get(`/${dealer_id}/filter-options`);
    return data.data;
};

const getDealerVehiclesData = async (dealer_id: number, fromPage: number, toPage: number) => {
    const {data} = await Axios.get(`/${dealer_id}/vehicles?page=${fromPage}&limit=${toPage}`);
    // const {data} = await Axios.post(`/${dealer_id}/vehicles?query=ford&page=1&limit=20`);
    return data.data;
};
const getMarksData = async (dealer_id: number) => {
    const {data} = await Axios.get(`getMarks/${dealer_id}`);
    return data.data;
};

const getModelsData = async (dealer_id: number, mark_id: number) => {
    const {data} = await Axios.get(`getModels/${dealer_id}/${mark_id}`);
    return data.data;
};

const getBodyStylesData = async (dealer_id: number) => {
    const {data} = await Axios.get(`getBodyStyles/${dealer_id}`);
    return data.data;
};

export const publicDealerService = {
    getDealerDataByDealerName,
    getFiltersData,
    getDealerVehiclesData,
    getMarksData,
    getModelsData,
    getBodyStylesData
};