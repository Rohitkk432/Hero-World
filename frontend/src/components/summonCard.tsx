import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Box, Text} from '@chakra-ui/react'

import heroData from '../utils/heroData.json'

import {cardParser} from '../utils/helper'

import {usingSummoningCard} from '../contracts/functions'

interface summonCardObject {
    heroId: number,
    species: number,
    rarity: number,
    winCount: number,
    lossCount: number,
    readyTime: number,
    dna: any,
    summonType: string,
    level: number
}

interface summonCardProps {
    summonCard?: summonCardObject
}

const SummonCard: React.FC<summonCardProps> = ({summonCard}) => {
    const navigate = useNavigate()

    let cardSpecies="Reincarnation", cardRarity="God-like",cardReadyTime="2 hrs 30 mins " ;
    let id:number|undefined;

    if( summonCard ){
        const result = cardParser(summonCard,heroData);
        id = result.id;
        cardSpecies = result.species;
        cardRarity = result.rarity;
        cardReadyTime = result.readyTime;
    }

    const usingSummonCard = async (cardId:number) => {
        await usingSummoningCard(cardId).then(res=>{
            const id = Number(res.heroId)
            navigate(`/new/hero/${id}`)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            <Box w={300} h={40} m={4} px={8} py={5} color="white" bg="gray.700" rounded='lg' boxShadow="2xl" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" position="relative" >
                <Text fontSize="xl">
                    Species: {cardSpecies}
                </Text>
                <Text fontSize="xl">
                    Rarity: {cardRarity}
                </Text>
                <Text fontSize="xl">
                    Ready in: {cardReadyTime}
                </Text>
                <Text bgGradient='linear(91.9deg, rgb(93, 248, 219) 27.8%, rgb(33, 228, 246) 67%)' bgClip='text' fontSize="2xl" fontWeight="bold">
                    Summon Card
                </Text>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" position="absolute" right={5} bottom={3} >
                    {   
                        (cardReadyTime === "Ready") ? (
                            <Button bg={"green"} _hover={{bg: "green.800"}} onClick={()=>{
                                if(id!==undefined){
                                    usingSummonCard(id)
                                }
                            }}  size="md">
                                Use
                            </Button>
                        ):(
                            <Button bg={"red.500"} _hover={{bg: "red.600"}}  size="md">
                                Use
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </>
    );
}

export default SummonCard;