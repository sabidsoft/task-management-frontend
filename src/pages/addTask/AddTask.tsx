import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useCreateTaskMutation } from "../../redux/features/api/taskApi/taskApi";
import useTitle from "../../hooks/useTitle";
import { toast } from 'react-toastify';

interface TaskFormData {
    title: string;
    description: string;
    completed: boolean;
}

export default function AddTask() {
    useTitle("Add Task")
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [createTask, { isSuccess, error, isLoading }] = useCreateTaskMutation();

    const onSubmit: SubmitHandler<TaskFormData> = (data) => {
        createTask(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/");

            // Display a success toast message
            toast.success("Task added successfully!", {
                autoClose: 3000,
            });
        }

        if (error) {
            if ("status" in error) {
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [isSuccess, error, navigate]);

    return (
        <div className="bg-[#2DCAC2] min-h-screen flex justify-center items-center">
            <div className="w-[350px] bg-[#fff] rounded-xl mx-auto py-4 px-5">
                <h1 className="uppercase text-center font-semibold text-3xl text-[#2DCAC2] mb-5">Add Task</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("title", { required: "Title is required" })}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full block mt-4 px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    <input
                        {...register("description", { required: "Description is required" })}
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full block mt-4 px-3 py-1 border rounded-md focus:outline-none focus:border-[#267CB5] ${errors.description ? "border-red-500" : ""}`}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <input
                        type="checkbox"
                        {...register("completed")}
                        className="mt-4 mr-1.5"
                    />
                    <label htmlFor="completed">Completed</label>
                    {errors.completed && <p className="text-red-500">{errors.completed.message}</p>}

                    {errorMessage && <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>}

                    <div className="flex justify-center">
                        {isLoading ? (
                            <div className="mt-4">
                                <Loader />
                            </div>
                        ) : (
                            <input type="submit" value="Add Task" className="bg-[#2DCAC2] inline-block text-white font-medium mt-5 mb-2 py-2 px-4 rounded" />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
