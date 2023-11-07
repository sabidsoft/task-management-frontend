import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export default function NotFound() {
    useTitle("Not Found")
    const navigate = useNavigate();

    // Go backward
    const handleGoBack = () => {
        navigate(-1)
    };

    return (
        <div className="flex justify-center items-center pb-5">
            <div className="mt-56 text-center">
                <h2 className="text-4xl font-semibold mb-8">Opps!</h2>
                <h1 className="text-8xl font-bold mb-8">404</h1>
                <h2 className="text-4xl font-semibold mb-16">Page Not Found!</h2>
                <button
                    onClick={handleGoBack}
                    className="bg-[#2DCAC2] px-4 py-2 rounded text-white font-semibold"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};