import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import HeroCard from '../components/heroCard'

interface newHeroProps {

}

const NewHero: React.FC<newHeroProps> = () => {
    return (
        <>
            <Box w="100%" p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="6xl" fontWeight="bold">Congratulations</Text>
                <Text fontSize="2xl" fontWeight="bold">on getting new Hero on the Team</Text>
                <Box>
                    {/* <HeroCard/> */}
                </Box>
            </Box>
        </>
    );
}

export default NewHero;