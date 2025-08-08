import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      alert(data.message)
      localStorage.setItem('token', data.token)
      window.location.href = '/'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <section className="flex flex-col gap-6 bg-gray-950 rounded-2xl shadow-lg shadow-orange-400 w-full max-w-md p-8 font-mono">
        <h2 className="text-3xl text-white font-semibold text-center">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-300" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="rounded-lg bg-gray-700 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label className="text-gray-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="rounded-lg bg-gray-700 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="text-red-500 text-sm font-mono text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!username || !password || loading}
            className={`flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-3xl mt-4 font-semibold transition duration-200 ${
              loading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-orange-600 cursor-pointer'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-400 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-orange-500 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </section>
    </div>
  )
}

export default Login
