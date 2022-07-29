import React from 'react'
import { Button, Box, Text,useColorModeValue} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons'

interface heroCardProps {

}

const HeroCard: React.FC<heroCardProps> = () => {
    return (
        <>
            <Box w={300} h={40} m={4} px={8} py={5} color="white" bg="gray.700" rounded='lg' boxShadow="dark-lg" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" position="relative" >
                <Text h={20} fontSize="2xl" lineHeight={1.2} fontWeight="hairline">
                    Adjective Name
                </Text>
                <Text>
                    Species: Species Name
                </Text>
                <Text>
                    Rarity: Rarity Name
                </Text>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text fontSize="sm" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="4xl" lineHeight={1} fontWeight="bold">5</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" position="absolute" right={5} bottom={3} >
                    <Button p={0}>
                        <ChevronRightIcon color={useColorModeValue("black","white")} w={10} h={10}/>
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default HeroCard;