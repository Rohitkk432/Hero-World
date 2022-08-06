import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Box, Text, Button,useColorModeValue} from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'
import FightCard from '../components/fightCard'

import "../styles.css"

import {getMyHeroes,getAllHeroes,getOthersHeroes,heroFight} from '../contracts/functions'

interface arenaProps {

}

const Arena: React.FC<arenaProps> = () => {
    const navigate = useNavigate();

    const [myHeroes, setMyHeroes] = useState<any[]>([])
    const [allHeroes, setAllHeroes] = useState<any[]>([])
    const [othersHeroes, setOthersHeroes] = useState<any[]>([])

    const [heroId,setHeroId] = useState<number>(parseInt(window.location.pathname.split('/')[2]));
    const [enemyId,setEnemyId] = useState<number>(parseInt(window.location.pathname.split('/')[3]));
    const [fightLegal,setFightLegal] = useState<boolean>(false);

    const [rerender,setRerender] = useState<boolean>(false);

    useEffect(()=>{
        const myHeroId = parseInt(window.location.pathname.split('/')[2])
        const myEnemyId = parseInt(window.location.pathname.split('/')[3])
        setHeroId(myHeroId)
        setEnemyId(myEnemyId)
        if(!isNaN(myEnemyId) && !isNaN(myHeroId)){
            setFightLegal(true)
        }else{
            setFightLegal(false)
        }
        const myAddress = sessionStorage.getItem('currentAccount')
        if(myAddress){
            getMyHeroes(myAddress).then(res=>{
                setMyHeroes(res)
            })
            getAllHeroes().then(res=>{
                setAllHeroes(res)
            })
            getOthersHeroes(myAddress).then(res=>{
                setOthersHeroes(res)
            })
        }
    },[rerender])
    return (
        <>
            <Box w="100%" px={5} display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center" >
                <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3} >
                    <Text fontSize="2xl" my={3}>Choose Your Hero : &nbsp;
                    {
                        !isNaN(heroId)?
                        <Button variant="ghost" onClick={()=>{
                            setRerender(!rerender);
                            navigate("/arena/null/null")
                        }}>
                            <CloseIcon />
                        </Button>
                        :null
                    }
                    </Text>
                    <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" h="75vh" overflowY="scroll" overflowX="hidden" boxShadow={useColorModeValue("none","outline")} rounded="lg" >
                        {isNaN(heroId) ?
                            (
                                myHeroes.map((hero,index)=>{
                                    return (<FightCard key={index} mine={true} hero={hero} rerender={rerender} setRerender={setRerender} />)
                            })):(
                                <FightCard hero={allHeroes[heroId]} choosen={true} />
                            )
                        }
                    </Box>
                </Box>
                {fightLegal ? 
                    (<Button size="lg"bg={"green"} _hover={{bg: "green.800"}} onClick={()=>{
                        heroFight(heroId,enemyId).then(res=>{
                            if(Number(res[0].args.heroId)===heroId){
                                const cardId = res[1].args.cardId
                                navigate(`/result/${cardId}`)
                            }else if(Number(res[0].args.heroId)===enemyId){
                                navigate(`/result/null`)
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }}>Fight</Button>):
                    (<Button size="lg" bg={"gray.500"} _hover={{bg: "gray.600"}} >Fight</Button>)
                }
                <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mx={3}>
                    <Text fontSize="2xl" my={3}>Choose Your Enemy : &nbsp;
                    {
                        !isNaN(enemyId)?
                        <Button variant="ghost" onClick={()=>{
                            setRerender(!rerender);
                            navigate("/arena/null/null")
                        }}>
                            <CloseIcon />
                        </Button>
                        :null
                    }</Text>
                    <Box className='chooseYourCard' display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" h="75vh" overflowY="scroll" overflowX="hidden" boxShadow={useColorModeValue("none","outline")} rounded="lg" >
                        {isNaN(enemyId) ?
                            (
                                othersHeroes.map((hero,index)=>{
                                    return (<FightCard key={index} enemy={true} hero={hero} rerender={rerender} setRerender={setRerender} />)
                            })):(
                                <FightCard hero={allHeroes[enemyId]} choosen={true} />
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Arena;