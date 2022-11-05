import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter"
import CustomHero from "../components/CustomHero"
import CustomMessenger from "../components/CustomMessenger"
import CustomLS from "../components/CustomLS"
import { Box, Flex } from '@chakra-ui/react';


export default function Home() {

    function handleSubmit () {
        
    }
  return (
    <Flex minH="100vh" flexDir="column">
      <Box flexGrow={1}>

        <CustomNavbar />
        <CustomLS></CustomLS>
        <CustomMessenger/>
        
      </Box>
      <CustomFooter />
    </Flex>
  )
}
