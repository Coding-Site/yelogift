import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

function AdminLayout() {
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    if (adminToken === null || adminToken === undefined)
        return <Navigate to="/signin" />;
    return (
        <div className="flex bg-mainLightBlack text-mainWhite w-full min-h-screen ">
            {/* <pre>{JSON.stringify(adminToken, null, 2)}</pre> */}
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default AdminLayout;
