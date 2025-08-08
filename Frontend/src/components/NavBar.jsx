import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(false)
      setLoading(false)
      return
    }

    fetch('http://localhost:3000/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => {
        setUser(data.user)
        setLoading(false)
      })
      .catch(() => {
        setUser(false)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(false)
    navigate('/')
  }

  if (loading) return null

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900">
      {/* Logo */}
      <img
        src={Logo}
        alt="Reel Talk Logo"
        className="h-20 w-auto cursor-pointer"
        onClick={() => navigate('/')}
        draggable={false}
      />

      {/* Navigation Links */}
      <ul className="flex space-x-10 text-white font-mono text-lg select-none">
        <li
          tabIndex={0}
          role="button"
          className="cursor-pointer hover:text-amber-400 transition duration-150 ease-in-out hover:scale-105"
          onClick={() => navigate('/about')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/about')}
        >
          About
        </li>
        <li
          tabIndex={0}
          role="button"
          className="cursor-pointer hover:text-amber-400 transition duration-150 ease-in-out hover:scale-105"
          onClick={() => navigate('/movies')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/movies')}
        >
          Movies
        </li>
        <li
          tabIndex={0}
          role="button"
          className="cursor-pointer hover:text-amber-400 transition duration-150 ease-in-out hover:scale-105"
          onClick={() => navigate(user ? '/addreviews' : '/reviews')}
          onKeyDown={(e) =>
            e.key === 'Enter' && navigate(user ? '/addreviews' : '/reviews')
          }
        >
          {user ? 'Add Reviews' : 'Reviews'}
        </li>
      </ul>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <button
              onClick={() => navigate('/register')}
              className="bg-gray-950 text-orange-500 px-6 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition duration-200 ease-in font-mono select-none"
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-950 text-orange-500 px-6 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition duration-200 ease-in font-mono select-none"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span
              className="text-gray-300"
              aria-label="User icon"
              role="img"
              title={user.name || 'User'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 1111.963 0m-11.963 0A8.966 8.966 0 0012 21a8.966 8.966 0 00-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-2xl hover:bg-red-700 font-mono select-none"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
