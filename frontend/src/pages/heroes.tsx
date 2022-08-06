import React from 'react'
import {useEffect,useState} from 'react'
import HeroCard from '../components/heroCard'

import {Box} from '@chakra-ui/react'

import {getAllHeroes} from '../contracts/functions'

interface heroesProps {

}

const Heroes: React.FC<heroesProps> = () => {
    const [heroes, setHeroes] = useState<any[]>([])
    useEffect(()=>{
        getAllHeroes().then(res=>{
            setHeroes(res)
        })
    },[])
    return (
        <>
            <Box w="80%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" flexWrap="wrap" mx="auto" mt={10} >
                {heroes.map((hero,index)=>{
                    return (<HeroCard key={index} id={index} hero={hero} />)
                })}
            </Box>
        </>
    )
}

export default Heroes;