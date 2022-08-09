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
import MySummonCards from './pages/mySummonCards';
import Transfer from './pages/transfer';
import TakeOwnership from './pages/takeOwnership';
import Admin from './pages/admin';

interface appProps {

}

declare let window:any

export const App:React.FC<appProps> = () => {

  const [metamaskConnection,setMetamaskConnection] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [balance, setBalance] = useState<string | undefined>()

  useEffect(() => {
    if(!window.ethereum){
      setMetamaskConnection(false);
      return
    }
    //connect to metamask
    setMetamaskConnection(true)

    let accountInStorage:string | undefined = window.sessionStorage.getItem("currentAccount")
    if(accountInStorage){
      setCurrentAccount(accountInStorage)
    }
    if(!currentAccount || !ethers.utils.isAddress(currentAccount) || !accountInStorage) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result)+" ETH")
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
    setCurrentAccount(undefined)
    setBalance(undefined)
  }

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Nav currentAccount={currentAccount} />
        <Routes>
          <Route path="/" element={<Landing 
          metamaskConnection={metamaskConnection}
          onClickConnect={onClickConnect} 
          onClickDisconnect={onClickDisconnect}
          currentAccount={currentAccount}
          balance={balance}
          />} />
          <Route path="/heroes" element={<Heroes/>} />
          <Route path="/arena/:heroId/:enemyId" element={<Arena/>} />
          <Route path="/transfer/:tokenId" element={<Transfer/>} />
          <Route path="/takeownership/:tokenId" element={<TakeOwnership/>} />
          <Route path="/my/heroes" element={<MyHeroes/>} />
          <Route path="/my/cards" element={<MySummonCards/>} />
          <Route path="/hero/:heroId" element={<HeroDetails/>} />
          <Route path="/result/:reward" element={<FightResult/>} />
          <Route path="/new/hero/:heroId" element={<NewHero/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}