import { Button, ButtonProps, Flex, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Link,
  Badge,
  Switch,
  Textarea,
} from "@chakra-ui/react";

export interface IMessage {
  sender: string;
  sent: string;
  text: string;
}

const me = "Brendon";
// bubbleColor={m.sender == me ? "blue" : "green"}
// bubbleText={m.text}
export default function Messsage({message}) {
  return (
    <Flex direction="column" alignSelf={message.sender == me  ? "end" : "start"}>
      <Text
        m={3}
        mr={-1}
        p={2}
        // textAlign={"left"}
        fontSize={"sm"}
        maxW={"150px"}
        rounded={"10"}
        bg={message.sender == me ? "blue" : "green" + ".400"}
        color={"white"}
        w="fit-content"
      >
        {message.text}
      </Text>
      <Text alignSelf="end" ml={4} size="sm" fontSize={8} color="gray.600" w="fit-content">{message.sent}</Text>
    </Flex>
  );
}
