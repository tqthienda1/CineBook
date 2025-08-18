import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.role !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default UserRoute;
