import { useEffect } from "react";

// Custom hook useTitle to dynamically set the document title
const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Task Manager") {
            document.title = `Task Manager`;
        } else {
            document.title = `${title} | Task Manager`;
        }
    }, [title]);
};

export default useTitle;