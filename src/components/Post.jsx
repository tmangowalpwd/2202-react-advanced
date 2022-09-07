import {
  Box,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"

const Post = ({ username, body, imageUrl }) => {
  return (
    <Box borderColor="gray.300" borderWidth="1px" p="6" borderRadius="8px">
      <HStack justifyContent="space-between">
        <Text fontSize="sm" fontWeight="extrabold">
          {username || "Username"}
        </Text>
        <Menu>
          <MenuButton>
            <Icon as={BsThreeDots} boxSize="20px" />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Text>
        {body ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex veritatis voluptas aperiam repellendus perferendis facere beatae adipisci molestias molestiae!"}
      </Text>
      <Image
        borderRadius="4px"
        height="200px"
        width="100%"
        objectFit="cover"
        mt="4"
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1662469838214-a97415cd83fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        }
      />
    </Box>
  )
}

export default Post

