import React from "react";
import { useRouter } from "next/router";
import { Button, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const userPage = () => {
  const router = useRouter();

  return (
    <Center h="100vh" flexDirection="column">
      <Text as="h2" fontSize="lg">{`This page is for: `}</Text>
      <Heading as="span">{router.query.name}</Heading>
      <Center mt="4">
        <Link href="/" passHref>
          <Button mr="5">BACK</Button>
        </Link>

        <Button colorScheme="blue">SHARE</Button>
      </Center>
    </Center>
  );
};

export default userPage;
