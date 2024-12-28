export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number; // total de paginas
    };
}