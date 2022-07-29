import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import HeroCard from '../components/heroCard'

interface fightResultProps {

}

const FightResult: React.FC<fightResultProps> = () => {
    return (
        <>
            <Box w="100%" p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="6xl" fontWeight="bold">Result : WON</Text>
                <Text fontSize="2xl" fontWeight="bold">Reward</Text>
                <Box>
                    <HeroCard/>
                </Box>
            </Box>
        </>
    );
}

export default FightResult;