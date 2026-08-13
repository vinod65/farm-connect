import {Navigate} from 'react-router-dom'
function BuyerRoute ({ children}) {
    const role = localStorage.getItem('role');
    return role == "Buyer" ? children : <Navigate to="/"/>;
}
export default BuyerRoute;