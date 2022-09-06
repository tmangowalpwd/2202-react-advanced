import { Box, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const App = () => {
  const authSelector = useSelector((state) => state.auth)

  return (
    <Box>
      <Text fontSize="4xl" fontWeight="bold">
        Hello World {authSelector.id}
      </Text>
    </Box>
  )
}

export default App

