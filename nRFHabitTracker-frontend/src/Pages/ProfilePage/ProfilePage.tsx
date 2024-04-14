import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaUser, FaLock, FaUserEdit, FaRegUser } from 'react-icons/fa'
import { UserInformation, getUserInformation } from '@/Api/api'
import { useEffect, useState } from 'react'

export function ProfilePage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserInformation | null>(null) // State to store user data

  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserData = async () => {
      try {
        const userInfo = await getUserInformation('0') // Replace 'userId' with the actual user ID
        setUserData(userInfo)
      } catch (error) {
        // Handle errors
        console.error('Error fetching user information:', error)
      }
    }

    fetchUserData() // Call the function to fetch user information
  }, []) // Empty dependency array ensures useEffect runs only once

  if (!userData) {
    return <div>Loading...</div> // Placeholder for when data is being fetched
  }

  return (
    <div className="m-5">
      {/* Heading and Edit Profile button */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold leading-tight text-slate-900">My Profile</h1>
        <FaUserEdit size={30} className="text-gray-500" onClick={() => navigate('/edit-profile')} />
      </div>
      {/* Profile picture */}
      <div className="flex justify-center">
        <div className={`w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center`}>
          {userData.profilePicture ? (
            <img src={userData.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <FaRegUser size={40} />
          )}
        </div>
      </div>
      {/* Profile fields */}
      <div className="flex justify-center h-auto flex-wrap mt-10">
        <div className="w-full max-w-lg flex items-center">
          <FaEnvelope className="mr-2 text-gray-500" />
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {userData.email}
          </label>
        </div>
        <div className="w-full max-w-lg border-b border-gray-300 my-2"></div>
        <div className="w-full max-w-lg flex items-center mt-2">
          <FaUser className="mr-2 text-gray-500" />
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            {userData.username}
          </label>
        </div>
        <div className="w-full max-w-lg border-b border-gray-300 my-2"></div>
        <div className="w-full max-w-lg flex items-center mt-2">
          <FaLock className="mr-2 text-gray-500" />
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {userData.password}
          </label>
        </div>
      </div>
    </div>
  )
}
