import React from 'react'
import { Button, Box, Text} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import heroData from '../utils/heroData.json'

import {heroParser} from '../utils/helper'


interface heroObject {
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

interface fightCardProps {
    hero?: heroObject
    mine?: boolean
    enemy?: boolean
    choosen?: boolean
    rerender?: boolean
    transfer?: boolean
    setRerender?: React.Dispatch<React.SetStateAction<boolean>>
}

const FightCard: React.FC<fightCardProps> = ({hero,mine,enemy,choosen,rerender,setRerender,transfer}) => {
    const navigate = useNavigate();

    let heroAdj="Valiant", heroName="Leandros", heroSpecies="Necromancer", heroRarity="God-like",heroReadyTime="" ;
    let id:number|undefined;
    let heroLevel = 25 , heroWins = 7, heroLosses = 21;

    if( hero ){
        const result = heroParser(hero,heroData);
        id = result.id;
        heroAdj = result.adjective;
        heroName = result.name;
        heroSpecies = result.species;
        heroRarity = result.rarity;
        heroLevel = result.level;
        heroWins = result.winCount;
        heroLosses = result.lossCount;
        heroReadyTime = result.readyTime;
    }

    const brokenLink = window.location.pathname.split('/');
    if(!transfer || transfer===undefined){
        if(mine!==undefined && mine){
            brokenLink[2]=id!==undefined?String(id):"null";
        }
        if(enemy!==undefined && enemy){
            brokenLink[3]=id!==undefined?String(id):"null";
        }
    }else{
        if(enemy!==undefined && enemy){
            brokenLink[2]=id!==undefined?String(id):"null";
        }
    }
    let link =brokenLink.join('/');

    const chooseGoTo = () => {
        if(setRerender!==undefined){
            setRerender(!rerender);
        }
        navigate(link);
    }

    return (
        <>
            <Box w={300} h={40} m={4} px={8} py={2} color="white" bg="gray.700" rounded='lg' boxShadow="2xl" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" position="relative" >
                <Text fontSize="2xl" lineHeight={1.2} mb={2} fontWeight="hairline" pr={7}>
                    {heroAdj} {heroName}
                </Text>
                <Text>
                    {heroSpecies} , {heroRarity}
                </Text>
                <Text>
                    Win Count : {heroWins}
                </Text>
                <Text>
                    Loss Count : {heroLosses}
                </Text>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text fontSize="sm" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="4xl" lineHeight={1} fontWeight="bold">{heroLevel}</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" position="absolute" right={5} bottom={3} >
                    {   
                        (heroReadyTime === "Ready" && mine!==undefined && mine) ? (
                            <Button bg={"green"} _hover={{bg: "green.800"}}  size="md"
                            onClick={chooseGoTo}>
                                Choose
                            </Button>
                        ):(enemy!==undefined && enemy)?(
                            <Button bg={"blue.500"} _hover={{bg: "blue.600"}}  size="md"
                            onClick={chooseGoTo}>
                                Choose
                            </Button>
                        ):(choosen!==undefined && choosen)?(
                            <Button bg={"gray.500"} _hover={{bg: "gray.600"}}  size="md">
                                Choose
                            </Button>
                        ):(
                            <Button bg={"red.500"} _hover={{bg: "red.600"}}  size="md">
                                Choose
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </>
    );
}

export default FightCard;