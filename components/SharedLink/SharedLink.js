import React, { useRef } from "react";
import { Flex, IconButton, Input, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const SharedLink = ({ link }) => {
  const linkRef = useRef();
  const toast = useToast();

  const copyToClickboard = (e) => {
    linkRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast({
      title: `Link copied successfully`,
      status: "success",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Flex my="4" width={["90%", "50%"]}>
      <Input
        ref={linkRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        name="customFile"
        defaultValue={link}
        onClick={copyToClickboard}
      />
      <IconButton
        ml="2"
        colorScheme="blue"
        aria-label="Copy link"
        onClick={copyToClickboard}
        icon={<CopyIcon />}
      />
    </Flex>
  );
};

export default SharedLink;
