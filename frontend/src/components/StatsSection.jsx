import '../styles/stats.css'

function StatsSection() {
  return (
    <section className='stats-section'>

      <div className='container'>

        <h1 className='stats-title'>
          Why Choose Farm-Connect?
        </h1>

        <div className='stats-grid'>

          <div className='stats-card'>
            <h2>120+</h2>
            <p>Products Listed</p>
          </div>

          <div className='stats-card'>
            <h2>45+</h2>
            <p>Farmers Connected</p>
          </div>

          <div className='stats-card'>
            <h2>88+</h2>
            <p>Active Buyers</p>
          </div>

          <div className='stats-card'>
            <h2>15+</h2>
            <p>Categories</p>
          </div>

        </div>

      </div>

    </section>
  )
}

export default StatsSection