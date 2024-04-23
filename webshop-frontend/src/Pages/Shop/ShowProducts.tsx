/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Grid, Stack } from "@mui/material";
import { Category, Product } from "../../Interfaces/Product";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import PaginationControlled from "../../Components/PaginationControlled";
import { useProductsLazy } from "../../Services/GraphQl/Products/products-hooks";

export default function ShowProducts(props: any | null) {

    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([] as Product[])
    const [total, setTotal] = useState(0)

    console.log(props)

    const [getProducts, result] = useProductsLazy(
                                    props.data.productsPerPage * (page-1), 
                                    props.data.productsPerPage, 
                                    props.data.category, 
                                    props.data.price)

	const refetchProducts = () => {
		getProducts()
	}

    useEffect( () => {

        const allProductsData: Product[] = props.data.items.map( (prod: any) => {

            const categories: Category[] = prod.category.map( (cat: any) => {
                return ({
                    name: cat.category_Name,
                    icon: cat.category_Icon
                })
            })

            return ({
                productId: prod.product_Id,
                productCode: prod.product_Code,
                title: prod.title,
                description: prod.description,
                price: prod.price,
                availableStock: prod.available_Stock,
                categories: categories
            })
        })

        setProducts(allProductsData)
        setTotal(props.data.totalCount)

    }, [props])

    useEffect( () => {

        if (result.data) { 
			
			console.log(result.data)
    
			const newProducts: Product[] = result.data.allProducts.items.map( (prod: any) => {
				
				const categories: Category[] = prod.category.map( (cat: any) => {
					
					return ({
						name: cat.category_Name,
						icon: cat.category_Icon
					})
				})

				return ({
					productId: prod.product_Id,
					productCode: prod.product_Code,
					title: prod.title,
					description: prod.description,
					price: prod.price,
					availableStock: prod.available_Stock,
					categories: categories,
				})
			})
			
			setProducts(newProducts)
        }
    
    }, [result])



    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        refetchProducts()
    };

    return (
        <>
			<Grid container justifyContent="center" alignItems="center" sx={{ mb: 3 }} style={{textAlign: "center"}}>
				
                <PaginationControlled totalPages={Math.ceil(total / props.data.productsPerPage)} 
                                    page={page} onPageChange={handleChange} />
                                    
			</Grid>

            {products.length !== 0 ?
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            
                            {products.map( (prod: Product) => (
                                <Grid key={prod.productId} item>
                                    <ProductCard { ...prod}></ProductCard>
                                </Grid>
                            ))}

                        </Grid>
                    </Grid>
                </Grid>
                :
                <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                    <Alert severity="warning">There are no products available</Alert>
                </Stack>
            }
			
			<Grid container justifyContent="center" alignItems="center" sx={{ mt: 5, mb: 3 }} style={{textAlign: "center"}}>
				
                <PaginationControlled totalPages={Math.ceil(total / props.data.productsPerPage)} 
                                    page={page} onPageChange={handleChange} />
                                    
			</Grid>
        </>
    )
}