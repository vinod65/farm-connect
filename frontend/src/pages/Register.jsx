import { useState } from 'react'
import api from '../api/AxiosConfig'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import '../styles/auth.css'

function Register() {
  const navigate = useNavigate()

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [role, setRole] = useState('Farmer')

const handleRegister = async (e) => {

  e.preventDefault()

  const user = {
    name,
    email,
    password,
    role
  }

  try {

    await api.post('/register', user)

    alert('Registration Successful')

    navigate('/login')

  } catch (error) {

    console.error(error)

    alert(error.response?.data || 'Registration Failed')
  }
}
  return (
    <>
      <Navbar />

      <div className='auth-page'>

        <div className='auth-container'>

          <div className='auth-left'>
            <h1>Join Farm-Connect</h1>

            <p>
              Create your account and become part of the
              smart agricultural marketplace ecosystem.
            </p>

            <img
              src='https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop'
              alt='farm'
            />
          </div>

          <div className='auth-right'>

            <h2>Create Account</h2>

           <form
            className='auth-form'
            onSubmit={handleRegister}
          >

              <div className='form-group'>
                <label>Full Name</label>

                              <input
                type='text'
                placeholder='Enter your full name'
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
              </div>

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
              placeholder='Create password'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
              </div>

              <div className='form-group'>
                <label>Select Role</label>

                              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              >
                <option>Farmer</option>
                <option>Buyer</option>
              </select>
              </div>

              <button className='auth-btn'>
                Register
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Register