import React from 'react';
import {useEffect,useState} from 'react';

// chakra UI
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//web3
import {ethers} from "ethers"

// components 
import Nav from "./components/nav";
import Landing from "./pages/landing";
import Heroes from "./pages/heroes";
import HeroDetails from "./pages/heroDetails";
import Arena from "./pages/arena";
import FightResult from "./pages/fightResult";
import MyHeroes from "./pages/myHeroes";
import NewHero from "./pages/newHero";

interface appProps {

}

declare let window:any

export const App:React.FC<appProps> = () => {

  const [metamaskConnection,setMetamaskConnection] = useState(false)
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!window.ethereum) return
    //connect to metamask
    setMetamaskConnection(true)

    let accountInStorage:string | undefined = window.sessionStorage.getItem("currentAccount")
    if(accountInStorage){
      setCurrentAccount(accountInStorage)
    }
    if(!currentAccount || !ethers.utils.isAddress(currentAccount) || !accountInStorage) return

    //client side code
    //provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })

  },[currentAccount])

  const onClickConnect = () => {
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      if(accounts.length>0){
        setCurrentAccount(accounts[0])
        window.sessionStorage.setItem("currentAccount",accounts[0])
      }
    })
    .catch((e)=>console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    window.sessionStorage.removeItem("currentAccount")
    setBalance(undefined)
    setCurrentAccount(undefined)
    setChainId(undefined)
    setChainName(undefined)
  }

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Landing 
          metamaskConnection={metamaskConnection}
          onClickConnect={onClickConnect} 
          onClickDisconnect={onClickDisconnect}
          currentAccount={currentAccount}
          />} />
          <Route path="/heroes" element={<Heroes/>} />
          <Route path="/arena" element={<Arena/>} />
          <Route path="/my/heroes" element={<MyHeroes/>} />
          <Route path="/hero/:id" element={<HeroDetails/>} />
          <Route path="/fight/result" element={<FightResult/>} />
          <Route path="/new/hero" element={<NewHero/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}