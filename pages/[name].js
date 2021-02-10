import { Button, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Error from "next/error";

const userPage = ({ user, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Center h="100vh" flexDirection="column">
      <Text as="h2" fontSize="lg">{`This page is for: `}</Text>
      <Heading as="span">{user?.name}</Heading>
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

export async function getServerSideProps({ query }) {
  let { name } = query;
  try {
    let req = await fetch(`${process.env.APP_URI}/api/users/${name}`);
    let { data } = await req.json();
    return { props: { user: data, statusCode: 200 } };
  } catch (e) {
    return {
      props: {
        user: null,
        statusCode: 503,
      },
    };
  }
}
