import {Navigate, Outlet} from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return (<Outlet/>);
};

export default AuthLayout;