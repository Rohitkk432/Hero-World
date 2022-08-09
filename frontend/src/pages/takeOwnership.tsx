import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Box, Text, Button,useColorModeValue,Tooltip} from '@chakra-ui/react'
import {CloseIcon,ArrowRightIcon,ArrowForwardIcon} from '@chakra-ui/icons'
import FightCard from '../components/fightCard'
import Process from '../components/process'

import "../styles.css"

import {getHeroesApprovedToYou,getAllHeroes,takeOwnershipOfHero} from '../contracts/functions'

interface takeOwnershipProps {

}

const TakeOwnership: React.FC<takeOwnershipProps> = () => {
    const navigate = useNavigate();
    const [processBox,setProcessBox] = useState("closed");

    const [approvedHeroes, setApprovedHeroes] = useState<any[]>([])
    const [allHeroes, setAllHeroes] = useState<any[]>([])

    const [heroId,setHeroId] = useState<number>(parseInt(window.location.pathname.split('/')[2]));

    const [rerender,setRerender] = useState<boolean>(false);

    useEffect(()=>{
        const approvedHeroId = parseInt(window.location.pathname.split('/')[2])
        setHeroId(approvedHeroId)
        const myAddress = sessionStorage.getItem('currentAccount')
        if(myAddress){
            getHeroesApprovedToYou(myAddress).then(res=>{
                setApprovedHeroes(res)
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
                    <Text fontSize="2xl" my={3}>Choose Hero to Take Ownership : &nbsp;
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
                            approvedHeroes.length===0 ? (
                                <Text fontSize="2xl" my={"auto"} mx={7}  >No Heroes approved for you</Text>
                            )
                            :isNaN(heroId) ?
                            (
                                approvedHeroes.map((hero,index)=>{
                                    return (<FightCard key={index} transfer={true} enemy={true} hero={hero} rerender={rerender} setRerender={setRerender} />)
                            })):(
                                <FightCard hero={allHeroes[heroId]} choosen={true} />
                            )
                        }
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3}>
                    <Button size='lg' mb={5} onClick={()=>navigate(`/transfer/null`)} >Transfer/Approve &nbsp; <ArrowForwardIcon/></Button>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" >
                        <Tooltip label="take ownership of heroes which others approve" placement='bottom-start' hasArrow py={1} rounded="md" >
                            <Text fontSize="2xl" my={3} pr={3}>Take Ownership</Text>
                        </Tooltip>
                        <Button size='lg' ml={4} isDisabled={isNaN(heroId)}
                        onClick={
                            ()=>{
                                if(!isNaN(heroId)){
                                    setProcessBox("loading");
                                    takeOwnershipOfHero(heroId).then(res=>{
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

export default TakeOwnership;