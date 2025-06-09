import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage/Homepage'
import EditProfile from './Profile/EditProfile'

const AuthenticatedApp = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/profile/:id' element={<EditProfile />} />
        <Route path='/*' element={<Homepage />} />
    </Routes>
  )
}

export default AuthenticatedApp