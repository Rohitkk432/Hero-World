import React from 'react'
import {useEffect,useState} from 'react'

import {Box, Text} from '@chakra-ui/react'
import HeroCard from '../components/heroCard'

import {getHeroInfo} from '../contracts/functions'

interface newHeroProps {

}

const NewHero: React.FC<newHeroProps> = () => {
    const [heroInfo, setHeroInfo] = useState<any>([])
    useEffect(()=>{
        const id = parseInt(window.location.pathname.split('/')[3])
        getHeroInfo(id).then(res=>{
            setHeroInfo(res)
        })
    },[])
    return (
        <>
            <Box w="100%" p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="6xl" fontWeight="bold">Congratulations</Text>
                <Text fontSize="2xl" fontWeight="bold">on getting new Hero on the Team</Text>
                <Box>
                    <HeroCard hero={heroInfo}/>
                </Box>
            </Box>
        </>
    );
}

export default NewHero;