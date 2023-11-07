export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskResponse {
    success: boolean;
    message: string;
    data: {
        task: Task;
    }
}

export interface TasksResponse {
    success: boolean;
    message: string;
    data: {
        pagination: {
            totalPage: number;
            currentPage: number;
            previousPage: number | null;
            nextPage: number | null;
        }
        tasks: Task[];
    }
}