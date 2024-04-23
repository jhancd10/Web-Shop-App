import { Badge, Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import LocalMallIcon from "@mui/icons-material/LocalMall"
import ListIcon from '@mui/icons-material/List'
import HistoryIcon from '@mui/icons-material/History'
import { NavLink } from "react-router-dom"
import { WebShopLogo } from "./Logo/WebShopLogo"
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import { useShoppingCartStore } from "../Services/Storage/shopping-cart-hook"
import { useState } from "react"
import ShoppingCartDetail from "../Pages/ShoppingCart/ShoppingCartDetail"

export default function NavBar() {
  
  const logo = WebShopLogo(80, 80)

  const shoppingCart = useShoppingCartStore(state => state.shoppingCart)
  console.log(shoppingCart)

  const [open, setOpen] = useState(false)

  const handleCloseDrawer = () => setOpen(false)
  
  return (
    <>
      <AppBar position="static">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, m: 1, borderRadius: 1 }}>

          <Stack alignItems="center" direction="row" gap={0}>
            {logo}
            <Typography variant="h6">Web Shop</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<ListIcon />} component={NavLink} to="/Categories">Categories</Button>
            <Button color="inherit" startIcon={<LocalMallIcon />} component={NavLink} to="/">Shop</Button>
            <Button color="inherit" startIcon={<HistoryIcon />} component={NavLink} to="/Orders">Orders</Button>
          </Stack>
          
          <IconButton aria-label="Shopping-Cart" size="large" color="inherit" onClick={() => setOpen(true)}>
            <Badge badgeContent={shoppingCart.length} color="warning">
              <ShoppingCartTwoToneIcon fontSize="inherit" />
            </Badge>
          </IconButton>
          
        </Box>
      </AppBar>

      <Drawer PaperProps={{ sx: { width: "40%" } }} open={open} 
        anchor="right" >
          
          <ShoppingCartDetail handleCloseDrawer={ () => handleCloseDrawer() } />
          
      </Drawer>
    </>
  )
}
