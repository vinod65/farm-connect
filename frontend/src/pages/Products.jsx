import '../styles/products.css'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useState } from 'react'
import api from '../api/AxiosConfig'

import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

function Products() {

  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const {
    data: products = [],
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['products'],

    queryFn: async () => {
      const response = await api.get('/products')

      localStorage.setItem(
        'products',
        JSON.stringify(response.data)
      )

      return response.data
    },

    placeholderData: () => {
      const cachedProducts = localStorage.getItem('products')

      return cachedProducts
        ? JSON.parse(cachedProducts)
        : []
    }
  })

  const deleteMutation = useMutation({

    mutationFn: (id) => api.delete(`/products/${id}`),

    onSuccess: async () => {

      const response = await api.get('/products')

      localStorage.setItem(
        'products',
        JSON.stringify(response.data)
      )

      queryClient.invalidateQueries({
        queryKey: ['products']
      })

      alert('Product Deleted Successfully')
    },

    onError: () => {
      alert('Failed to Delete Product')
    }

  })

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' ||
      product.category === category

    return matchesSearch && matchesCategory

  })

  return (
    <>
      <Navbar />

      <div className='products-page container'>

        <h1 className='products-title'>
          Explore Fresh Products
        </h1>

        {isFetching && products.length > 0 && (
          <p
            style={{
              textAlign: 'center',
              color: '#28a745',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            🔄 Refreshing latest products...
          </p>
        )}

        <div className='products-controls'>

          <input
            type='text'
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className='filter-buttons'>

            <button onClick={() => setCategory('All')}>
              All
            </button>

            <button onClick={() => setCategory('Vegetables')}>
              Vegetables
            </button>

            <button onClick={() => setCategory('Fruits')}>
              Fruits
            </button>

            <button onClick={() => setCategory('Grains')}>
              Grains
            </button>

          </div>

        </div>

        <div className='products-grid'>

          {/* Loading */}
          {(isLoading || (isFetching && products.length === 0)) ? (

            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '60px'
              }}
            >
              <h3>Loading Products...</h3>
            </div>

          ) : filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                onDelete={() =>
                  deleteMutation.mutate(product.id)
                }
              />

            ))

          ) : (

            <h3
              style={{
                textAlign: 'center',
                width: '100%',
                marginTop: '50px'
              }}
            >
              No Products Found
            </h3>

          )}

        </div>

      </div>

    </>
  )
}

export default Products
