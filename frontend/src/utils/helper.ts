

export const heroParser = (res:any,heroData:any) => {
    let hero={adjective:"",name:"",species:"",rarity:"",level:0,winCount:0,lossCount:0,readyTime:"",summonType:""};
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
    let cooldownTIme = "";
    if(msTime>0){
        if(msTime>=1000*60*60){
            const hrsTime = Math.floor(msTime/3600000);
            msTime = msTime%3600000;
            const minsTime = Math.floor(msTime/60000);
            cooldownTIme = `${hrsTime} hrs ${minsTime} mins`;
        }else if(msTime>=1000*60 && msTime<1000*60*60){
            const minsTime = Math.floor(msTime/60000);
            cooldownTIme = `${minsTime} mins`;
        }else{
            cooldownTIme = `1 mins`;
        }
    }else{
        cooldownTIme = `Ready`;
    }
    


    hero.adjective = heroAdj;
    hero.name = heroName;
    hero.species = heroSpecies;
    hero.rarity = heroRarity;
    hero.level = res.level;
    hero.winCount = res.winCount;
    hero.lossCount = res.lossCount;
    hero.readyTime = cooldownTIme;
    hero.summonType = res.summonType;
    return hero
}