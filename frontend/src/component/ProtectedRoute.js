import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.isLogged ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export { ProtectedRoute };
