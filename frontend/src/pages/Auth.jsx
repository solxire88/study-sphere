"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { GraduationCap, Users } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState("student")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  // Keep the same handleSubmit logic as before
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        // Login logic (unchanged)
        const response = await axios.post("http://localhost:8000/api/token/", {
          username,
          password,
        })
        localStorage.setItem("token", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
        const userRole = response.data.role
        navigate(userRole === "student" ? "/student" : "/educator")
      } else {
        // Register logic (unchanged)
        await axios.post("http://localhost:8000/api/user/register/", {
          username,
          password,
          email,
          role,
        })
        setIsLogin(true)
      }
    } catch (error) {
      console.error("Auth error:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mb-8">
        <div className="h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          Study Sphere
        </div>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500">
              {isLogin ? "Sign in to continue" : "Start your learning journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {!isLogin && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Role
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${
                        role === "student"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <GraduationCap className="h-5 w-5" />
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("educator")}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${
                        role === "educator"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Users className="h-5 w-5" />
                      Educator
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}