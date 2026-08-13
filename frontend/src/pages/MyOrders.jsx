import api from '../api/AxiosConfig'
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import '../styles/orders.css'

function MyOrders() {
    const[orders, setOrders] = useState([])
    useEffect(()=> {
        fetchOrders()
    },[])

   const fetchOrders = async () => {
  try {

    const response = await api.get('/orders')

    const buyerName =
      localStorage.getItem('name')

    console.log(
      "Logged User =",
      buyerName
    )

    console.log(
      "Orders =",
      response.data
    )
const buyerEmail =
  localStorage.getItem('email')

const myOrders = response.data.filter(
  order =>
    order.buyer_email === buyerEmail
)

    console.log(
      "Filtered Orders =",
      myOrders
    )

    setOrders(myOrders)

  } catch (error) {
    console.error(error)
  }
}

    return (
        <>
        <Navbar/>
            <div className="orders-page">

                <h1 className="orders-title">
  My Orders
</h1>

                <table className="orders-table">

                    <thead>

                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
            <tbody>

            {orders.map(order => (

              <tr key={order.id}>

                <td>{order.product_name}</td>

                <td>
                  ₹{order.price}
                </td>

                <td>
                  {order.quantity}
                </td>

                <td>
                  {order.status}
                </td>

              </tr>

            ))}

          </tbody>
          

                </table>
            </div>
        </>

    )

}export default MyOrders