import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignUpMutation } from "../../redux/features/api/userApi/userApi";
import Loader from "../../components/loader/Loader";
import useTitle from "../../hooks/useTitle";
import { toast } from 'react-toastify';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    useTitle("Sign Up");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [signup, { isSuccess, error, isLoading }] = useSignUpMutation();

    const onSubmit: SubmitHandler<SignupFormData> = (data) => {
        signup(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/");

            // Display a success toast message
            toast.success("Sign Up successfully!", {
                autoClose: 3000,
            });
        }

        if (error) {
            if ("status" in error) {
                // get backend form validation error message
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                // set backend form validation error message
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [isSuccess, error, navigate]);

    return (
        <div className="bg-[#2DCAC2] min-h-screen flex justify-center items-center">
            <div className="w-[350px] bg-[#fff] rounded-xl mx-auto py-4 px-5">
                <h1 className="uppercase text-center font-semibold text-3xl text-[#2DCAC2] mb-5">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full block px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <input
                        {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full block mt-4 px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full block mt-4 px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <input
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => value === password || "The passwords do not match"
                        })}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full block mt-4 px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                    {errorMessage && <p className="text-red-500 text-center mt-4 text-sm">{errorMessage}</p>}

                    <div className="flex justify-center">
                        {isLoading ? (
                            <div className="mt-4">
                                <Loader />
                            </div>
                        ) : (
                            <input type="submit" value="Sign Up" className="bg-[#2DCAC2] inline-block text-white font-medium mt-4 py-2 px-4 rounded" />
                        )}
                    </div>
                    <Link to="/signin" className="block text-center underline my-5">
                        Already have an account? Login now
                    </Link>
                </form>
            </div>
        </div>
    );
}
