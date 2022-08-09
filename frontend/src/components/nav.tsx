import React from 'react'
import {useEffect,useState} from 'react'
import { Button, Box, useColorMode,useColorModeValue } from '@chakra-ui/react'
import {SunIcon, MoonIcon} from '@chakra-ui/icons'

import {Link} from 'react-router-dom'

import {getContractOwner} from '../contracts/functions'

interface navProps {
    currentAccount:string | undefined
}

const Nav: React.FC<navProps> = ({currentAccount}) => {
    const { toggleColorMode } = useColorMode()
    const [contractOwner,setContractOwner] = useState<string | undefined>()
    useEffect(()=>{
        getContractOwner().then((result)=>{
            setContractOwner(result)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <Box bg='cyan.500' boxShadow='2xl' w="100%" p={3} px={7} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
            <Box fontSize="xl" fontWeight="bold" fontFamily="sans-serif" >
                <Link to="/">
                    Hero World with no Villain
                </Link>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" fontSize="lg" fontWeight="semibold" >
                <Link to="/heroes">
                    <Box mx={3} >All Heroes</Box>
                </Link>
                <Link to="/arena/null/null">
                    <Box mx={3} >Arena</Box>
                </Link>
                <Link to="/transfer/null">
                    <Box mx={3} >Transfer</Box>
                </Link>
                <Link to="/my/heroes">
                    <Box mx={3} >My Heroes</Box>
                </Link>
                {(contractOwner!==undefined && currentAccount!==undefined && currentAccount.toLowerCase()===contractOwner.toLowerCase())?
                    (<Link to="/admin">
                        <Box mx={3} >Admin</Box>
                    </Link>):null
                }
                <Button ml={5} size='sm' onClick={toggleColorMode}>
                    {useColorModeValue(<SunIcon w={5} h={5} />,<MoonIcon w={5} h={5} />)}
                </Button>
            </Box>
        </Box>
    );
}

export default Nav;