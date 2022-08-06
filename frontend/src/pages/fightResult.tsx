import React from 'react'
import {useEffect,useState} from 'react'

import {Box, Text} from '@chakra-ui/react'
import SummonCard from '../components/summonCard'

import {getCardInfo} from '../contracts/functions'

interface fightResultProps {

}

const FightResult: React.FC<fightResultProps> = () => {
    const [reward, setReward] = useState<any>([])
    const [result, setResult] = useState("LOSS")

    const rewardId = parseInt(window.location.pathname.split('/')[2])

    useEffect(()=>{
        if(!isNaN(rewardId)){
            setResult("WIN")
            getCardInfo(rewardId).then(res=>{
                setReward(res)
            })
        }else{
            setResult("LOSS")
        }
    },[rewardId])

    return (
        <>
            <Box w="100%" p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="6xl" fontWeight="bold">Result : {result}</Text>
                <Text fontSize="2xl" fontWeight="bold">Reward</Text>
                <Box>
                    {reward!==[] && result==="WIN"?
                        <SummonCard summonCard={reward}/>
                        :<Text fontSize="2xl" fontWeight="hairline" mt={10}>No Reward</Text>
                    }
                </Box>
            </Box>
        </>
    );
}

export default FightResult;