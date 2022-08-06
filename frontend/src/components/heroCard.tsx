import React from 'react'
import { Button, Box, Text,useColorModeValue} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons'

import {Link} from 'react-router-dom';

import heroData from '../utils/heroData.json'

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

interface heroCardProps {
    hero?: heroObject
}

const HeroCard: React.FC<heroCardProps> = ({hero}) => {

    let heroAdj="Tough", heroName="Aleksander", heroSpecies="Dark-Elf", heroRarity="Emperor-like" ;
    let id:number|undefined;
    let heroLevel = 52;
    if( hero ){
        id = hero.heroId;
        let heroDna = Number(hero.dna);
        const heroAdjNum = heroDna%1000;
        heroDna = Math.floor(heroDna/1000);
        const heroNameNum = heroDna%1000;
        heroAdj = heroData.adjective[heroAdjNum % (heroData.adjective.length - 1)];
        heroName = heroData.name[heroNameNum % (heroData.name.length - 1)];
        heroSpecies = heroData.species[hero.species % (heroData.species.length - 1)];
        heroRarity = heroData.rarity[hero.rarity % (heroData.rarity.length - 1)];
        heroLevel = hero.level;
    }
    
    return (
        <>
            <Box w={300} h={40} m={4} px={8} py={5} color="white" bg="gray.700" rounded='lg' boxShadow="2xl" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" position="relative" >
                <Text h={20} fontSize="2xl" lineHeight={1.2} fontWeight="hairline">
                    {heroAdj} {heroName}
                </Text>
                <Text>
                    Species: {heroSpecies}
                </Text>
                <Text>
                    Rarity: {heroRarity}
                </Text>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text fontSize="sm" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="4xl" lineHeight={1} fontWeight="bold">{heroLevel}</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" position="absolute" right={5} bottom={3} >
                    <Link to={id!==undefined?`/hero/${id}`:"/"} >
                        <Button p={0}>
                            <ChevronRightIcon color={useColorModeValue("black","white")} w={10} h={10}/>
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
}

export default HeroCard;