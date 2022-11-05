import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter"
import CustomHero from "../components/CustomHero"
import CustomMessenger from "../components/CustomMessenger"
import CustomLS from "../components/CustomLS"
import Messsage, { IMessage } from "../components/Message"
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
  const messages: IMessage[] = [
    {sender: "Chris", sent: new Date(), text: "Hi there"},
    {sender: "Brendon", sent: new Date(), text: "What's up"},
  ]
  // var yes = [<TextBubble bubbleColor = {'green'} bubbleText = "Hello"></TextBubble>,
  // <TextBubble bubbleColor = {'blue'} bubbleText="Hello my name is chris ligma balls ligma balls"></TextBubble>]

    function handleSubmit () {
        
    }
  return (
    
    <Flex minH="100vh" flexDir="column">
      <Box flexGrow={1}>

        <CustomNavbar />
        <CustomLS></CustomLS>
        
        <CustomMessenger messages={messages}  />
        
      </Box>
      <CustomFooter />
    </Flex>
  )
}
