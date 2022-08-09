import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {Text,Box,Button,useColorModeValue} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'

import HeroCard from '../components/heroCard'
import FightCard from '../components/fightCard'
import Process from '../components/process'

import {createFirstHero,getOwnerHeroCount} from '../contracts/functions'

interface landingProps {
    onClickConnect: () => void,
    onClickDisconnect: () => void,
    currentAccount: string | undefined,
    metamaskConnection: boolean
    balance: string | undefined
}

const Landing: React.FC<landingProps> = ({onClickConnect,onClickDisconnect,currentAccount, metamaskConnection,balance}) => {

    const fontgradients = useColorModeValue("linear(to right, #ff00cc, #333399)","linear(to right, #9cecfb, #65c7f7, #0052d4)")

    let navigate = useNavigate();
    const [processBox,setProcessBox] = useState("closed");

    const [heroCount, setHeroCount] = useState(0)

    const creatingFirstHero = async () => {
        setProcessBox("loading");
        await createFirstHero().then(res=>{
            setProcessBox("success");
            const id = Number(res.heroId)
            navigate(`new/hero/${id}`)
        }).catch(err=>{
            setProcessBox("failed");
            console.log(err)
        })
    }

    useEffect(() => {
        if(currentAccount!==undefined){
            getOwnerHeroCount(currentAccount).then(res=>{
                setHeroCount(res)
            })
        }
    },[currentAccount])

    return (
        <>  
            <Process processBox={processBox} setProcessBox={setProcessBox} />
            {metamaskConnection ? 
                (
                    <Box w="100%" px={10} py={5} display="flex" flexDirection="row" 
                    justifyContent="space-between" alignItems="flex-start">
                        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
                            <Text fontSize="3xl" > <Text bgGradient={fontgradients} bgClip='text' fontSize="5xl" fontWeight="bold" display="inline" mr={2}>Hero World</Text> with no Villain</Text>
                            <Text fontSize="2xl" fontWeight="hairline" mb={10}>
                                The World with no evil anymore, and Bored Heroes.
                            </Text>
                            <Text fontSize="xl" fontWeight="hairline">
                                Own Heroes, duel with other Heroes, transfer heroes.                              
                            </Text>
                            <Text fontSize="xl" fontWeight="hairline" mb={10}>
                                Use Summoning Cards to Summon more heroes.
                            </Text>
                            <Text fontSize="lg" mb={2}>
                                Connect to <strong>Rinkeby Test Network.</strong>
                            </Text>
                            {currentAccount ?
                                (
                                <Box>
                                    <Text mb={1}>Connected Account : {currentAccount}</Text>
                                    <Text mb={3}>balance : {balance}</Text>
                                    <Button size="lg" onClick={onClickDisconnect} >Disconnect Wallet</Button>
                                </Box>
                                ):
                                <Button size="lg" onClick={onClickConnect} >Connect Wallet</Button>
                            }
                            {heroCount === 0 && currentAccount ? 
                                <Button mt={4} size="lg" onClick={creatingFirstHero} >Make First Hero</Button>
                                : null
                            }
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
                            <Box>
                                <HeroCard />
                            </Box>
                            <Box mr={10}>
                                <FightCard />
                            </Box>
                        </Box>
                    </Box>
                ):
                (
                    <Box w="100%" mt={20} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Text fontSize="6xl" fontWeight="bold" mb={5} >
                            Please install Metamask
                        </Text>
                        <a href="https://metamask.io/download/" target="_blank" rel="noreferrer" >
                            <Button size="lg">Metamask &nbsp; <ExternalLinkIcon/></Button>
                        </a>
                    </Box>
                )
            }
        </>
    );
}

export default Landing;