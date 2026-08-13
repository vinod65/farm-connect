import Navbar from '../components/Navbar'
import '../styles/admin.css'
import { useEffect, useState } from 'react'
import api from '../api/AxiosConfig'

function AdminOrders() {

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    try {

      const response =
        await api.get('/orders')

      console.log(response.data)
      setOrders(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const deleteOrder =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Delete this order?'
        )

      if (!confirmDelete)
        return

      try {

        await api.delete(
          `/orders/${id}`
        )

        alert(
          'Order Deleted Successfully'
        )

        fetchOrders()

      } catch (error) {

        console.error(error)

        alert(
          'Failed To Delete Order'
        )
      }
    }

  return (

    <>
      <Navbar />

      <div className='admin-page'>

        <h1>
          Manage Orders
        </h1>

        <table
          className='orders-table'
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Buyer</th>

              <th>Product</th>

              <th>Price</th>

              <th>Quantity</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>
                  {order.buyer_name}
                </td>

                <td>
                  {order.product_name}
                </td>

                <td>
                  ₹{order.price}
                </td>

                <td>
                  {order.quantity}
                </td>

                <td>
                  {order.status}
                </td>

                <td>

                  <button
                    className='reject-btn'
                    onClick={() =>
                      deleteOrder(
                        order.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  )
}

export default AdminOrders