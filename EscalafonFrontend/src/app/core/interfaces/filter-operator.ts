export interface FilterOperator {
    operator: 'equals' | 'like' | 'greater' | 'less';
    value: any;
}