/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, CircularProgress, Grid, Stack } from "@mui/material"
import { useProducts } from "../../Services/GraphQl/Products/products-hooks"
import ShowProducts from "./ShowProducts"

export default function Products(props: any) {
    
    const { data, loading, error } = useProducts(
        0, 
        parseInt(props.data.productsPerPage), 
        props.data.category === '' ? null : parseInt(props.data.category), 
        props.data.price === 0 ? null : props.data.price
    )

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
                <ShowProducts 
                    data={{ 
                             ...data.allProducts, 
                             productsPerPage: parseInt(props.data.productsPerPage),
                             category: props.data.category === '' ? null : parseInt(props.data.category),
                             price: props.data.price === 0 ? null : props.data.price 
                    }} />
            }
        </>
    )
}