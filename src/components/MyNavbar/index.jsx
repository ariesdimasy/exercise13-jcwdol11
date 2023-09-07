import {
  Box,
  Container,
  Menu,
  MenuItem,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function index() {
  return (
    <>
      <Box borderWidth="1px" backgroundColor="#1D5D9B">
        <Container maxW='container.lg'>
          <Menu>
            <Flex>
              <Heading color="white" w="50%" >
               XTXX
              </Heading>
              <Box w="50%" color="white">
                <Flex justifyContent="space-evenly">
                  <MenuItem width="30%">
                    <a href="/"> Home </a>
                  </MenuItem>
                  <MenuItem width="30%">
                    <a href="/register"> Register </a>
                  </MenuItem>
                  <MenuItem width="30%">
                    <a href="/login"> Login </a>
                  </MenuItem>
                 
                </Flex>
              </Box>
            </Flex>
          </Menu>
        </Container>
      </Box>
    </>
  );
}
