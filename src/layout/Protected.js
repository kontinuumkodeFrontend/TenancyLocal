import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected({ user, children }) {

  const userType = useSelector(state => state.user.userType);

  if (user !== userType) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected;