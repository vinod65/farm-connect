import { Navigate } from 'react-router-dom'

// Fixed spelling of 'children' and 'role'
function AdminRoute({ children }) {
    const role = localStorage.getItem('role')
    return role === 'Admin' ? children : <Navigate to='/'/>
}

export default AdminRoute
