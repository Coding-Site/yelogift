import {  Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'




function AdminLayout() {

  return (
    <div className='flex bg-mainLightBlack text-mainWhite w-full min-h-screen '>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default AdminLayout