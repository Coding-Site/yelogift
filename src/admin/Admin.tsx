import { AuthContext } from '../contexts/AuthContext';
import AdminLayout from './AdminLayout';
import { useUser } from '../hooks/useUser';
// import { useToken } from '../hooks/useToken'
// import { Navigate } from 'react-router-dom'

function Admin() {
    const { user, setUser } = useUser();

    return (
        <div className="flex ">
            <AuthContext.Provider value={{ user, setUser }}>
                <AdminLayout />
            </AuthContext.Provider>
        </div>
    );
}

export default Admin;
