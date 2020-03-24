import React from 'react'
import { useParams } from 'react-router'

const MyProfile = () => {
  let { profileId } = useParams()

  return (
    <h2>My Profile ID: {profileId}</h2>
  )
}

export default MyProfile
