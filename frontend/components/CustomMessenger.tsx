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
  useBoolean,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
// import { ReactMic } from 'react-mic';
import React, { useState, useEffect, useRef } from "react";
import SendButton from "./SendButton";
import dynamic from "next/dynamic";
import Message from "./Message";
import Image from "next/image";
import { languageCodes } from "../utils/languageCodes";
import { IconButton } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { arrayBuffer } from "stream/consumers";
import { Select } from "chakra-react-select";
import { recentYearsRandomDate } from "../utils/date";
import { sendMessage } from "../services/messages";
import { withRetries } from "../utils/retries";

const ReactMic = dynamic(() => import("react-mic").then((m) => m.ReactMic), {
  ssr: false,
});

export default function SocialProfileSimple() {
  const [isText, setIsText] = useBoolean();
  const [transcribedData, setTranscribedData] = useState([]);
  const [interimTranscribedData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-us");
  const [selectedModel, setSelectedModel] = useState(1);
  const [transcribeTimeout, setTranscribeTimout] = useState(5);
  const [stopTranscriptionSession, setStopTranscriptionSession] =
    useState(false);

  const intervalRef = React.createRef();

  const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const modelOptions = ["tiny", "base", "small", "medium", "large"];

  const [chatID, setChatID] = useState<string | null>(null);

  const baseURL = "https://linguabot-pc.alexkreidler.com";
  useEffect(() => {
    const url = `${baseURL}/chats`;

    withRetries({
      attempt: fetch(url, {
        method: "POST",
      }).then(async (res) => {
        console.log("req", url, res);
        const id = (await res.json()).id;
        console.log("id", id);

        setChatID(id);
      }),
    });

    return () => {};
  }, []);

  useEffect(() => {
    // return () => clearInterval(intervalRef.current);
  }, []);

  const [message, changeMessage] = useState({
    text: "",
    sender: "Brendon",
    date: new Date(),
    // date: ,
  });
  const [messages, addMessage] = useState([
    {
      text: "hello",
      sender: "Brendon",
      date: recentYearsRandomDate(),
    },
  ]);

  function handleTranscribeTimeoutChange(newTimeout) {
    setTranscribeTimout(newTimeout);
  }

  function startRecording() {
    setStopTranscriptionSession(false);
    setIsRecording(true);
    // intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
  }

  function stopRecording() {
    // clearInterval(intervalRef.current);
    setStopTranscriptionSession(true);
    setIsRecording(false);
    setIsTranscribing(false);
  }

  function toggleRecording() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  function onStop(recordedBlob) {
    transcribeRecording(recordedBlob);
    setIsTranscribing(true);
  }

  function transcribeInterim() {
    // clearInterval(intervalRef.current);
    setIsRecording(false);
  }

  function handleClick() {
    changeMessage({ ...message, sender: "Brendon", date: new Date() });
    console.log(messages.length);
    addMessage([...messages, message]);
    changeMessage({
      text: "",
      sender: "Brendon",
      date: new Date(),
    });
    if (messages.length > 5) {
      messages.shift();
    }
  }

  function transcribeRecording(recordedBlob) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    const language = selectedLangRef.current;
    const modelSize = modelOptions[selectedModelRef.current];
    console.log(language, modelSize);

    // formData.append("language", Object.entries(languageCodes).filter(([code, lang]) => lang == selectedLanguage)[0][0]);
    // console.log(selectedLanguage);

    formData.append("language", selectedLanguage);
    // formData.append("model_size", modelSize)
    formData.append("audio_data", recordedBlob.blob, "temp_recording");
    // formData.
    axios
      .post(baseURL + "/transcribe", formData, { headers })
      .then((res) => {
        const message = res.data.transcript;
        console.log(res.data);

        setTranscribedData((oldData) => [...oldData, message]);
        setIsTranscribing(false);
        setIsRecording(false);
        // console.log(res.data);

        addMessage((msgs) => [
          ...msgs,
          { text: message, sender: "Brendon", date: new Date() },
        ]);
        if (chatID) {
          sendMessage(message, chatID).then((res) => {
            addMessage((msgs) => [...msgs, res]);
          });
        }

        // intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
      })
      .catch((err) => {
        console.error(err);
      });

    // if (!stopTranscriptionSessionRef.current){
    //   setIsRecording(true)
    // }
  }
  const options = Object.entries(languageCodes).map(([code, name]) => ({
    label: name,
    value: code,
  }));
  return (
    <Center py={6} flexGrow={1} h="full">
      <HStack spacing={5} h="full">
        <VStack
          w={"container.md"}
          h="80vh"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"md"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <VStack>
            <Avatar
              size={"md"}
              src={"/lingua.png"}
              alt={"Avatar Alt"}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
            <Text fontSize={10}>LingaChat</Text>
          </VStack>

          {/* overflowY={'auto',''} maxH="250px" */}
          <Flex direction="column" w="full" flexGrow={1} overflowY="scroll">
            {messages.map((m, idx) => (
              <Message message={m} key={idx}></Message>
            ))}
          </Flex>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {/* put toggle switch for text/speech here */}
            <Text>Text</Text>
            <Switch
              onChange={() => {
                setIsText.toggle();
                console.log(isText);
              }}
            ></Switch>
            <Text>Voice</Text>
          </Stack>
          <Box w="full">
            {!isText ? (
              <Stack mt={8} direction={"row"} spacing={4}>
                {/* put type / bullshit here */}

                <Textarea
                  resize={"none"}
                  onChange={(e) =>
                    changeMessage({ ...message, text: e.target.value })
                  }
                  value={message.text}
                ></Textarea>

                <SendButton onClick={handleClick}></SendButton>
              </Stack>
            ) : (
              <Stack>
                <Box w="fit-content" flexGrow={1} alignSelf="center">
                  <ReactMic
                    record={isRecording}
                    // channelCount={1}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#0d6efd"
                    backgroundColor="#ffffff"
                  />
                </Box>

                <Button
                  alignSelf={"center"}
                  // width="100px"
                  aria-label="Call Segun"
                  leftIcon={<PhoneIcon />}
                  color="#4399e1"
                  size="sm"
                  onClick={toggleRecording}
                >
                  {isRecording ? "Stop" : "Speak"}
                </Button>
              </Stack>
            )}
          </Box>
        </VStack>
        <Box w="md" alignSelf="start">
          <Text color="gray.600">Select Language</Text>
          <Select
            value={
              Object.entries(languageCodes)
                .filter(([code, name]) => code == selectedLanguage)
                .map(([code, name]) => ({ label: name, value: code }))[0]
            }
            options={options}
            onChange={(newVal) => setSelectedLanguage(newVal?.value)}
          />
        </Box>
      </HStack>
    </Center>
  );
}
