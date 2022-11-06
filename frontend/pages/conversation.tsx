import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, { useState } from 'react';


import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter"
import CustomHero from "../components/CustomHero"
import CustomMessenger from "../components/CustomMessenger"
import CustomLS from "../components/CustomLS"
import SendButton from "../components/SendButton"
// import Messsage, { IMessage } from "../components/Message"
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
  // const messages: IMessage[] = [
  //   {sender: "Chris", sent: "fix time", text: "Hi there"},
  //   {sender: "Brendon", sent:  "fix time", text: "What's up"},
  // ]
  // const messages: IMessage[] = []
  // const [getMessages, addMessage] = useState(messages)
  

  // var yes = [<TextBubble bubbleColor = {'green'} bubbleText = "Hello"></TextBubble>,
  // <TextBubble bubbleColor = {'blue'} bubbleText="Hello my name is chris ligma balls ligma balls"></TextBubble>]


  return (
    
    <Flex minH="100vh" flexDir="column">
      <Flex flexGrow={1} flexDir="column">

        <CustomNavbar />
        {/* <CustomLS></CustomLS> */}
        
        <CustomMessenger  />
        
        
      </Flex>
      <CustomFooter />
    </Flex>
  )
}
