import { Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import PageList from "../PageList/PageList";

const AvailablePages = ({ pages, title }) => {
  return (
    <>
      <Container centerContent={true}>
        <Flex justify="flex-start" w="100%">
          <Heading size="md">{title}</Heading>
        </Flex>
        <Divider my="3" />
        {pages.length > 0 ? (
          pages.map(({ _id, name }) => <PageList key={_id} title={name} />)
        ) : (
          <Text>No pages available</Text>
        )}
      </Container>
    </>
  );
};

export default AvailablePages;
