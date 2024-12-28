import { FilterOperator } from "./filter-operator";

export interface Filters {
    [key: string]: string | number | boolean | FilterOperator;
}
