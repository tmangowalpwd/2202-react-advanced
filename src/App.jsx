import { Box, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"

const App = () => {
  const authSelector = useSelector((state) => state.auth)

  return (
    <Box>
      <Text fontSize="4xl" fontWeight="bold">
        Hello World {authSelector.id}
      </Text>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Box>
  )
}

export default App

