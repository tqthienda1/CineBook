import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
