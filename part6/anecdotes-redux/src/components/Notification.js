import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  return (
    <div className="success">
      {notification}
    </div>
  )
}

export default Notification