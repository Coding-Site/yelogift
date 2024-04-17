import { useAuth } from '../hooks/useAuth'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'




function AdminLayout() {
  const {user} = useAuth()
  return (
    <div className='flex bg-mainLightBlack text-mainWhite w-full min-h-screen '>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AdminLayout