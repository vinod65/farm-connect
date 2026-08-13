import { FaStar } from 'react-icons/fa'
import '../styles/productcard.css'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {
  useNavigate,
  Link,
} from 'react-router-dom'
import api from '../api/AxiosConfig'

function ProductCard({
  product,
  onDelete,
}) {

  const { isLoggedIn } =
    useContext(AuthContext)

  const navigate = useNavigate()

  const handleDelete = () => {

    if (!isLoggedIn) {

      alert('Please login first')

      navigate('/login')

      return
    }

    onDelete(product.id)
  }

  const handleEdit = () => {

    if (!isLoggedIn) {

      alert('Please login first')

      navigate('/login')

      return
    }

    navigate('/add-product', {
      state: {
        product
      }
    })
  }

  const role =
  localStorage.getItem('role')

const handleBuy = async (product) => {
  try {
    // Convert string price ("100") to a true number so your backend Double accepts it
    const parsedPrice = parseFloat(product.price) || 0;

    const order = {
  buyer_name: localStorage.getItem('name'),
  buyer_email: localStorage.getItem('email'),
  product_name: product.name,
  price: parsedPrice,
  quantity: 1,
  total_price: parsedPrice,
  status: 'Pending'
}

    await api.post('/orders', order);
    alert('Order Placed Successfully');

  } catch (error) {
    console.error(error);
    alert('Failed to Place Order');
  }
};


  return (

    <div className='product-card'>

      <Link
        to={`/product/${product.id}`}
        className='product-link'
      >

        <img
          src={
            product.imageUrl ||
            'https://via.placeholder.com/300'
          }
          alt={product.name}
        />

        <div className='product-info'>

          <h3>{product.name}</h3>

          <p className='price'>
            ₹{product.price} / kg
          </p>

        </div>

      </Link>

      <div className='rating-section'>

        <div className='stars'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className='inactive-star' />
        </div>

        <p className='rating-text'>
          4.0 Rating (120 Reviews)
        </p>

        {role === 'Buyer' && (
          <button type='button'
          className='buy-btn'
          onClick={()=>
            handleBuy(product)
          } > Buy Now</button>
          
        )}

       {role === 'Farmer' && (   
        <button
          type='button'
          className='edit-btn'
          onClick={handleEdit}
        >
          Edit Product
        </button>
        )}

        {role === 'Farmer' && (
        <button
          type='button'
          className='delete-btn'
          onClick={handleDelete}
        >
          Delete Product
        </button>
        )}

      </div>

    </div>
  )
}

export default ProductCard