import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import { useAuth } from '../hooks/useAuth';




function AdminLayout() {
  const { user } = useAuth();
  if(user) return <Navigate to="/admin/login" />
  return (
    <div className='flex bg-mainLightBlack text-mainWhite w-full min-h-screen '>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AdminLayout