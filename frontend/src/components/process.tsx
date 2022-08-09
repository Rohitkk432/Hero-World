import React from 'react'
import { Button, Box, Text,useColorModeValue} from '@chakra-ui/react'
import {CloseIcon,CheckCircleIcon,WarningTwoIcon} from '@chakra-ui/icons'

interface processProps {
    processBox: string,
    setProcessBox: React.Dispatch<React.SetStateAction<string>>;
}

const Process: React.FC<processProps> = ({processBox,setProcessBox}) => {
    
    const bgOfOverlay = useColorModeValue("blackAlpha.500","whiteAlpha.700")
    const closeBtn = useColorModeValue("black","white")

    return (
        <>  
            {   processBox !== "closed" ?
                (
                    <Box position="absolute" top={0} left={0} w="100vw" h="100vh" bg={bgOfOverlay}  zIndex={5} display="flex" justifyContent="center" alignItems="center" >
                        <Box w={350} h={200} rounded="2xl" boxShadow="dark-lg" bg="gray.800" position="relative" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            {processBox === "success" ?
                                (
                                    <>
                                    <Button fontSize="xl" color={closeBtn} position="absolute" right={3} top={3} onClick={()=>setProcessBox("closed")} ><CloseIcon/></Button>
                                    <Text color="white" fontSize="2xl"><CheckCircleIcon color="#39FF14" textAlign="center"/> Process Success</Text>
                                    </>
                                ):processBox === "failed" ?(
                                    <>
                                    <Button fontSize="xl" color={closeBtn} position="absolute" right={3} top={3} onClick={()=>setProcessBox("closed")} ><CloseIcon/></Button>
                                    <Text color="white" fontSize="2xl"><WarningTwoIcon color="red.500" textAlign="center"/> Process Failed</Text>
                                    </>
                                ):processBox === "loading" ?(
                                    <Button color="white" isLoading loadingText='Processing Request' size="lg" variant='ghost'></Button>
                                ):null
                            }
                        </Box>
                    </Box>
                ):null
            }
        </>
    );
}

export default Process;