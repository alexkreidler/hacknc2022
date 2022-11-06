// Language selector
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Switch,
  Textarea,
  Select,
  Image,
  
} from "@chakra-ui/react";

import ReactCountryFlag from "react-country-flag";
import ReactFlagsSelect from "react-flags-select";
import { supportedLanguages } from "../utils/languageCodes";

export default function SocialProfileSimple({selected, setSelected}: {selected: string, setSelected: (lang: string) => void}) {
  return (
    <Center py={6}>
      <Box
        maxW={"400px"}
        marginBottom={"-80px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        //boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}

      >
        <h1>Select Language</h1>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {/* put drop down here */}
          {/* <ReactFlagsSelect> </ReactFlagsSelect> */}
          <Select onSelect={(e) => setSelected(e.target.value)}>
            {supportedLanguages.map((language) => (
              <option selected={selected == language}>{language}</option>
            ))}
          </Select>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}></Stack>
      </Box>
    </Center>
  );
}
