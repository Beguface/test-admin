import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import "isomorphic-fetch";
import Head from "next/head";
import AvailablePages from "../components/AvailablePages/AvailablePages";
import { useForm } from "../hooks/useForm";

export default function Home({ users }) {
  const [{ user }, handleInputChange, reset] = useForm({
    user: "",
  });

  const toast = useToast();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user.trim().length <= 1) {
      return;
    }

    toast({
      title: `Account ${user} created.`,
      description: "We've created your account for you.",
      status: "success",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
    reset();
  };

  return (
    <>
      <Head>
        <title>Test Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center p="10%" flexDir="column">
        <Heading as="h1" size="2xl">
          Create User
        </Heading>
        <Box width="100%" my="10" px={{ base: "2%", sm: "5%", md: "20%" }}>
          <form onSubmit={handleOnSubmit}>
            <Input
              placeholder="Enter a name"
              name="user"
              onChange={handleInputChange}
              value={user}
            />
            <Center>
              <Button colorScheme="blue" type="submit" mt="4">
                CREATE
              </Button>
            </Center>
          </form>
        </Box>
        <AvailablePages title="Users" pages={users} />
      </Center>
    </>
  );
}

export async function getServerSideProps({ res }) {
  try {
    let req = await fetch("https://test-admin-frontend.vercel.app/api/users");
    let { data } = await req.json();

    return { props: { users: data, statusCode: 200 } };
  } catch (e) {
    res.statusCode = 503;
    return { props: { users: null, statusCode: 503 } };
  }
}
