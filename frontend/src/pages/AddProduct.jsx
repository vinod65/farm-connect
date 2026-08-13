import Navbar from '../components/Navbar'
import '../styles/addproduct.css'
import {
  useState,
  useEffect,
} from 'react'

import api from '../api/AxiosConfig'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

function AddProduct() {

  const location = useLocation()

  const navigate =
    useNavigate()

  const editProduct =
    location.state?.product

  const [name, setName] =
    useState('')

  const [category, setCategory] =
    useState('Vegetables')

  const [price, setPrice] =
    useState('')

  const [description,
    setDescription] =
    useState('')

  const [quantity,
    setQuantity] =
    useState('')

  const [imageUrl,
    setImageUrl] =
    useState('')

  useEffect(() => {

    if (editProduct) {

      setName(editProduct.name)

      setCategory(
        editProduct.category
      )

      setPrice(
        editProduct.price
      )

      setQuantity(
        editProduct.quantity
      )

      setImageUrl(
        editProduct.imageUrl
      )

      setDescription(
        editProduct.description
      )
    }

  }, [editProduct])

  useEffect(() => {

  const role =
    localStorage.getItem('role')

  if (role !== 'Farmer') {

    alert(
      'Access Denied'
    )

    navigate('/')
  }

}, [navigate])

const handleAddProduct = async (e) => {

  e.preventDefault()

  // Validation Starts Here

  if (
    !name.trim() ||
    !price ||
    !quantity ||
    !imageUrl.trim() ||
    !description.trim()
  ) {

    alert('All fields are required')
    return
  }

  if (parseFloat(price) <= 0) {

    alert('Price must be greater than 0')
    return
  }

  if (parseInt(quantity) <= 0) {

    alert('Quantity must be greater than 0')
    return
  }

  // Validation Ends Here

  const product = {

    name,

    category,

    price: parseFloat(price),

    quantity: parseInt(quantity),

    imageUrl,

    description
  }

      try {

        if (editProduct) {

          await api.put(
  `/products/${editProduct.id}`,
  product
)

          alert(
            'Product Updated Successfully'
          )

        } else {

          await api.post(
  '/products',
  product
)

          alert(
            'Product Added Successfully'
          )
        }

        navigate('/products')

      } catch (error) {

        console.error(error)

        alert(
          'Operation Failed'
        )
      }
    }

  return (
    <>
      <Navbar />

      <div className='add-product-page'>

        <div className='add-product-container'>

          <h1>

            {editProduct
              ? 'Edit Product'
              : 'Add New Product'}

          </h1>

          <p>
            Upload fresh agricultural
            products to the marketplace.
          </p>

          <form
            className='add-product-form'
            onSubmit={
              handleAddProduct
            }
          >

            <div className='form-group'>

              <label>
                Product Name
              </label>

              <input
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

            </div>

            <div className='form-group'>

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                <option>
                  Vegetables
                </option>

                <option>
                  Fruits
                </option>

                <option>
                  Grains
                </option>

                <option>
                  Dairy
                </option>

              </select>

            </div>

            <div className='form-group'>

              <label>
                Price
              </label>

              <input
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
              />

            </div>

            <div className='form-group'>

              <label>
                Quantity
              </label>

              <input
                type='number'
                placeholder='Enter quantity'
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
              />

            </div>

            <div className='form-group'>

              <label>
                Image URL
              </label>

              <input
                type='text'
                placeholder='Paste image URL'
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(
                    e.target.value
                  )
                }
              />

            </div>

            <div className='form-group'>

              <label>
                Description
              </label>

              <textarea
                rows='5'
                placeholder='Enter product description'
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className='add-product-btn'
            >

              {editProduct
                ? 'Update Product'
                : 'Add Product'}

            </button>

          </form>

        </div>

      </div>

    </>
  )
}

export default AddProduct