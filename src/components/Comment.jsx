import { HStack, Text } from "@chakra-ui/react"

const Comment = ({ username, text }) => {
  return (
    <HStack>
      <Text fontSize="sm" fontWeight="bold" alignSelf="start">
        {username || "username"}
      </Text>
      <Text fontSize="sm">
        {text ||
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, doloremque?"}
      </Text>
    </HStack>
  )
}

export default Comment

