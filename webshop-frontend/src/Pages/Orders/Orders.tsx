import { Alert, CircularProgress, Grid, Stack } from "@mui/material"
import { useOrders } from "../../Services/GraphQl/Orders/orders-hooks"
import OrdersTable from "./OrdersTable"

export default function Orders() {

    const { data, loading, error } = useOrders()

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
                        <Alert severity="success">Orders loaded successfully</Alert>
                    </Stack>

                    <OrdersTable data={data.allOrders} />
                </>
            }
        </>
    )
}