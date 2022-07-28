const HeroWorld = artifacts.require("HeroWorld");
const utils = require("./helpers/utils");
const {time} = require("@openzeppelin/test-helpers");

contract("HeroWorld", (accounts) => {
    let [alice,bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await HeroWorld.new();
    })
    xit("should be able to create first Hero", async () => {
        const result = await contractInstance.generateRandomHero({from: alice});
        assert.equal(result.receipt.status, true);
    })
    xit("shouldn't allow to create second Hero without Summon Card", async () => {
        await contractInstance.generateRandomHero({from: alice});
        await utils.shouldThrow(contractInstance.generateRandomHero({from: alice}));
    })
    xcontext("with the single-step transfer scenario", async () => {
        it("should be able to transfer hero", async() => {
            const result = await contractInstance.generateRandomHero({from: alice});
            const heroId = result.logs[0].args.heroId.toNumber();
            await contractInstance.transfer(bob, heroId, {from: alice});
            const newOwner = await contractInstance.ownerOf(heroId);
            assert.equal(newOwner, bob);
        })
    })
    xcontext("with the two-step transfer scenario", async () => {
        it("should be able to approve then transfer function called by owner", async() => {
            const result = await contractInstance.generateRandomHero({from: alice});
            const heroId = result.logs[0].args.heroId.toNumber();
            await contractInstance.approve(bob, heroId, {from: alice});
            await contractInstance.transfer(bob, heroId, {from: alice});
            const newOwner = await contractInstance.ownerOf(heroId);
            assert.equal(newOwner, bob);
        })
        it("should be able to approve then transfer function called by approved", async() => {
            const result = await contractInstance.generateRandomHero({from: alice});
            const heroId = result.logs[0].args.heroId.toNumber();
            await contractInstance.approve(bob, heroId, {from: alice});
            await contractInstance.takeOwnership(heroId, {from: bob});
            const newOwner = await contractInstance.ownerOf(heroId);
            assert.equal(newOwner, bob);
        })
    })
    xit("should be able to fight",async()=>{
        let result;
        result = await contractInstance.generateRandomHero({from: alice});
        const hero1Id = result.logs[0].args.heroId.toNumber();
        result = await contractInstance.generateRandomHero({from: bob});
        const hero2Id = result.logs[0].args.heroId.toNumber();
        await time.increase(time.duration.days(1));
        result = await contractInstance.fight(hero1Id,hero2Id,{from:alice});
        assert.equal(result.receipt.status,true);
    })
})