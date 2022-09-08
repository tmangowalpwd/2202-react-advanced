import { HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Comment = ({ username, text }) => {
  return (
    <HStack>
      <Text fontSize="sm" fontWeight="bold" alignSelf="start">
        <Link to={`/profile/${username}`}>{username || "username"}</Link>
      </Text>
      <Text fontSize="sm">
        {text ||
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, doloremque?"}
      </Text>
    </HStack>
  )
}

export default Comment

