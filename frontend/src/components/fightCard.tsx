import React from 'react'
import { Button, Box, Text,useColorModeValue} from '@chakra-ui/react'

interface fightCardProps {

}

const FightCard: React.FC<fightCardProps> = () => {
    return (
        <>
            <Box w={300} h={40} m={4} px={8} py={5} color="white" bg="gray.700" rounded='lg' boxShadow="2xl" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" position="relative" >
                <Text fontSize="2xl" lineHeight={1.2} mb={2} fontWeight="hairline">
                    Adjective Name
                </Text>
                <Text>
                    Species , Rarity
                </Text>
                <Text>
                    Win Count : 5
                </Text>
                <Text>
                    Loss Count : 10
                </Text>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text fontSize="sm" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="4xl" lineHeight={1} fontWeight="bold">5</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" position="absolute" right={5} bottom={3} >
                    <Button color={useColorModeValue("black","white")} size="md">
                        Choose
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default FightCard;