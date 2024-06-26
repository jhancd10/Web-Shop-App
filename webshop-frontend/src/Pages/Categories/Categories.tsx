import { Alert, CircularProgress, Grid, Stack } from "@mui/material"
import { useCategoriesReport } from "../../Services/GraphQl/Categories/categories-hooks"
import CategoriesTable from "./CategoriesTable"

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
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '100vh' }}>

                    <CircularProgress />

                </Grid> 
                :
                <>
                    <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                        <Alert severity="success">Categories loaded successfully</Alert>
                    </Stack>

                    <CategoriesTable data={data.allCategories} />
                </>
            }
        </>
    )
}