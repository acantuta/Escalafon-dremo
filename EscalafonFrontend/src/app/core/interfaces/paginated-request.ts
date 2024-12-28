import { Filters } from "./filters";

export interface PaginatedRequest {
    filters: Filters;
    page: number;
    pageSize: number;
    sortColumn?: string;
    sortOrder?: 'ASC' | 'DESC';
}