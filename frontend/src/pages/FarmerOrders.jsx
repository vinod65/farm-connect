import { useEffect, useState } from 'react'
import api from '../api/AxiosConfig'
import Navbar from '../components/Navbar'
import '../styles/farmerorders.css'
import '../styles/orders.css'

function FarmerOrders() {

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    try {

      const response =
        await api.get('/orders')

      setOrders(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const updateStatus =
    async (id, status) => {

      try {

        await api.put(
          `/orders/${id}/${status}`
        )

        alert(
          `Order ${status}`
        )

        fetchOrders()

      } catch (error) {

        console.error(error)

        alert(
          'Failed to update order'
        )
      }
    }

  return (

    <>
      <Navbar />

      <div className="orders-page">

        <h1 className="orders-title">
  Farmer Orders
</h1>

        <table className="orders-table">

          <thead>

            <tr>

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

  <span
    className={
      order.status === 'Approved'
        ? 'status-approved'
        : order.status === 'Rejected'
        ? 'status-rejected'
        : 'status-pending'
    }
  >
    {order.status}
  </span>

</td>

                <td>

                  <button className='approve-btn'
                    onClick={() =>
                      updateStatus(
                        order.id,
                        'Approved'
                      )
                    }
                  >
                    Approve
                  </button>

                  <button className='reject-btn'
                    onClick={() =>
                      updateStatus(
                        order.id,
                        'Rejected'
                      )
                    }
                  >
                    Reject
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

export default FarmerOrders