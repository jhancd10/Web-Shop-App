import { Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>Web Shop</Typography>

          <Button color="inherit" startIcon={<LocalMallIcon />} component={NavLink} to="/">Shop</Button>

          <Button color="inherit" startIcon={<ListIcon />} component={NavLink} to="/Categories">Categories</Button>

          <Button color="inherit" startIcon={<HistoryIcon />} component={NavLink} to="/Orders">Orders</Button>

        </Toolbar>
      </AppBar>
    </>
  );
}
