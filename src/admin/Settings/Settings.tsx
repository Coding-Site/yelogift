import React from 'react'
import { Outlet } from 'react-router-dom'

function Settings() {
  return (
    <div className='w-full container py-5'>

        <Outlet />
    </div>
  )
}

export default Settings