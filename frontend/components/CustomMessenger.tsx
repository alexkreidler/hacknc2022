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
} from "@chakra-ui/react";
import axios from "axios";
// import { ReactMic } from 'react-mic';
import React, { useState, useEffect, useRef } from "react";
import SendButton from "./SendButton";
import dynamic from "next/dynamic";
import Message from "./Message";
import Image from 'next/image'
import { languageCodes } from "../utils/languageCodes";
import { IconButton } from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons";



const ReactMic = dynamic(() => import("react-mic").then((m) => m.ReactMic), {
  ssr: false,
});

export default function SocialProfileSimple() {
  const [isText, setIsText] = useBoolean();
  const [transcribedData, setTranscribedData] = useState([]);
  const [interimTranscribedData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
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

  useEffect(() => {
    // return () => clearInterval(intervalRef.current);
  }, []);

  const [message, changeMessage] = useState({
    text: "",
    sender: "",
    date: "",
  });
  const [messages, addMessage] = useState([
    {
      text: "hello",
      sender: "yes",
      date: "10-10-10",
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
    changeMessage({ ...message, sender: "Brendon", date: "10-22-22" });
    console.log(message);
    addMessage([...messages, message]);
    changeMessage({
        text: "",
        sender: "Brendon",
        date: "",
      });
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
    formData.append("language", "en-US")
    // formData.append("model_size", modelSize)
    formData.append("audio_data", recordedBlob.blob, "temp_recording");
    // formData.
    axios
      .post("http://localhost:9000/transcribe", formData, { headers })
      .then((res) => {
        setTranscribedData((oldData) => [...oldData, res.data.transcript]);
        setIsTranscribing(false);
        setIsRecording(false);
        console.log(res.data);
        // intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
      })
      .catch((err) => {
        console.error(err);
      });

    // if (!stopTranscriptionSessionRef.current){
    //   setIsRecording(true)
    // }
  }
  return (
    <Center py={6}>
      <Box
        maxW={"1020px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={"/lingua.png"}
          alt={"Avatar Alt"}
          mb={4}
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

        <Box>
          <Text>Yes</Text>
        </Box>
        <Flex direction="column" w="full">
            {messages.map((m) => (
              <Message message={m}></Message>
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
        <div>
          
          {!isText ? (
            <Stack mt={8} direction={"row"} spacing={4}>
              {/* put type / bullshit here */}

              <Textarea
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
                  className="sound-wave"
                  onStop={onStop}
                  onData={onData}
                  strokeColor="#0d6efd"
                  backgroundColor='#ffffff'
                />
              </Box>
              
              <div>
                <h1>{transcribedData.join("\n")}</h1>
              </div>
              <IconButton alignSelf={'center'} width="100px" aria-label="Call Segun"  icon={<PhoneIcon />}  colorScheme="blue" size="sm"  onClick={toggleRecording}>
                {isRecording ? "Stop Recording" : "Record Voice"}
              </IconButton>
            </Stack>
            
          )}
        </div>
        
      </Box>
    </Center>
  );
}
