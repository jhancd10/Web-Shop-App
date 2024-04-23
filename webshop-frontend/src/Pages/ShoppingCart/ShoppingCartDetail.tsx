import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useShoppingCartStore } from "../../Services/Storage/shopping-cart-hook"
import RemoveShoppingCartTwoToneIcon from '@mui/icons-material/RemoveShoppingCartTwoTone'
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import React from "react"
import { useCreateNewOrder } from "../../Services/GraphQl/Orders/orders-hooks"

export default function ShoppingCartDetail() {

    const shoppingCart = useShoppingCartStore(state => state.shoppingCart)
    const updateShoppingCart = useShoppingCartStore(state => state.updateShoppingCart)
    const clearShoppingCart = useShoppingCartStore(state => state.clearShoppingCart)

    console.log(shoppingCart)

    const [ createOrder ] = useCreateNewOrder()

    const handleAddCart = (productId: number) => {
        updateShoppingCart(productId, 1)
    }

    const handleRemoveCart = (productId: number) => {
        updateShoppingCart(productId, -1)
    }

    const handleRemoveItem = (productId: number, stock: number) => {
        updateShoppingCart(productId, -stock)
    }

    const handleClearCart = () => {
        clearShoppingCart()
    }

    const handleFinishPurchase = () => {
        
        createOrder({ variables: { 
            orderInput: {
                orderDetail: shoppingCart.map( (prod) => { 
                    return {
                        productId: prod.productId,
                        price: prod.price,
                        quantity: prod.quantity
                    }
                }),
                total: shoppingCart.reduce((sum, current) => sum + (current.price * current.quantity), 0)
            }
         }})

         clearShoppingCart()
    }

    return (
        <>
            <Box style={{ padding: '16px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, borderRadius: 1, mb: 1 }}>
                    <Typography variant="h5">
                        Shopping Cart
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: 1 }}>
                    <Typography variant="subtitle2">
                        Total Products: {shoppingCart.length}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: 1 }}>
                    <Typography variant="subtitle2">
                        Total Items: {shoppingCart.reduce((sum, current) => sum + current.quantity, 0)}
                    </Typography>
                    
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, borderRadius: 1 }}>
                    <Typography variant="subtitle2">
                        Total Value: 
                        $ {shoppingCart.reduce((sum, current) => sum + (current.price * current.quantity), 0)}
                    </Typography>
                    
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1, m: 1, borderRadius: 1 }}>

                    <Button variant="contained" startIcon={<RemoveShoppingCartTwoToneIcon />} 
                            color="error" size="medium" style={{ marginTop: '8px' }}
                            onClick={() => handleClearCart()}>
                        Clear Cart
                    </Button>

                    <Button variant="contained" color="primary" endIcon={<GradingTwoToneIcon />}
                            size="medium" style={{ marginTop: '8px' }}
                            onClick={() => handleFinishPurchase()}>
                        Finish Purchase
                    </Button>

                </Box>

            </Box>

            <List>
                {shoppingCart.map((item, index) => (
                    
                    <React.Fragment key={index}>
                    
                        <ListItem>
                            
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'InfoText' }}>
                                    <ShoppingBagIcon />
                                </Avatar>
                            </ListItemAvatar>
                            
                            <ListItemText primary={item.title}
                                secondary={`[${item.productId} | ${item.productCode}]`}/>
                            
                                <Box sx={{display: 'inline-flex', m: 1, p: 1, mr: 2}}>
                                    <IconButton color="warning" onClick={() => handleRemoveCart(item.productId)}>
                                        <RemoveIcon />
                                    </IconButton>

                                    {item.quantity}
                                    
                                    <IconButton color="success" onClick={() => handleAddCart(item.productId)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            
                                <Box sx={{display: 'inline-flex', m: 1, p: 1}}>
                                    <Typography variant="subtitle2">$ {item.price * item.quantity}</Typography>
                                </Box>
                            
                                <Box sx={{display: 'inline-flex', m: 1, p: 1}}>
                                    <IconButton color="error" size="large" 
                                        onClick={() => handleRemoveItem(item.productId, item.availableStock)}>
                                        <DeleteIcon />                        
                                    </IconButton>
                                </Box>

                        </ListItem>
                        
                        <Divider />
                    
                    </React.Fragment>
                ))}
            </List>
        </>
    )
}