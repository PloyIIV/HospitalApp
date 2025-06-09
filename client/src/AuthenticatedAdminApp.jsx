import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage/Homepage'
import AdminInbox from './Admin/AdminInbox'
import AdminChatRoom from './Admin/AdminChatRoom'

const AuthenticatedAdminApp = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminInbox />} />
        <Route path='/inbox/:roomId' element={<AdminChatRoom />} />
        <Route path='/*' element={<AdminInbox />} />
    </Routes>
  )
}

export default AuthenticatedAdminApp