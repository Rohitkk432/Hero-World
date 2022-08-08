import React from 'react'
import { Button, Box, useColorMode,useColorModeValue } from '@chakra-ui/react'
import {SunIcon, MoonIcon} from '@chakra-ui/icons'

import {Link} from 'react-router-dom'

interface navProps {

}

const Nav: React.FC<navProps> = () => {
    const { toggleColorMode } = useColorMode()
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
                <Button ml={5} size='sm' onClick={toggleColorMode}>
                    {useColorModeValue(<SunIcon w={5} h={5} />,<MoonIcon w={5} h={5} />)}
                </Button>
            </Box>
        </Box>
    );
}

export default Nav;