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

const supportedLanguages = [
  "english",
  "chinese",
  "german",
  "spanish",
  "russian",
  "korean",
  "french",
  "japanese",
  "portuguese",
  "turkish",
  "polish",
  "catalan",
  "dutch",
  "arabic",
  "swedish",
  "italian",
  "indonesian",
  "hindi",
  "finnish",
  "vietnamese",
  "hebrew",
  "ukrainian",
  "greek",
  "malay",
  "czech",
  "romanian",
  "danish",
  "hungarian",
  "tamil",
  "norwegian",
  "thai",
  "urdu",
  "croatian",
  "bulgarian",
  "lithuanian",
  "latin",
  "maori",
  "malayalam",
  "welsh",
  "slovak",
  "telugu",
  "persian",
  "latvian",
  "bengali",
  "serbian",
  "azerbaijani",
  "slovenian",
  "kannada",
  "estonian",
  "macedonian",
  "breton",
  "basque",
  "icelandic",
  "armenian",
  "nepali",
  "mongolian",
  "bosnian",
  "kazakh",
  "albanian",
  "swahili",
  "galician",
  "marathi",
  "punjabi",
  "sinhala",
  "khmer",
  "shona",
  "yoruba",
  "somali",
  "afrikaans",
  "occitan",
  "georgian",
  "belarusian",
  "tajik",
  "sindhi",
  "gujarati",
  "amharic",
  "yiddish",
  "lao",
  "uzbek",
  "faroese",
  "haitian creole",
  "pashto",
  "turkmen",
  "nynorsk",
  "maltese",
  "sanskrit",
  "luxembourgish",
  "myanmar",
  "tibetan",
  "tagalog",
  "malagasy",
  "assamese",
  "tatar",
  "hawaiian",
  "lingala",
  "hausa",
  "bashkir",
  "javanese",
  "sundanese",
];
export default function SocialProfileSimple() {
  return (
    <Center py={6}>
      <Box
        maxW={"400px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <h1>Select Language</h1>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {/* put drop down here */}
          {/* <ReactFlagsSelect> </ReactFlagsSelect> */}
          <Select>
            {supportedLanguages.map((language) => (
              <option>{language}</option>
            ))}
          </Select>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}></Stack>
      </Box>
    </Center>
  );
}
