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
  } from '@chakra-ui/react';
  
  export default function SocialProfileSimple() {
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
            <Switch></Switch>
            <Text>Voice</Text>

          </Stack>
  
          <Stack mt={8} direction={'row'} spacing={4}>
            {/* put type / bullshit here */}
            <Textarea></Textarea>
          </Stack>
        </Box>
      </Center>
    );
  }