import { Container, Text } from "@chakra-ui/react";
import PageList from "../PageList/PageList";

const AvailablePages = ({ pages }) => {
  return (
    <Container centerContent={true}>
      {pages.length > 0 ? (
        pages.map((page) => <PageList />)
      ) : (
        <Text>No pages available</Text>
      )}
    </Container>
  );
};

AvailablePages.defaultProps = {
  pages: [],
};

export default AvailablePages;
