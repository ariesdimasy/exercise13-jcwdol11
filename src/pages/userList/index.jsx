import { useEffect } from "react";

import {
  Center,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../app/features/user/userSlice";

export default function Index() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Container maxW='container.lg'>
        <Center>
          <Heading margin={"20px 0"} as={"h3"}> User List </Heading>
        </Center>
        <TableContainer>
          <Table>
            <Thead>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>Email</Th>
            </Thead>

            <Tbody>
              {userList?.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    </Container>
  );
}
