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
import { formatDistanceToNowStrict } from "date-fns";

export interface IMessage {
  sender: string;
  date: Date;
  text: string;
}

const me = "Brendon";
// bubbleColor={m.sender == me ? "blue" : "green"}
// bubbleText={m.text}
export default function Messsage({ message }: { message: IMessage }) {
  return (
    <Flex direction="column" alignSelf={message.sender == me ? "end" : "start"}>
      <Text
        m={1}
        p={2}
        // textAlign={"left"}
        fontSize={"sm"}
        maxW={"150px"}
        rounded={"10"}
        bg={message.sender == me ? "#1982FC" : "gray" + ".400"}
        color={"white"}
        w="fit-content"
      >
        {message.text}
      </Text>
      <Text
        alignSelf="end"
        mr={2}
        size="sm"
        fontSize={11}
        color="gray.600"
        w="fit-content"
      >
        {message.date ? formatDistanceToNowStrict(message.date) : null}
      </Text>
    </Flex>
  );
}
