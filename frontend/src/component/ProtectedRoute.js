import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.IsLogged ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export { ProtectedRoute };
