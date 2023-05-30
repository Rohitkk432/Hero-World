# ⚔️ Hero World with no Villian

- Developing a Dapp using <code>Truffle-Solidity</code> , with <code>React-Typescript-ChakraUI</code> frontend.
- Inspired from <code>Cryptozombies , Cryptokitties</code>.
cleaned 

Deployed at - https://hero-world-web3.netlify.app/

## About

- A Fantast World where all species coexist and with no Evil.
- You can Own Heroes, Battle with Other Heroes, Trade Heroes. 
- Summon heroes using Summoning Cards
- Buy summoning cards , Level up your heroes.

## Installation

```
$ git clone https://github.com/Rohitkk432/Hero-World-with-no-Villian.git

$ cd Hero-World-with-no-Villian
```

Backend is in <code>Solidity - Truffle</code>

```
$ cd backend

# install dependancies/packages.
$ npm install

## testing with truffle test scripts (can find in test folder).
@notice- comment out development & Sepolia inside network in "truffle-config.js" 
@notice- remove the x which ignores the tests. (xit => it) (xcontext => context)
$ truffle test

## testing using ganache
$ npm install -g ganache-cli
(in one terminal)
$ ganache-cli
(in 2nd terminal)
$ truffle migrate

## deploying with your own account
@notice- add your mnemonic and infura access token
$ truffle migrate --network Sepolia
```

Frontend is in <code>React - Typescript - ChakraUi</code>

```
$ cd frontend

@notice if you want to change contract address change it in "./src/contracts/functions.ts"

## running frontend locally
$ npm run start
```

## Concept

- As a learning opportunity most of the code is taken from cryptozombies and built on it
- When one opens the website they must need metamask install
- Then one can connect to Sepolia network and click on <code>Connect</code> on landing page.
- And create the first hero.
- The hero model consists of dna - which break downs to an ADJECTIVE and GREEK-NAME on frontend, species and rarity which maps to its value on frontend.
- In Arena can fight with other heroes on the game network but hero also has a cooldown period after each fight.
- If you win a fight you get a "summoning card" as a reward.
- After summoning card reaches its readyTime you can use it to summon a new hero on your team.
- You can also see all the heroes from <code>All Heroes</code> tab.
- You can transfer/approve heroes to other players using their address, and also tak eownership of other's heroes if you are approved by them.
- you can also pay ether to "level up" a hero , and buy summoning cards

## Snapshots

#### Landing Page
<img width="959" alt="image" src="https://user-images.githubusercontent.com/74586376/183499828-0a5866aa-f72a-49b2-b588-6a4d12327dec.png">

#### First Hero
<img width="958" alt="image" src="https://user-images.githubusercontent.com/74586376/183500255-6ae831dc-a191-47de-bc7d-15a4cec754c1.png">

#### All Heroes Page
<img width="958" alt="image" src="https://user-images.githubusercontent.com/74586376/183500647-c597d845-8c4f-4fc7-b05f-26647f94a626.png">

#### Arena Page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/74586376/183500772-a47bb8c4-df6e-42dc-afdd-5905bbfc49a4.png">

#### Transfer Page
<img width="959" alt="image" src="https://user-images.githubusercontent.com/74586376/183500888-bb713e36-017f-4fab-9f31-a46192201794.png">

#### Take Ownership Page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/74586376/183501154-a1d731ab-9a62-43e4-b366-406cd98e8688.png">

#### My Heroes Page
<img width="958" alt="image" src="https://user-images.githubusercontent.com/74586376/183501344-ff1fa4ad-6442-4cf0-a05a-503ef75e2ba2.png">

#### Hero Details Page
<img width="945" alt="image" src="https://user-images.githubusercontent.com/74586376/183501477-5aebf645-0ece-4074-9fe5-4ce765626835.png">

## Contribution

Made with ☕ and ❤️ by Rohit






