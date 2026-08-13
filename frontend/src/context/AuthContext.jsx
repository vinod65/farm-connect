import {
  createContext,
  useState,
} from 'react'

export const AuthContext =
  createContext()

export const AuthProvider =
  ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] =
      useState(
        !!localStorage.getItem('token')
      )

//       useEffect(() => {

//   const token =
//     localStorage.getItem('token')

//   if (token) {
//     setIsLoggedIn(true)
//   }

// }, [])

    const login = () => {
      setIsLoggedIn(true)
    }

    const logout = () => {

      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('name')
      localStorage.removeItem('email')

      setIsLoggedIn(false)
    }

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider