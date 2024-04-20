import { Container } from "@mui/material"
import NavBar from "./Components/NavBar"
import { Route, Routes } from "react-router-dom"
import Shop from "./Pages/Shop"
import Categories from "./Pages/Categories/Categories"
import Orders from "./Pages/Orders"


function App() {

  return (
      <>
        <NavBar />

        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Orders" element={<Orders />} />
          </Routes>
        </Container>
      </>
  )
}

export default App
