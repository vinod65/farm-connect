import { Navigate }
from 'react-router-dom'

function FarmerRoute({
  children
}) {

  const role =
    localStorage.getItem('role')

  return role === 'Farmer'
    ? children
    : <Navigate to='/' />
}

export default FarmerRoute