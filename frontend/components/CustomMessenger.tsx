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
    useBoolean
  } from '@chakra-ui/react';
  import axios from 'axios';
  // import { ReactMic } from 'react-mic';
  import React, { useState, useEffect, useRef } from 'react';

  import dynamic from 'next/dynamic';

  const ReactMic = dynamic(()=> import('react-mic').then((m) => m.ReactMic), {
      ssr:false,
  })
  
  export default function SocialProfileSimple() {
    const [isText, setIsText] = useBoolean();
    const [transcribedData, setTranscribedData] = useState([]);
    const [interimTranscribedData, ] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [selectedModel, setSelectedModel] = useState(1);
    const [transcribeTimeout, setTranscribeTimout] = useState(5);
    const [stopTranscriptionSession, setStopTranscriptionSession] = useState(false);  

  const intervalRef = React.createRef();
  
  const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const supportedLanguages = ['english', 'chinese', 'german', 'spanish', 'russian', 'korean', 'french', 'japanese', 'portuguese', 'turkish', 'polish', 'catalan', 'dutch', 'arabic', 'swedish', 'italian', 'indonesian', 'hindi', 'finnish', 'vietnamese', 'hebrew', 'ukrainian', 'greek', 'malay', 'czech', 'romanian', 'danish', 'hungarian', 'tamil', 'norwegian', 'thai', 'urdu', 'croatian', 'bulgarian', 'lithuanian', 'latin', 'maori', 'malayalam', 'welsh', 'slovak', 'telugu', 'persian', 'latvian', 'bengali', 'serbian', 'azerbaijani', 'slovenian', 'kannada', 'estonian', 'macedonian', 'breton', 'basque', 'icelandic', 'armenian', 'nepali', 'mongolian', 'bosnian', 'kazakh', 'albanian', 'swahili', 'galician', 'marathi', 'punjabi', 'sinhala', 'khmer', 'shona', 'yoruba', 'somali', 'afrikaans', 'occitan', 'georgian', 'belarusian', 'tajik', 'sindhi', 'gujarati', 'amharic', 'yiddish', 'lao', 'uzbek', 'faroese', 'haitian creole', 'pashto', 'turkmen', 'nynorsk', 'maltese', 'sanskrit', 'luxembourgish', 'myanmar', 'tibetan', 'tagalog', 'malagasy', 'assamese', 'tatar', 'hawaiian', 'lingala', 'hausa', 'bashkir', 'javanese', 'sundanese']

  const modelOptions = ['tiny', 'base', 'small', 'medium', 'large']

  useEffect(() => {
    // return () => clearInterval(intervalRef.current);
  }, []);


  function handleTranscribeTimeoutChange(newTimeout) {
    setTranscribeTimout(newTimeout)
  }

  function startRecording() {
    setStopTranscriptionSession(false)
    setIsRecording(true)
    // intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
  }

  function stopRecording() {
    // clearInterval(intervalRef.current);
    setStopTranscriptionSession(true)
    setIsRecording(false)
    setIsTranscribing(false)
  }

  function toggleRecording() {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  function onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  function onStop(recordedBlob) {
    transcribeRecording(recordedBlob)
    setIsTranscribing(true)  
  }

  function transcribeInterim() {
    // clearInterval(intervalRef.current);
    setIsRecording(false)
  }
  function transcribeRecording(recordedBlob) {
    const headers = {
      "content-type": "multipart/form-data",
    };
    const formData = new FormData();
    const language = selectedLangRef.current
    const modelSize = modelOptions[selectedModelRef.current];
    console.log(language, modelSize);
    
    formData.append("language", language)
    formData.append("model_size", modelSize)
    // formData.append("audio_data", recordedBlob.blob, 'temp_recording');
    axios.post("http://0.0.0.0:9000/transcribe", formData, { headers })
      .then((res) => {
        setTranscribedData(oldData => [...oldData, res.data])
        setIsTranscribing(false)
        setIsRecording(false)
        console.log(res.data)
        // intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
      }).catch((err) => {
        console.error(err);
        
      });
      
      // if (!stopTranscriptionSessionRef.current){
      //   setIsRecording(true)
      // }
  }
    return (
      <Center py={6}>
        <Box
          maxW={'1020px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
                'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />

          <Box>
            <Text>Yes</Text>
          </Box>
        
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            {/* put toggle switch for text/speech here */}
            <Text>Text</Text>
            <Switch onChange={() => {
              setIsText.toggle();
              console.log(isText);
            }}></Switch>
            <Text>Voice</Text>
            
          </Stack>
          <div>
            {!isText ? (
              <Stack mt={8} direction={'row'} spacing={4}>
              {/* put type / bullshit here */}
              <Textarea></Textarea>
            </Stack>
            ) : (
              <Stack>
                <Button colorScheme="red" size="md" onClick={toggleRecording}>{isRecording ? "Stop Recording" : "Record Voice"}</Button>
                <div className="recordIllustration">
                  <ReactMic record={isRecording} className="sound-wave" onStop={onStop}
                  onData={onData} strokeColor="#0d6efd" backgroundColor="#f6f6ef" />
                </div>
                <div>
                  <h1>{transcribedData}</h1>
                </div>
              </Stack>
            )}
          </div>
          
        </Box>
      </Center>
    );
  }
