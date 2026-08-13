import { Link } from 'react-router-dom'
import { FaLeaf } from 'react-icons/fa'
import '../styles/navbar.css'

import { useContext } from 'react'

import {
  AuthContext,
} from '../context/AuthContext'

import { useNavigate }
from 'react-router-dom'

function Navbar() {
const {
  isLoggedIn,
  logout,
} = useContext(AuthContext)

const navigate = useNavigate()

const handleLogout = () => {

localStorage.removeItem('role')
localStorage.removeItem('token')
localStorage.removeItem('name')
localStorage.removeItem('email')

  logout()

  navigate('/login')
}

const role=localStorage.getItem('role')

  return (
    <nav className='navbar'>

      <div className='container navbar-container'>

        <div className='logo'>
          <FaLeaf className='logo-icon' />
          <h1>Farm-Connect</h1>
        </div>

        <div className='nav-links'>

  <Link to='/'>Home</Link>

  <Link to='/products'>
    Products
  </Link>

  {
  role === 'Farmer' && (
    <Link to='/add-product'>
      Add Product
    </Link>
  )
}

{role === 'Farmer' && (

  <Link to='/farmer-orders'>
    Orders
  </Link>

)}

{
  role === 'Buyer' && (
    <Link to='/my-orders'>
      My Orders
    </Link>
  )
}

{role === 'Admin' && (
  <Link to='/admin'>
    Admin
  </Link>
)}

{role === 'Admin' && (
  <Link to='/admin/users'>
    Users
  </Link>
)}

{role === 'Admin' && (
  <Link to='/admin/products'>
    Manage Products
  </Link>
)}

{role === 'Admin' && (
  <Link to='/admin/orders'>
    Orders
  </Link>
)}


  <Link to='/dashboard'>
    Dashboard
  </Link>

  {

    isLoggedIn ? (

      <button
        className='logout-btn'
        onClick={handleLogout}
      >
        Logout
      </button>

    ) : (

      <Link to='/login'>
        Login
      </Link>

    )

  }

</div>

 {isLoggedIn && role === 'Farmer' && (
  <button
    className='floating-add-btn'
    onClick={() => navigate('/add-product')}
  >
    +
  </button>
)}

      </div>

    </nav>

    

    
  )
}

export default Navbar