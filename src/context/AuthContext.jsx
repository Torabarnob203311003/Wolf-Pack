/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import axiosSecure from '../lib/axiosSecure';

// Create and export the context
const AuthContext = createContext(null);

// Export the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Memoized refetch function to avoid dependency issues
  const refetchUser = useCallback(async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      console.warn('⚠️ No token found for refetch')
      return false
    }

    try {
      setLoading(true)
      
      // Ensure headers are set
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      const res = await axiosSecure.get('/users/me')
      
      if (res.data.data) {
        setUser(res.data.data)
        setIsAuthenticated(true)
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      console.error('❌ Refetch failed:', error.response?.data || error.message)
      logout()
      return false
    } finally {
      setLoading(false)
    }
  }, []) // Empty dependency array since logout is defined below

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          const res = await axiosSecure.get('/users/me')
          
          if (res.data.data) {
            setUser(res.data.data)
            setIsAuthenticated(true)
          } else {
            logout()
          }
        } catch (error) {
          console.error('❌ Auth check failed:', error.response?.data || error.message)
          logout()
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await axiosSecure.post('/users/login', { email, password })
      const data = res.data.data;
      
      const { jwtToken, user } = data
      
      // Save token
      localStorage.setItem('token', jwtToken)
      
      // Set header for BOTH axios instances
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      
      setUser(user);
      setIsAuthenticated(true)
      
      return true
    } catch (error) {
      console.error('❌ Login failed:', error);
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    delete axiosSecure.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      isAuthenticated, 
      loading, 
      login, 
      logout,
      refetchUser 
    }}>
      {children}
    </AuthContext.Provider>
  )
}