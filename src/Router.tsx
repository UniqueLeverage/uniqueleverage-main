import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, DealerInventory, VehicleScheduling, Dashboard, Inventory, Meetings, Login, Register} from "./pages";
import {AuthLayout, DashboardLayout} from "./layouts";
import routerPaths from "./routerPaths";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={routerPaths.home} element={<Home/>}/>
                <Route path={routerPaths.vehicleScheduling} element={<VehicleScheduling/>}/>

                <Route path={routerPaths.login} element={<Login />} />
                <Route path={routerPaths.register} element={<Register />} />

                <Route element={<AuthLayout/>}>
                    <Route path="/" element={<DashboardLayout/>}>
                        <Route path={routerPaths.dashboard} element={<Dashboard/>}/>
                        <Route path={routerPaths.meetings} element={<Meetings/>}/>
                        <Route path={routerPaths.inventory} element={<Inventory/>}/>
                    </Route>
                </Route>

                <Route path={routerPaths.dealerInventory} element={<DealerInventory />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;