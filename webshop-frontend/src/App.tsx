/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Alert, Box, CircularProgress, Container, Stack } from "@mui/material"
import NavBar from "./Components/NavBar"
import { Route, Routes } from "react-router-dom"
import Shop from "./Pages/Shop/Shop"
import Categories from "./Pages/Categories/Categories"
import Orders from "./Pages/Orders/Orders"
import { useShoppingCartStore } from './Services/Storage/shopping-cart-hook'
import { useAllProducts } from './Services/GraphQl/Products/products-hooks'
import { useEffect } from 'react'
import { ProductStorage } from './Types/types'

const theme = createTheme()

function App() {

  const fetchProducts = useShoppingCartStore(state => state.fetchProducts)

  const { data, loading, error } = useAllProducts()

  useEffect( () => {

    if (data) {

      const products: ProductStorage[] = data.allProductsTotal.map( (prod: any) => {
        
        return ({
          productId: prod.product_Id,
          productCode: prod.product_Code,
          title: prod.title,
          description: prod.description,
          price: prod.price,
          availableStock: prod.available_Stock,
          quantity: 0
        })
      })

      fetchProducts(products)
    }

  }, [data])

  if (error) return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{error.message}</Alert>
    </Stack>
  )

  return (
    <>
      {loading ? 
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box> 
        :
        <ThemeProvider theme={theme}>
          <NavBar />

          <Container sx={{ mt: 5 }}>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Orders" element={<Orders />} />
            </Routes>
          </Container>
        </ThemeProvider>}
    </>
  )
}

export default App
