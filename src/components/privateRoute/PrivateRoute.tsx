import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/app/hooks";
import { PrivateRouteProps } from "./types";

// This component acts as a private route that checks authentication status before rendering the children.
export default function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = useAppSelector(state => state.auth);
    const location = useLocation();

    // Checking if the user is authenticated (has a token and user data).
    // If authenticated, render the children, otherwise redirect to the sign-in page.
    return auth.token && auth.user ? children :
        (
            <Navigate
                to="/signin"  // Redirects to the sign-in page if not authenticated.
                state={{ from: location }} // Passes the current location for redirection after signing in.
                replace // Replaces the current location in the history with the sign-in page.
            />
        );
};
