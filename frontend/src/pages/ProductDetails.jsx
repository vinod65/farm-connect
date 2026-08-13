import Navbar from '../components/Navbar'
import '../styles/productdetails.css'

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import api from '../api/AxiosConfig'

function ProductDetails() {

  const { id } = useParams()

  const {
    data: product,
    isLoading
  } = useQuery({

    queryKey: ['product', id],

    queryFn: async () => {

      const response = await api.get('/products')

      const foundProduct = response.data.find(
        p => p.id === Number(id)
      )

      return foundProduct
    }

  })

  if (isLoading) {

    return (
      <>
        <Navbar />

        <div
          style={{
            textAlign: "center",
            marginTop: "150px",
            fontSize: "24px",
            fontWeight: "600"
          }}
        >
          Loading Product...
        </div>

      </>
    )
  }

  if (!product) {

    return (
      <>
        <Navbar />

        <div
          style={{
            textAlign: "center",
            marginTop: "150px",
            fontSize: "28px",
            fontWeight: "600"
          }}
        >
          Product Not Found
        </div>

      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className='product-details-page'>

        <div className='product-details-container container'>

          <div className='product-image-section'>

            <img
              src={product.imageUrl}
              alt={product.name}
            />

          </div>

          <div className='product-info-section'>

            <span className='details-category'>
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <p className='details-price'>
              ₹{product.price} / kg
            </p>

            <p className='details-description'>
              Fresh agricultural product directly sourced from farmers.
            </p>

            <div className='details-extra'>

              <p>
                <strong>Seller:</strong> Farm-Connect
              </p>

              <p>
                <strong>Location:</strong> Bangalore
              </p>

            </div>

            <button className='buy-btn'>
              Contact Seller
            </button>

          </div>

        </div>

      </div>

    </>
  )
}

export default ProductDetails
