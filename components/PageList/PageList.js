import React from "react";
import PropTypes from "prop-types";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
const PageList = ({ title, link }) => {
  return (
    <Flex width="100%" justify="space-between" align="center" my="2">
      <Text textTransform="capitalize">{title}</Text>
      <Link href={`/${title}`} passHref>
        <Button>VISIT</Button>
      </Link>
    </Flex>
  );
};

PageList.propTypes = {};

export default PageList;
