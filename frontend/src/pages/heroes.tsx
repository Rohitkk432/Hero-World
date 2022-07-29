import React from 'react'
import HeroCard from '../components/heroCard'

import {Box} from '@chakra-ui/react'

interface heroesProps {

}

const Heroes: React.FC<heroesProps> = () => {
    return (
        <>
            <Box w="80%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" flexWrap="wrap" mx="auto" mt={10} >
                <HeroCard />
                <HeroCard />
                <HeroCard />
                <HeroCard />
            </Box>
        </>
    );
}

export default Heroes;