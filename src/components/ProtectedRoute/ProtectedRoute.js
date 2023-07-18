import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  const jwt = localStorage.getItem('jwt')

  return (
    jwt ? <Component {...props} /> : <Navigate to="/signin" replace/>
)};

export default ProtectedRoute;
