import { useState } from "react";
import { Button, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Error from "next/error";
import firebaseDynamicLinks from "../utils/firebase";
import SharedLink from "../components/SharedLink/SharedLink";

const userPage = ({ user, statusCode }) => {
  const [link, setLink] = useState({
    shortLink: null,
    isLoading: false,
  });

  const { shortLink, isLoading } = link;

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const handleGetLink = async () => {
    setLink({ ...link, isLoading: true });
    const { shortLink } = await firebaseDynamicLinks.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: "https://electricbirdcage.page.link",
        link: `https://test-admin-frontend.vercel.app/${user.name}`,
        androidInfo: {
          androidPackageName: "com.testadminapp",
          androidFallbackLink:
            "https://play.google.com/store/apps/details?id=com.instagram.android&hl=es_VE&gl=US",
        },
        iosInfo: {
          iosBundleId: "com.testadminapp.ios",
          iosFallbackLink: "com.instagram.ios",
        },
      },
    });
    console.log(shortLink);
    setLink({ shortLink, isLoading: false });
  };

  return (
    <Center h="100vh" flexDirection="column">
      <Text as="h2" fontSize="lg">{`This page is for: `}</Text>
      <Heading as="span">{user?.name}</Heading>
      {shortLink && <SharedLink link={shortLink} />}
      <Center mt="4">
        <Link href="/" passHref>
          <Button mr="5">BACK</Button>
        </Link>
        <Button
          colorScheme="blue"
          onClick={handleGetLink}
          isLoading={isLoading}
        >
          SHARE
        </Button>
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
    if (data !== null) {
      return { props: { user: data, statusCode: 200 } };
    } else {
      return { props: { user: data, statusCode: 404 } };
    }
  } catch (e) {
    return {
      props: {
        user: null,
        statusCode: 503,
      },
    };
  }
}
