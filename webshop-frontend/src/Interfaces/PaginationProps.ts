export interface PaginationProps {
    
    totalPages: number
    page: number
    
    onPageChange: (
        event: React.ChangeEvent<unknown>,
        newPage: number,
    ) => void
}