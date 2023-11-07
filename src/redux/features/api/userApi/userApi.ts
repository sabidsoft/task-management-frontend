import { userLoggedIn } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { SignUp } from "./types";

// Creating API endpoints for user-related actions
export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation for user sign-up
        signUp: builder.mutation<any, SignUp>({
            query: (data) => ({
                url: '/api/v1/users/signup',
                method: 'POST',
                body: data
            }),

            // Perform actions when the sign-up query starts
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // Store authentication data in localStorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Store authentication data in the Redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));
                }
                catch (err) { }
            }
        }),

        // Mutation for user sign-in
        signIn: builder.mutation<any, { email: string, password: string }>({
            query: (data) => ({
                url: '/api/v1/users/signin',
                method: 'POST',
                body: data
            }),

            // Perform actions when the sign-in query starts
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // Store authentication data in localStorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Store authentication data in the Redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));
                }
                catch (err) { }
            }
        }),
    })
})

export const {
    useSignUpMutation,
    useSignInMutation
} = userApi;