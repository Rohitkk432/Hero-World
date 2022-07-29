import React from 'react'
import HeroCard from '../components/heroCard'

import {Box,Text,Button} from '@chakra-ui/react'

interface myHeroesProps {

}

const MyHeroes: React.FC<myHeroesProps> = () => {
    return (
        <>  
            <Box w="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="3xl" fontWeight="bold" mt={5}>
                    My Heroes
                    <Button size="md" ml={10} >Show my Summon Cards</Button>
                </Text>
                <Box w="80%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" flexWrap="wrap" mx="auto">
                    <HeroCard />
                    <HeroCard />
                    <HeroCard />
                    <HeroCard />
                </Box>
            </Box>
        </>
    );
}

export default MyHeroes;