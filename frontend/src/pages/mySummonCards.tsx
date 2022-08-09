import React from 'react'
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

import SummonCard from '../components/summonCard'
import Process from '../components/process'

import {Box,Text,Button} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons' 

import {getMyCards,buySummoningCard} from '../contracts/functions'


interface mySummonCardsProps {

}

const MySummonCards: React.FC<mySummonCardsProps> = () => {
    const [processBox,setProcessBox] = useState("closed");

    const [myCards, setMyCards] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
        const myAddress = sessionStorage.getItem('currentAccount')
        if(myAddress){
            getMyCards(myAddress).then(res=>{
                setMyCards(res)
            })
        }
    },[refresh])
    return (
        <>  
            <Process processBox={processBox} setProcessBox={setProcessBox} />
            <Box w="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Text fontSize="3xl" fontWeight="bold" mt={5}>
                    My Summon Cards
                    <Link to="/my/heroes">
                        <Button size="md" ml={10} >Show my Heroes</Button>
                    </Link>
                    <Button size="md" ml={10}
                    onClick={()=>{
                        setProcessBox("loading");
                        buySummoningCard().then(res=>{
                            setProcessBox("success");
                            setRefresh(!refresh)
                        }).catch(err=>{
                            setProcessBox("failed");
                            console.log(err)
                        })
                    }}
                    >Buy Summoning Card &nbsp; <AddIcon/></Button>
                </Text>
                <Box w="80%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" flexWrap="wrap" mx="auto">
                    {myCards.map((card,index)=>{
                        return (<SummonCard key={index} summonCard={card} />)
                    })}
                </Box>
            </Box>
        </>
    );
}

export default MySummonCards;