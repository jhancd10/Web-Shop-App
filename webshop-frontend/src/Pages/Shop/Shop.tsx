/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from "@mui/material"
import { useCategories } from "../../Services/GraphQl/Categories/categories-hooks"
import Products from "./Products"
import { useState } from "react"
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

export default function Shop() {

    const { data, loading, error } = useCategories()

    console.log(data)

    const [productsPerPage, setProductsPerPage] = useState('6')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)

    const handleProductsPerPageChange = (event: SelectChangeEvent) => {
        setProductsPerPage(event.target.value as string)
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setPrice(newValue)
        }
    }

    const handleClearFilters = () => {
        setProductsPerPage('6')
        setCategory('')
        setPrice(0)
    }

    return(
        <>
            {error ?
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{error.message}</Alert>
                </Stack>
                :
                loading ?
                    <></>
                    :
                    <Accordion sx={{ mb: 6 }} elevation={12}>
                        
                        <AccordionSummary expandIcon={<FilterListIcon />} 
                            aria-controls="panel1-content" id="panel1-header">
                                <Typography variant="h6">
                                    Filters
                                </Typography>
                        </AccordionSummary>

                        <AccordionDetails>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', 
                                    mb: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                                
                                <Button variant="contained" startIcon={<FilterListOffIcon />} 
                                        color="error" size="small" onClick={handleClearFilters}>
                                    Clear Filters
                                </Button>
                                
                            </Box>
                                
                            <Box sx={{display: 'flex', justifyContent: 'space-around', 
                                    p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 1}} >

                                <Box sx={{ width: 150 }}>
                                    <FormControl fullWidth>

                                        <InputLabel id="select-products-label">Products Per Page</InputLabel>
                                        
                                        <Select labelId="select-products-label" id="select-products"
                                                value={productsPerPage} label="Products Per Page" 
                                                onChange={handleProductsPerPageChange}>
                                            
                                            {[2, 4, 6, 8, 10].map( (item: number) => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}

                                        </Select>

                                    </FormControl>
                                </Box>
                                
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>

                                        <InputLabel id="select-categories-label">Category</InputLabel>
                                        
                                        <Select labelId="select-categories-label" id="select-categories"
                                                value={category} label="Category" onChange={handleCategoryChange}>
                                            
                                            {data.allCategories.items.map( (cat: any) => (
                                                <MenuItem key={cat.category_Id} value={cat.category_Id}>{cat.category_Name}</MenuItem>
                                            ))}

                                        </Select>

                                    </FormControl>
                                </Box>

                                <Box sx={{ width: 150 }}>
                                
                                    <Typography variant="subtitle2" id="non-linear-slider" gutterBottom>
                                        Minimum Price: ${price}
                                    </Typography>

                                    <Slider
                                        aria-label="non-linear-slider"
                                        defaultValue={0}
                                        value={price} 
                                        getAriaValueText={(value: number) => `$${value}`}
                                        valueLabelDisplay="auto"
                                        step={100} 
                                        min={0} max={1000}
                                        valueLabelFormat={(value: number) => `$${value}`}
                                        onChange={handlePriceChange} />
                                </Box>
                                
                            </Box>

                        </AccordionDetails>

                    </Accordion>
            }

            <Products data={ { productsPerPage: productsPerPage, category: category, price: price }} />
        </>
    )
}