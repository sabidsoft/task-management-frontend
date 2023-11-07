import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/app/hooks";
import { userLoggedIn } from "../redux/features/auth/authSlice";

// Custom hook for performing initial authentication check
export default function useInitialAuthCheck() {
    const [initialAuthChecked, setInitialAuthChecked] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check for authentication details in local storage
        const localAuth = localStorage.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            // If both token and user details exist, log the user in by dispatching the action
            if (auth.token && auth.user) {
                dispatch(userLoggedIn({
                    token: auth.token,
                    user: auth.user
                }));
            }
        }

        // Set the flag indicating the initial authentication check is completed
        setInitialAuthChecked(true);
    }, [dispatch]);

    return initialAuthChecked;
};