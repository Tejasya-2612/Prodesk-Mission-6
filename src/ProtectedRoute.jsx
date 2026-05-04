import { Navigate } from "react-router-dom";
import { useAuth } from "./context";

// Wraps any route that requires the user to be logged in.
// If not logged in, redirects to /login.
export default function ProtectedRoute({ children }) {
const { user } = useAuth();
return user ? children : <Navigate to="/login" replace />;
}