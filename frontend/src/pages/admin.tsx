import React from 'react'
import {useEffect,useState} from 'react'
import { Button, Box, Text ,useColorModeValue, Input} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

import {useNavigate} from 'react-router-dom'
import Process from '../components/process'

import {getContractOwner,getContractBalance,withdrawBalance,changeLevelUpFee, changeCardPurchaseFee} from '../contracts/functions'

interface adminProps {
}

const Admin: React.FC<adminProps> = () => {
    const navigate = useNavigate()
    const [processBox,setProcessBox] = useState("closed");

    const [contractBalance,setContractBalance] = useState("")
    const [newLevelUpFee,setNewLevelUpFee] = useState(0)
    const [newCardPurchaseFee,setNewCardPurchaseFee] = useState(0)

    useEffect(()=>{
        getContractOwner().then((result)=>{
            if(window.sessionStorage.getItem("currentAccount")?.toLowerCase()!==result.toLowerCase()){
                navigate("/")
            }
        }).catch((error)=>{
            console.log(error)
        })
        getContractBalance().then((res)=>{
            setContractBalance(res)
        }).catch((error)=>{
            console.log(error)
        })
    },[navigate])
    return (
        <>
            <Process processBox={processBox} setProcessBox={setProcessBox} />
            <Box w="80%" mx="auto" mt={10} display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column" >
                <Text w="100%" pb={1} pl={2} borderBottom={useColorModeValue("1px solid black","1px solid white")} fontSize="3xl" fontWeight="bold">Admin Commands</Text>
                <Box display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row" mt={7} >
                    <Text fontSize="xl" mr={5}>Contract Balance : {contractBalance}</Text>
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row" mt={3} >
                    <Text fontSize="xl" mr={5}>Withdraw Balance from Contract :</Text>
                    <Button isDisabled={contractBalance==="0.0 ETH"} onClick={()=>{
                        setProcessBox("loading");
                        withdrawBalance().then((res)=>{
                            setProcessBox("success");
                            getContractBalance().then((res)=>{
                                setContractBalance(res)
                            })
                        }).catch((err)=>{
                            setProcessBox("failed");
                            console.log(err)
                        })
                    }}>Withdraw &nbsp; <ArrowRightIcon/></Button>
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row" mt={5} >
                    <Text fontSize="xl" mr={5}>Set Level Up fee :</Text>
                    <Input type="number" variant='filled' placeholder='new level up fee' w={400} value={newLevelUpFee} onChange={(e)=>setNewLevelUpFee(Number(e.target.value))} />
                    <Button isDisabled={newLevelUpFee===0} ml={3} onClick={()=>{
                        setProcessBox("loading");
                        changeLevelUpFee(newLevelUpFee).then((res)=>{
                            setProcessBox("success");
                            setNewLevelUpFee(0)
                            return res
                        }).catch((err)=>{
                            setProcessBox("failed");
                            console.log(err)
                        })
                    }}>Change &nbsp; <ArrowRightIcon/></Button>
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row" mt={5} >
                    <Text fontSize="xl" mr={5}>Set Card Purchase fee :</Text>
                    <Input type="number" variant='filled' placeholder='new card purchase fee' w={400} value={newCardPurchaseFee} onChange={(e)=>setNewCardPurchaseFee(Number(e.target.value))} />
                    <Button isDisabled={newCardPurchaseFee===0} ml={3} onClick={()=>{
                        setProcessBox("loading");
                        changeCardPurchaseFee(newCardPurchaseFee).then((res)=>{
                            setProcessBox("success");
                            setNewCardPurchaseFee(0)
                            return res
                        }).catch((err)=>{
                            setProcessBox("failed");
                            console.log(err)
                        })
                    }}>Change &nbsp; <ArrowRightIcon/></Button>
                </Box>
            </Box>
        </>
    );
}

export default Admin;