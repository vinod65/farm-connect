import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import '../styles/admin.css'
import { Link } from 'react-router-dom'
import api from '../api/AxiosConfig'

function AdminDashboard() {
const[users, setUsers] = useState([])
const [products, setProducts] = useState([])
 const [orders, setOrders] = useState([])

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

  try {
    const userResponse = await api.get('/users')
    const productResponse = await api.get('/products')
    const orderResponse = await api.get('/orders')

    setUsers(userResponse.data)
    setProducts(productResponse.data)
    setOrders(orderResponse.data)
    
  } catch (error) {
    console.error(error)
  }
}

  return (

    <>
      <Navbar />

      <div className='admin-page'>

        <h1>
          Admin Dashboard
        </h1>

         <div className='admin-cards'>

          <div className='admin-card'>
            <h2>{users.length}</h2>
            <p>Total Users</p>
          </div>

          <div className='admin-card'>
            <h2>{products.length}</h2>
            <p>Total Products</p>
          </div>

          <div className='admin-card'>
            <h2>{orders.length}</h2>
            <p>Total Orders</p>
          </div>

          <div
  style={{
    marginTop: '30px'
  }}
>

  <Link to="/admin/users">

    <button
      className="approve-btn"
    >
      Manage Users
    </button>

  </Link>

  <Link to="/admin/products">

  <button
    className="approve-btn"
  >
    Manage Products
  </button>

</Link>

<Link to='/admin/orders'>

  <button
    className='approve-btn'
  >
    Manage Orders
  </button>

</Link>

</div>

        </div>

      </div>

    </>
  )
}

export default AdminDashboard