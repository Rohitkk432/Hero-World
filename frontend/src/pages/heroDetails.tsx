import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { Button,Box,Text , useColorModeValue} from '@chakra-ui/react'
import {ArrowRightIcon, ArrowUpIcon} from '@chakra-ui/icons'

import {getHeroInfo,getHeroOwner,levelUpHero} from '../contracts/functions'
import heroData from '../utils/heroData.json'

import Process from '../components/process'

import {heroParser} from '../utils/helper'

interface heroDetailsProps {
    
}

const HeroDetails: React.FC<heroDetailsProps> = () => {
    const navigate = useNavigate()
    const [processBox,setProcessBox] = useState("closed");

    const [heroInfo, setHeroInfo] = useState<any>({})
    const [heroOwner, setHeroOwner] = useState("")
    const [heroId, setHeroId] = useState(parseInt(window.location.pathname.split('/')[2]))

    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
        const id =  parseInt(window.location.pathname.split('/')[2])
        setHeroId(id)
        getHeroInfo(id).then(res=>{
            setHeroInfo(heroParser(res,heroData));
        }).catch(err=>{
            console.log(err)
        })
        getHeroOwner(id).then(res=>{
            setHeroOwner(res)
        }).catch(err=>{
            console.log(err)
        })
    },[refresh])

    const textColor = useColorModeValue("black","white");

    return (
        <>  
            <Process processBox={processBox} setProcessBox={setProcessBox} />
            <Text w="80%" mx="auto" mt={2} fontSize="3xl" fontWeight="semibold" > Hero Details:</Text>
            <Box w="80%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" flexWrap="wrap" mx="auto" mt={3} rounded="xl"
            boxShadow="dark-lg" pl={10} pr={20} pb={10} mb={10} position="relative" color="white" bg="gray.700" >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="absolute" right={5} top={3} >
                    <Text bgGradient='linear(91.9deg, rgb(93, 248, 219) 27.8%, rgb(33, 228, 246) 67%)' bgClip='text' fontSize="3xl" fontWeight="bold">LEVEL</Text>
                    <Text fontSize="6xl" lineHeight={1} fontWeight="bold">{heroInfo.level}</Text>
                    <Box mt={4} textAlign="center">
                        <Text bgGradient='linear(109.6deg, rgb(0, 204, 130) 11.2%, rgb(58, 181, 46) 91.7%)' bgClip='text' fontSize="2xl" fontWeight="bold">WINS</Text>
                        <Text fontSize="4xl" lineHeight={1} fontWeight="bold">{heroInfo.winCount}</Text>
                    </Box>
                    <Box mt={4} textAlign="center">
                        <Text bgGradient='linear(117.8deg, rgb(240, 19, 77) 22.2%, rgb(228, 0, 124) 88.7%)' bgClip='text' fontSize="2xl" fontWeight="bold">LOSS</Text>
                        <Text fontSize="4xl" lineHeight={1} fontWeight="bold">{heroInfo.lossCount}</Text>
                    </Box>
                </Box>
                <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='6xl' fontWeight='extrabold' mr={7} >
                    {heroInfo.adjective} {heroInfo.name}
                </Text>
                <Box w="100%" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" mr={10} mt={5} >
                        <Text mb={3} fontSize="2xl">Species :</Text>
                        <Text mb={3} fontSize="2xl">Rarity :</Text>
                        <Text mb={3} fontSize="2xl">Summon Type :</Text>
                        <Text mb={3} fontSize="2xl">Cooldown :</Text>
                        <Text mb={3} fontSize="2xl">Owner: </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" mt={5}>
                        <Text mb={3} fontSize="2xl">{heroInfo.species}</Text>
                        <Text mb={3} fontSize="2xl">{heroInfo.rarity}</Text>
                        <Text mb={3} fontSize="2xl">{heroInfo.summonType}</Text>
                        <Text mb={3} fontSize="2xl">{heroInfo.readyTime}</Text>
                        <Text mb={3} fontSize="2xl">{(heroOwner.toLowerCase()===sessionStorage.getItem("currentAccount"))?"You":heroOwner.toLowerCase()}</Text>
                    </Box>
                </Box>
                {
                    (heroOwner.toLowerCase()===sessionStorage.getItem("currentAccount"))?
                    (   
                        <Button size="lg" mt={5} color={textColor} fontWeight="bold" fontSize="xl"
                        onClick={()=>{
                            setProcessBox("loading");
                            levelUpHero(heroId).then(res=>{
                                setProcessBox("success");
                                setRefresh(!refresh)
                            }).catch(err=>{
                                setProcessBox("failed");
                                console.log(err)
                            })
                        }}
                        >Level Up &nbsp; <ArrowUpIcon/></Button>
                    ):null
                }
                {(heroOwner.toLowerCase()===sessionStorage.getItem("currentAccount") && heroInfo.readyTime==="Ready")?
                    (   
                        <Button size="lg" mt={5} color={textColor} fontWeight="bold" fontSize="xl" onClick={()=>navigate(`/arena/${heroInfo.id}/null`)}  >Fight in Arena &nbsp; <ArrowRightIcon/></Button>
                    ):null
                }
            </Box>
        </>
    );
}

export default HeroDetails;