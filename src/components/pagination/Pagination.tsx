import { PaginationProps } from "./types";

export default function Pagination({ totalPage, currentPage, handlePageChange }: PaginationProps) {
    // Setting the maximum number of page buttons to display
    let maxPageButtons = 10;

    // Adjust maxPageButtons for smartphone view (less than or equal to 480px width)
    if (window.innerWidth <= 480) {
        maxPageButtons = 5;
    }

    // Calculating half of the maximum buttons to determine the range around the current page
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the range of page buttons to display based on current page and total pages
    let startPage = Math.max(currentPage - halfMaxButtons, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPage);

    // Adjusting startPage if the difference between endPage and startPage is less than maxPageButtons
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    // Creating an array of page numbers to display
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`hover:bg-[#F4F4F4] text-[#606266] text-xl font-medium disabled:opacity-20 rounded-full w-10 h-10 mr-2`}
            >
                {"<"}
            </button>
            {
                pageNumbers.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={
                            page === currentPage ?
                                "bg-[#2DCAC2] text-white text-xl font-medium rounded-full w-10 h-10 mr-2"
                                :
                                "hover:bg-[#F4F4F4] text-[#606266] font-medium rounded-full w-10 h-10 mr-2"
                        }
                    >
                        {page}
                    </button>
                ))
            }
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className={`hover:bg-[#F4F4F4] text-[#606266] text-xl font-medium disabled:opacity-20 rounded-full w-10 h-10`}
            >
                {">"}
            </button>
        </>
    );
};