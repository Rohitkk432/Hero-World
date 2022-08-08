

export const heroParser = (res:any,heroData:any) => {
    let hero={id:0,adjective:"",name:"",species:"",rarity:"",level:0,winCount:0,lossCount:0,readyTime:"",summonType:""};
    let heroDna = Number(res.dna);
    const heroAdjNum = heroDna%1000;
    heroDna = Math.floor(heroDna/1000);
    const heroNameNum = heroDna%1000;
    const heroAdj = heroData.adjective[heroAdjNum % (heroData.adjective.length - 1)];
    const heroName = heroData.name[heroNameNum % (heroData.name.length - 1)];
    const heroSpecies = heroData.species[res.species % (heroData.species.length - 1)];
    const heroRarity = heroData.rarity[res.rarity % (heroData.rarity.length - 1)];

    //time
    let msTime = (new Date(res.readyTime*1000).getTime() - new Date().getTime()) ;
    let cooldownTime = "";
    if(msTime>0){
        if(msTime>=1000*60*60){
            const hrsTime = Math.floor(msTime/3600000);
            msTime = msTime%3600000;
            const minsTime = Math.floor(msTime/60000);
            cooldownTime = `${hrsTime} hrs ${minsTime} mins`;
        }else if(msTime>=1000*60 && msTime<1000*60*60){
            const minsTime = Math.floor(msTime/60000);
            cooldownTime = `${minsTime} mins`;
        }else{
            cooldownTime = `<1 mins`;
        }
    }else{
        cooldownTime = `Ready`;
    }
    

    hero.id = res.heroId;
    hero.adjective = heroAdj;
    hero.name = heroName;
    hero.species = heroSpecies;
    hero.rarity = heroRarity;
    hero.level = res.level;
    hero.winCount = res.winCount;
    hero.lossCount = res.lossCount;
    hero.readyTime = cooldownTime;
    hero.summonType = res.summonType;
    return hero
}

export const cardParser = (res:any,heroData:any) => {
    let card={id:0,species:"",rarity:"",readyTime:""};
    const cardSpecies = heroData.species[res.species % (heroData.species.length - 1)];
    const cardRarity = heroData.rarity[res.rarity % (heroData.rarity.length - 1)];

    //time
    let msTime = (new Date(res.readyTime*1000).getTime() - new Date().getTime()) ;
    let cooldownTime = "";
    if(msTime>0){
        if(msTime>=1000*60*60){
            const hrsTime = Math.floor(msTime/3600000);
            msTime = msTime%3600000;
            const minsTime = Math.floor(msTime/60000);
            cooldownTime = `${hrsTime} hrs ${minsTime} mins`;
        }else if(msTime>=1000*60 && msTime<1000*60*60){
            const minsTime = Math.floor(msTime/60000);
            cooldownTime = `${minsTime} mins`;
        }else{
            cooldownTime = `< 1 mins`;
        }
    }else{
        cooldownTime = `Ready`;
    }
    

    card.id = res.summonCardId;
    card.species = cardSpecies;
    card.rarity = cardRarity;
    card.readyTime = cooldownTime;
    return card
}