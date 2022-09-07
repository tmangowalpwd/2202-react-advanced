import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { useSelector } from "react-redux"

const Post = ({ username, body, imageUrl, userId, onDelete }) => {
  const authSelector = useSelector((state) => state.auth)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const confirmDeleteBtnHandler = () => {
    onClose()
    onDelete()
  }

  return (
    <>
      <Box borderColor="gray.300" borderWidth="1px" p="6" borderRadius="8px">
        <HStack justifyContent="space-between">
          <Text fontSize="sm" fontWeight="extrabold">
            {username || "Username"}
          </Text>
          {authSelector.id === userId ? (
            <Menu>
              <MenuButton>
                <Icon as={BsThreeDots} boxSize="20px" />
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem onClick={onOpen}>Delete</MenuItem>
              </MenuList>
            </Menu>
          ) : null}
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

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={confirmDeleteBtnHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Post

