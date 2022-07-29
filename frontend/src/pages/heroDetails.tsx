import React from 'react'

import { Button,Box,Text , useColorModeValue} from '@chakra-ui/react'

import {ArrowRightIcon} from '@chakra-ui/icons'

interface heroDetailsProps {

}

const HeroDetails: React.FC<heroDetailsProps> = () => {
    return (
        <>  
            <Text w="80%" mx="auto" mt={2} fontSize="3xl" fontWeight="semibold" > Hero Deatils:</Text>
            <Box w="80%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" flexWrap="wrap" mx="auto" mt={3} rounded="xl"
            boxShadow="dark-lg" pl={10} pr={20} pb={10} mb={10} position="relative" color="white" bg="gray.700" >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text bgGradient='linear(91.9deg, rgb(93, 248, 219) 27.8%, rgb(33, 228, 246) 67%)' bgClip='text' fontSize="3xl" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="6xl" lineHeight={1} fontWeight="bold">5</Text>
                    <Box mt={4} textAlign="center">
                        <Text bgGradient='linear(109.6deg, rgb(0, 204, 130) 11.2%, rgb(58, 181, 46) 91.7%)' bgClip='text' fontSize="2xl" fontWeight="bold">WINS</Text>
                        <Text fontSize="4xl" lineHeight={1} fontWeight="bold">10</Text>
                    </Box>
                    <Box mt={4} textAlign="center">
                        <Text bgGradient='linear(117.8deg, rgb(240, 19, 77) 22.2%, rgb(228, 0, 124) 88.7%)' bgClip='text' fontSize="2xl" fontWeight="bold">LOSS</Text>
                        <Text fontSize="4xl" lineHeight={1} fontWeight="bold">12</Text>
                    </Box>
                </Box>
                <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='6xl' fontWeight='extrabold' mr={7} >
                    Adjective Name
                </Text>
                <Box w="100%" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" mr={10} mt={5} >
                        <Text mb={3} fontSize="2xl">Species :</Text>
                        <Text mb={3} fontSize="2xl">Rarity :</Text>
                        <Text mb={3} fontSize="2xl">Summon Type :</Text>
                        <Text mb={3} fontSize="2xl">Owner: </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" mt={5}>
                        <Text mb={3} fontSize="2xl">Species Name</Text>
                        <Text mb={3} fontSize="2xl">Rarity Type</Text>
                        <Text mb={3} fontSize="2xl">Essence of God</Text>
                        <Text mb={3} fontSize="2xl">Owner Address</Text>
                    </Box>
                </Box>
                <Button size="lg" mt={5} color={useColorModeValue("black","white")} fontWeight="bold" fontSize="xl"  >Fight in Arena &nbsp; <ArrowRightIcon/></Button>

            </Box>
        </>
    );
}

export default HeroDetails;