import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'

import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import { Routes, Route } from 'react-router-dom'
import MyOrders from './pages/MyOrders'
import FarmerOrders
from './pages/FarmerOrders'

import AdminDashboard
from './pages/AdminDashboard'

import AdminUsers 
from './pages/AdminUsers'

import AdminProducts
from './pages/AdminProducts'

import AdminOrders
from './pages/AdminOrders'

import AdminRoute from './components/AdminRoute'

import BuyerRoute from './components/BuyerRoute'
import FarmerRoute from './components/FarmerRoute'

function App() {

  return (

   <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/products' element={<Products />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />

  <Route
    path="/dashboard"
    element={
        <Dashboard />
    }
  />

  <Route 
  path='/add-product' 
  element={
    <FarmerRoute>
  <AddProduct />
  </FarmerRoute>
}
/>

  <Route path='/product/:id' element={<ProductDetails />} />
  <Route path='/my-orders' element={
    <BuyerRoute>
    <MyOrders />
    </BuyerRoute>
    } />

  <Route path="/farmer-orders" element={
   <FarmerRoute>
   <FarmerOrders />
  </FarmerRoute>
  }   
    />

  {/* Admin Routes - Adjusted to unique sub-paths */}
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    }
  />
  
  {/* Added missing orders route mapped in your Navbar */}
  <Route
    path="/admin/orders"
    element={
      <AdminRoute>
        <AdminOrders />
      </AdminRoute>
    }
  />
</Routes>


    
  )
}

export default App