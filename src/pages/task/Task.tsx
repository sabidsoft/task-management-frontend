import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { useDeleteTaskMutation } from "../../redux/features/api/taskApi/taskApi";
import useTitle from "../../hooks/useTitle";

export default function Task() {
    useTitle("Task");
    const navigate = useNavigate();
    const location = useLocation();
    const [deleteTour] = useDeleteTaskMutation();

    const { _id, title, description } = location.state;

    // handle delete task
    const handleDeleteTour = (taskId: string) => {
        deleteTour(taskId);
        navigate("/");
    };

    return (
        <div className="bg-[#2DCAC2] min-h-screen flex justify-center items-center">
            <div className="w-[450px] bg-[#fff] rounded-xl mx-auto py-8 px-8">
                <h1 className="uppercase text-center font-semibold text-3xl text-[#2DCAC2] mb-5">Task</h1>
                <h3 className="text-xl font-semibold">Title:</h3>
                <p className="mb-3">{title}</p>
                <h3 className="text-xl font-semibold">Description:</h3>
                <p>{description}</p>

                <div className="flex justify-between mt-5">
                    <Link
                        to={`/tasks/edit-task/${_id}`}
                        state={location.state}
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
                        onClick={() => handleDeleteTour(_id)}
                    />
                </div>
            </div>
        </div>
    );
}