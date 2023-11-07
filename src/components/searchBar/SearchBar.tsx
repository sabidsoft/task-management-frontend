
import { SearchBarProps } from "./types";

export default function SearchBar({
    searchText,
    handleSubmit,
    handleTitleChange,
}: SearchBarProps) {

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex
                justify-center
                items-center
            "
        >
            <input
                type="search"
                value={searchText}
                onChange={handleTitleChange}
                placeholder="Search task by title..."
                className="
                        w-[400px]
                        inline-block
                        px-5
                        py-2
                        border
                        rounded-full
                        focus:outline-none
                        focus:border-[#2DCAC2]
                    "
            />
        </form>
    );
};