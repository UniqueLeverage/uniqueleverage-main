import {Outlet} from 'react-router-dom';
import {Sidebar} from '../components';

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 flex flex-col h-screen w-full pl-0 lg:pl-[225px]">
                <Outlet/>
            </main>
        </div>
    );
};

export default DashboardLayout;