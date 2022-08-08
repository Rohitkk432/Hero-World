//web3
import {ethers} from "ethers"
import contract from "./HeroWorld.json"

declare let window:any

let provider :ethers.providers.Web3Provider ;
let signer: ethers.providers.JsonRpcSigner;
let heroWorldContract : ethers.Contract;

const ABI = contract.abi
const contractAddress = "0x73D0B08A531222Fa4d59c97217e2DC1475cc7871"

if(window.ethereum){
    //provider
    provider = new ethers.providers.Web3Provider(window.ethereum)
    //signer
    signer = provider.getSigner()
    //contract
    heroWorldContract = new ethers.Contract(contractAddress, ABI, signer)
}

//functions
//get all heroes
export const getAllHeroes = async () => {
    const heroes = await heroWorldContract.functions.getAllHeroes();
    return heroes[0]
}
//get my heroes
export const getMyHeroes = async (address:string) => {
    const heroes = await heroWorldContract.functions.getHeroesByOwner(address);
    return heroes[0]
}
//get my cards
export const getMyCards = async (address:string) => {
    const cards = await heroWorldContract.functions.getCardsByOwner(address);
    return cards[0]
}
//get enemy/other's heroes
export const getOthersHeroes = async (address:string) => {
    const heroes = await heroWorldContract.functions.getHeroesByOthers(address);
    return heroes[0]
}
//get hero by id
export const getHeroInfo = async (id:number) => {
    const hero = await heroWorldContract.functions.heroes(id);
    return hero
}
//get card by id
export const getCardInfo = async (id:number) => {
    const card = await heroWorldContract.functions.summonCards(id);
    return card
}
//get hero's owner by id
export const getHeroOwner = async (id:number) => {
    const owner = await heroWorldContract.functions.heroToOwner(id);
    return owner[0]
}
//get Count of heroes owned by address/owner
export const getOwnerHeroCount = async (address:string) => {
    const count = await heroWorldContract.functions.balanceOf(address);
    return Number(count[0])
}
//create first/starter hero
export const createFirstHero = async () => {
    const firstHero = await heroWorldContract.functions.generateRandomHero();
    const receipt = await firstHero.wait(); 
    return receipt.events[0].args
}

//using summon card
export const usingSummoningCard = async (id:number) => {
    const newHero = await heroWorldContract.functions.useSummoningCard(id);
    const receipt = await newHero.wait(); 
    return receipt.events[0].args
}

//fight
export const heroFight = async (myheroId:number,enemyId:number) => {
    const result = await heroWorldContract.functions.fight(myheroId,enemyId);
    const receipt = await result.wait(); 
    return receipt.events;
}

//transfer hero
export const transferHero = async (to:string,myHeroId:number) => {
    const result = await heroWorldContract.functions.transfer(to,myHeroId);
    const receipt = await result.wait();
    return receipt.events;
}

//approve hero transfer
export const approveHeroTransfer = async (to:string,myHeroId:number) => {
    const result = await heroWorldContract.functions.approve(to,myHeroId);
    const receipt = await result.wait();
    return receipt.events;
}

//take ownership of hero
export const takeOwnershipOfHero = async (myHeroId:number) => {
    const result = await heroWorldContract.functions.takeOwnership(myHeroId);
    const receipt = await result.wait();
    return receipt.events;
}

//get heroes approved for you
export const getHeroesApprovedToYou = async (address:string) => {
    const heroes = await heroWorldContract.functions.getHeroesApprovedForYou(address);
    return heroes[0]
}

//paid services
//level up your hero
export const levelUpHero = async(myHeroId:number) => {
    const result = await heroWorldContract.functions.levelUp(myHeroId,{value: ethers.utils.parseEther("0.001")});
    const receipt = await result.wait();
    return receipt;
}

//buy summoning card
export const buySummoningCard = async() => {
    const result = await heroWorldContract.functions.purchaseCard({value: ethers.utils.parseEther("0.002")});
    const receipt = await result.wait();
    return receipt.events[0].args;
}