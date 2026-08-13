import Navbar from '../components/Navbar'
import '../styles/admin.css'
import { useEffect, useState } from 'react'
import api from '../api/AxiosConfig'

function AdminProducts() {

  const [products, setProducts] =
    useState([])

  useEffect(() => {

    fetchProducts()

  }, [])

  const fetchProducts = async () => {

    try {

      const response =
        await api.get(
          '/products'
        )

      setProducts(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const deleteProduct =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Are you sure?'
        )

      if (!confirmDelete)
        return

      try {

         await api.delete(`/products/${id}`)

        alert(
          'Product Deleted Successfully'
        )

        fetchProducts()

      } catch (error) {

        console.error(error)

        alert(
          'Failed To Delete Product'
        )
      }
    }

  return (

    <>
      <Navbar />

      <div className='admin-page'>

        <h1>
          Manage Products
        </h1>

        <table
          className='orders-table'
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Category</th>

              <th>Price</th>

              <th>Quantity</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map(product => (

              <tr key={product.id}>

                <td>
                  {product.id}
                </td>

                <td>
                  {product.name}
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  {product.quantity}
                </td>

                <td>

                  <button
                    className='reject-btn'
                    onClick={() =>
                      deleteProduct(
                        product.id
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

export default AdminProducts