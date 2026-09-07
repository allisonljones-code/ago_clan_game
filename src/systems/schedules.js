export function createSchedules({getPlayer,getCats,isStarted,isDialogueOpen}){
  function scheduleBase(character){
    const player=getPlayer(),hour=(player.minute/60)%24;
    const morning=hour<10,midday=hour>=10&&hour<17;
    const wolf=player.species==='wolf';

    if(character.id==='mother'){
      if(morning)return {x:850,y:700,label:wolf?'Pup Den':'Nursery'};
      if(midday)return {x:820,y:620,label:'Central clearing'};
      return {x:850,y:735,label:wolf?'Pup Den':'Nursery'};
    }
    if(character.id==='sister'){
      if(morning)return {x:930,y:700,label:'Family den'};
      if(midday)return {x:1040,y:570,label:'Play clearing'};
      return {x:900,y:725,label:'Family den'};
    }
    if(character.id==='brother'){
      if(morning)return {x:900,y:720,label:'Family den'};
      if(midday)return {x:1000,y:650,label:'Play clearing'};
      return {x:935,y:745,label:'Family den'};
    }
    if(character.id==='leader'){
      if(morning)return {x:900,y:390,label:'Elder den'};
      if(midday)return {x:930,y:515,label:'Central clearing'};
      return {x:900,y:365,label:'Elder den'};
    }
    if(character.id==='warrior'){
      if(morning)return {x:1110,y:610,label:'Hunter area'};
      if(midday)return {x:1175,y:470,label:'Outer paths'};
      return {x:1080,y:650,label:'Hunter area'};
    }
    if(character.id==='healer'){
      if(morning)return {x:600,y:555,label:'Herb hollow'};
      if(midday)return {x:660,y:525,label:'Gathering herbs'};
      return {x:620,y:575,label:'Herb hollow'};
    }
    return {x:character.homeX,y:character.homeY,label:'Home'};
  }

  function update(deltaTime){
    if(!isStarted()||isDialogueOpen())return;
    getCats().forEach(character=>{
      if((character.zone||'home')!=='home')return;
      const base=scheduleBase(character);
      character.moveTimer-=deltaTime;

      if(character.moveTimer<=0){
        character.moveTimer=2.5+Math.random()*5.5;
        const radius=character.id==='mother'?55:(character.id==='sister'||character.id==='brother'?90:(character.id==='warrior'?115:65));
        const angle=Math.random()*Math.PI*2,wanderingDistance=Math.random()*radius;
        character.targetX=base.x+Math.cos(angle)*wanderingDistance;
        character.targetY=base.y+Math.sin(angle)*wanderingDistance*.65;
        character.targetX=Math.max(590,Math.min(1210,character.targetX));
        character.targetY=Math.max(320,Math.min(930,character.targetY));
        character.currentActivity=base.label;
      }

      const dx=character.targetX-character.x,dy=character.targetY-character.y,distance=Math.hypot(dx,dy);
      if(distance>3){
        const speed=(character.id==='sister'||character.id==='brother')?34:(character.id==='warrior'?28:23);
        character.x+=dx/distance*speed*deltaTime;
        character.y+=dy/distance*speed*deltaTime;
      }
    });
  }

  function isSecretFriendAvailable(){
    const player=getPlayer();
    if(!player.friendMet)return false;
    const hour=(player.minute/60)%24;
    return hour>=10&&hour<17;
  }

  return Object.freeze({update,isSecretFriendAvailable});
}
