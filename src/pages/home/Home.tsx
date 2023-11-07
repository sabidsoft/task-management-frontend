import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useDeleteTaskMutation, useGetTasksByUserQuery } from "../../redux/features/api/taskApi/taskApi"
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import useTitle from "../../hooks/useTitle";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { toast } from 'react-toastify';

export default function Home() {
    useTitle("Task Manager");
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const [deleteTour] = useDeleteTaskMutation();
    const { data, isLoading, isError } =
        useGetTasksByUserQuery({ userId: user?._id as string, search: searchText, page: currentPage });

    const tasks = data?.data.tasks;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage || 1;

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    // handle delete task
    const handleDeleteTour = (taskId: string) => {
        deleteTour(taskId);

        // Display a success toast message
        toast.success("Task deleted successfully!", {
            autoClose: 3000,
        });
    };

    // logout handler
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate("/signin");

        // Display a success toast message
        toast.success("Logout successfully!", {
            autoClose: 3000,
        });
    };

    // handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    let content;

    if (isLoading)
        content =
            <div className="flex justify-center">
                <Loader />
            </div>;

    if (!isLoading && isError)
        content =
            <div className="mx-auto mb-5 py-10">
                <p className="text-center text-lg">Something went wrong!</p>
            </div>;

    if (!isLoading && !isError && tasks && tasks.length === 0)
        content =
            <div className="mx-auto mb-5 py-10">
                <p className="text-center text-lg">No task available!</p>
            </div>;

    if (!isLoading && !isError && tasks && tasks.length > 0)
        content =
            <>
                {
                    tasks && tasks
                        .map(task => (
                            <div
                                key={task._id}
                                className="flex justify-between items-center w-[70%] mx-auto border border-[#ddd] py-2 px-3 mb-2 rounded-md"
                            >
                                <h3 className="text-lg font-medium capitalize">
                                    {
                                        task.completed ? (
                                            <del>{task.title}</del>
                                        ) : (
                                            task.title
                                        )
                                    }
                                </h3>
                                <div className="flex pl-4">
                                    <Link
                                        to={`/tasks/${task._id}`}
                                        state={task}
                                        className="mr-2 underline text-[#2DCAC2]"
                                    >
                                        Details
                                    </Link>
                                    <Link
                                        to={`/tasks/edit-task/${task._id}`}
                                        state={task}
                                    >
                                        <BiSolidEdit
                                            size={24}
                                            color="#2DCAC2"
                                            title="Edit Task"
                                        />
                                    </Link>
                                    <AiFillDelete
                                        size={24}
                                        color="#DE4C3A"
                                        title="Delete Task"
                                        className="ml-1 cursor-pointer"
                                        onClick={() => handleDeleteTour(task._id)}
                                    />
                                </div>
                            </div>
                        ))
                }


            </>;


    return (
        <div className="bg-[#2DCAC2] min-h-screen py-10">
            <h1 className="uppercase text-center text-4xl font-semibold text-white py-10">Task Manager</h1>
            <div className="w-[50%] mx-auto px-5 py-5 bg-[#fff] rounded-xl">
                <div className="flex justify-end">
                    <button
                        onClick={logout} className="border border-[#2DCAC2] font-semibold py-1 px-4 rounded-md hover:bg-[#2DCAC2] hover:text-white duration-500"
                    >
                        Logout
                    </button>
                </div>
                <div className="my-10">
                    <SearchBar
                        searchText={searchText}
                        handleSubmit={handleSubmit}
                        handleTitleChange={handleTitleChange}
                    />
                </div>
                {content}
                <div className="text-start w-[70%] mx-auto mt-5 mb-5">
                    <Link to="/tasks/add-task" className="bg-[#2DCAC2] inline-block text-white font-medium py-2 px-4 rounded">Add Task</Link>
                </div>
                {
                    totalPage > 1 &&
                    <div className="py-8 text-center">
                        <Pagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                }
            </div>
            
        </div>
    );
}
