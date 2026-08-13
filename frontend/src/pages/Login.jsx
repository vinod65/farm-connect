import Navbar from '../components/Navbar'
import '../styles/auth.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { useState } from 'react'
import api from '../api/AxiosConfig'

import {
  AuthContext,
} from '../context/AuthContext'

import { useNavigate }
from 'react-router-dom'

import {
  toast,
  ToastContainer,
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


function Login() {

  const { login } =
  useContext(AuthContext)

const navigate =
  useNavigate()

  const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogin = async (e) => {

  e.preventDefault()

  try {

    const response =
      await api.post('/login',{ email, password})
      console.log(response.data)

if (response.data) {

  login()

  localStorage.setItem(
    'role',
    response.data.role
  )

  localStorage.setItem(
  'token',
  response.data.token
)

localStorage.setItem(
  'name',
  response.data.name
)
localStorage.setItem(
  'email',
  email
)

  alert('Login Successful')

  if (
    response.data.role === 'Admin'
  ) {

    navigate('/admin')

  } else if (
    response.data.role === 'Farmer'
  ) {

    navigate('/dashboard')

  } else {

    navigate('/products')
  }
} else {

      alert('Invalid Credentials')
    }

  } catch (error) {

    console.error(error)

    alert('Login Failed')
  }
}



  return (
    <>
      <Navbar />

      <div className='auth-page'>

        <div className='auth-container'>

          <div className='auth-left'>
            <h1>Welcome Back</h1>

            <p>
              Login to access your Farm-Connect dashboard
              and manage your agricultural marketplace activities.
            </p>

            <img
              src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop'
              alt='farm'
            />
          </div>

          <div className='auth-right'>

            <h2>Login</h2>

            <form
  className='auth-form'
  onSubmit={handleLogin}
>

              <div className='form-group'>
                <label>Email</label>

               <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
              </div>

              <div className='form-group'>
                <label>Password</label>

                            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
              </div>

              <button className='auth-btn'>
                Login
              </button>

             <p className='auth-bottom-text'>
  Don’t have an account?
  <Link to='/register' className='auth-link'>
    Register
  </Link>
</p>

            </form>

          </div>

        </div>

      </div>

      <ToastContainer />
    </>
  )
}

export default Login