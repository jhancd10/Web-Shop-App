import { Alert, Box, CircularProgress, Stack } from "@mui/material"
import { useCategoriesReport } from "../../Services/GraphQl/Categories/categories-hooks"
import CustomPaginationTable from "./CategoriesTable"

export default function Categories() {

    const { data, loading, error } = useCategoriesReport(0, 5)

    console.log(data)
    
    if (error) return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error.message}</Alert>
        </Stack>
    )

    return(
        <>
            {loading ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> 
                :
                <>
                    <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                        <Alert severity="success">Categories loaded successfully</Alert>
                    </Stack>

                    <CustomPaginationTable data={data.allCategories} />
                </>
            }
        </>
    )
}