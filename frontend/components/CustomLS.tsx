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
    
} from '@chakra-ui/react';

import ReactCountryFlag from "react-country-flag"
import ReactFlagsSelect from "react-flags-select";


export default function SocialProfileSimple() {
    return (
        <Center py={6}>
            <Box
                maxW={'400px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <h1>Select Language</h1>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    {/* put drop down here */}
                {/* <ReactFlagsSelect> </ReactFlagsSelect> */}
                <Select>
                <option value='option1'>English </option>

                </Select>
                </Stack>

                <Stack mt={8} direction={'row'} spacing={4}>

                </Stack>
            </Box>
        </Center>
    );
}