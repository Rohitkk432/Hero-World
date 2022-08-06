//web3
import {ethers} from "ethers"
import contract from "./HeroWorld.json"

declare let window:any

//provider
const provider = new ethers.providers.Web3Provider(window.ethereum)
//signer
const signer = provider.getSigner()
//contract
const ABI = contract.abi
const contractAddress = "0x4AC7F89917235bD12b4A88f9Dbe4b753d11C0f8E"
const heroWorldContract = new ethers.Contract(contractAddress, ABI, signer)

//functions
export const getAllHeroes = async () => {
    const heroes = await heroWorldContract.functions.getAllHeroes();
    return heroes[0]
}

export const getHeroInfo = async (id:number) => {
    const hero = await heroWorldContract.functions.heroes(id);
    return hero
}

export const getHeroOwner = async (id:number) => {
    const owner = await heroWorldContract.functions.heroToOwner(id);
    return owner[0]
}

export const getOwnerHeroCount = async (address:string) => {
    const count = await heroWorldContract.functions.balanceOf(address);
    return Number(count[0])
}

export const createFirstHero = async () => {
    const firstHero = await heroWorldContract.functions.generateRandomHero();
    // const receipt = await firstHero.wait(); 
    return firstHero
}