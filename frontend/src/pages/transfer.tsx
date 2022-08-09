import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Box, Text, Button,useColorModeValue,Input,Tooltip} from '@chakra-ui/react'
import {CloseIcon,ArrowRightIcon,ArrowForwardIcon} from '@chakra-ui/icons'
import FightCard from '../components/fightCard'
import Process from '../components/process'

import "../styles.css"

import {getMyHeroes,getAllHeroes,transferHero,approveHeroTransfer} from '../contracts/functions'

interface transferProps {

}

const Transfer: React.FC<transferProps> = () => {
    const navigate = useNavigate();
    const [processBox,setProcessBox] = useState("closed");

    const [myHeroes, setMyHeroes] = useState<any[]>([])
    const [allHeroes, setAllHeroes] = useState<any[]>([])

    const [heroId,setHeroId] = useState<number>(parseInt(window.location.pathname.split('/')[2]));

    const [receiverAddress,setReceiverAddress] = useState<string>("");
    const [approvalAddress,setApprovalAddress] = useState<string>("");

    const [rerender,setRerender] = useState<boolean>(false);

    useEffect(()=>{
        const myHeroId = parseInt(window.location.pathname.split('/')[2])
        setHeroId(myHeroId)
        const myAddress = sessionStorage.getItem('currentAccount')
        if(myAddress){
            getMyHeroes(myAddress).then(res=>{
                setMyHeroes(res)
            })
            getAllHeroes().then(res=>{
                setAllHeroes(res)
            })
        }
    },[rerender])
    return (
        <>  
            <Process processBox={processBox} setProcessBox={setProcessBox} />
            <Box w="100%" px={5} display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center" >
                <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3} >
                    <Text fontSize="2xl" my={3}>Choose Your Hero to Send : &nbsp;
                    {
                        !isNaN(heroId)?
                        <Button variant="ghost" onClick={()=>{
                            setRerender(!rerender);
                            navigate("/transfer/null")
                        }}>
                            <CloseIcon />
                        </Button>
                        :null
                    }
                    </Text>
                    <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" h="75vh" overflowY="scroll" overflowX="hidden" boxShadow={useColorModeValue("none","outline")} rounded="lg" >
                        {
                            myHeroes.length===0 ? (
                                <Text fontSize="2xl" my={"auto"} mx={7}  >You have no heroes</Text>
                            )
                            :isNaN(heroId) ?
                            (
                                myHeroes.map((hero,index)=>{
                                    return (<FightCard transfer={true} key={index} enemy={true} hero={hero} rerender={rerender} setRerender={setRerender} />)
                            })):(
                                <FightCard hero={allHeroes[heroId]} choosen={true} />
                            )
                        }
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3}>
                    <Button size='lg' mb={5} onClick={()=>navigate(`/takeownership/null`)} >Take Ownership &nbsp; <ArrowForwardIcon/></Button>
                    <Tooltip label="directly send your hero to the address" placement='right' hasArrow py={1} rounded="md" >
                        <Text fontSize="2xl" my={3} pr={3}>Transfer</Text>
                    </Tooltip>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start" >
                        <Input variant='filled' placeholder='Receiver Address' size='lg' w={400} value={receiverAddress} onChange={(e)=>setReceiverAddress(e.target.value)} />
                        <Button size='lg' ml={4} isDisabled={isNaN(heroId)}
                        onClick={
                            ()=>{
                                if(!isNaN(heroId) && receiverAddress!==""){
                                    setProcessBox("loading");
                                    transferHero(receiverAddress,heroId).then(res=>{
                                        setProcessBox("success");
                                        navigate(`/my/heroes`)
                                    }).catch(err=>{
                                        setProcessBox("failed");
                                        console.log(err)
                                    })
                                }
                            }
                        }><ArrowRightIcon/></Button>
                    </Box>
                    <Tooltip label="approve address to take ownership of hero" placement='right' hasArrow py={1} rounded="md" >
                        <Text fontSize="2xl" my={3} pr={3}>Approve</Text>
                    </Tooltip>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start" >
                        <Input variant='filled' placeholder='Address To Approve' size='lg' w={400} value={approvalAddress} onChange={(e)=>setApprovalAddress(e.target.value)} />
                        <Button  size='lg' ml={4} isDisabled={isNaN(heroId)}
                        onClick={
                            ()=>{
                                if(!isNaN(heroId) && approvalAddress!==""){
                                    setProcessBox("loading");
                                    approveHeroTransfer(approvalAddress,heroId).then(res=>{
                                        setProcessBox("success");
                                        navigate(`/my/heroes`)
                                    }).catch(err=>{
                                        setProcessBox("failed");
                                        console.log(err)
                                    })
                                }
                            }
                        }><ArrowRightIcon/></Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Transfer;