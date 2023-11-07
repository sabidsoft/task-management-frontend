export interface PaginationProps {
    totalPage: number;
    currentPage: number;
    handlePageChange: (newPage: number) => void;
}