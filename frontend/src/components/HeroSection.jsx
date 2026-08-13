import '../styles/hero.css'
import { useNavigate } from 'react-router-dom'


function HeroSection() {

  const navigate = useNavigate()

  return (
    <section className='hero'>

      

      <div className='container hero-container'>

        <div className='hero-content'>

          <h1>
            Smart Agricultural Marketplace Platform
          </h1>

          <p>
            Farm-Connect helps farmers and buyers connect directly
            through a modern digital marketplace platform.
            Discover fresh products, demand analytics,
            and local farming communities.
          </p>

          <button onClick={() => navigate('/products')}>
  Explore Products
</button>

        </div>

        <div className='hero-image'>
          <img
            src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop'
            alt='farm'
          />
        </div>

      </div>

    </section>
  )
}

export default HeroSection