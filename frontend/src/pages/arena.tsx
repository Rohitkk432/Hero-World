import React from 'react'
import {Box, Text, Button,useColorModeValue} from '@chakra-ui/react'
import FightCard from '../components/fightCard'

import "../styles.css"

interface arenaProps {

}

const Arena: React.FC<arenaProps> = () => {
    return (
        <>
            <Box w="100%" px={5} display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center" >
                <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3} >
                    <Text fontSize="2xl" my={3}>Choose Your Hero :</Text>
                    <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" h="75vh" overflowY="scroll" overflowX="hidden" boxShadow={useColorModeValue("none","outline")} rounded="lg" >
                        <FightCard />
                        <FightCard />
                        <FightCard />
                        <FightCard />
                        <FightCard />
                        <FightCard />
                    </Box>
                </Box>
                <Button size="lg" >Fight</Button>
                <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3}>
                    <Text fontSize="2xl" my={3}>Choose Your Enemy :</Text>
                    <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" h="75vh" overflowY="scroll" overflowX="hidden" boxShadow={useColorModeValue("none","outline")} rounded="lg" >
                        <FightCard />
                        <FightCard />
                        <FightCard />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Arena;