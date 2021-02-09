import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Test Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <Box width="100%" px={{ base: "2%", sm: "5%", md: "20%" }}>
          <Input placeholder="Ingrese el nombre del usuario" />
          <Center>
            <Button colorScheme="blue" type="submit" mt="4">
              CREATE
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
}
