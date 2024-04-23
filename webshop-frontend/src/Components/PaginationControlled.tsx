import { Pagination, Stack, Typography } from "@mui/material"
import { PaginationProps } from "../Interfaces/PaginationProps"

export default function PaginationControlled(props: PaginationProps) {

    const { totalPages, page, onPageChange } = props
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(event, value)
    }
  
    return (
      <Stack spacing={1}>
        
        <Pagination count={totalPages} page={page} onChange={handleChange} />
        
        <Typography variant="h6" component="h3">
            Page {page} of {totalPages}
        </Typography>

      </Stack>
    )
}