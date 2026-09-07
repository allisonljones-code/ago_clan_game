export function createTimeNeeds({getPlayer,isStarted,isDialogueOpen,getDifficultyRules}){
  function update(deltaTime){
    if(!isStarted()||isDialogueOpen())return;
    const player=getPlayer(),drain=getDifficultyRules()[player.difficulty].drain;
    player.minute+=deltaTime*3.5;
    player.hunger=Math.max(0,player.hunger-deltaTime*.035*drain);
    player.energy=Math.max(0,player.energy-deltaTime*.025*drain);
  }

  function sleep(){
    const player=getPlayer();
    player.energy=100;
    player.hunger=Math.max(30,player.hunger-15);
    player.day++;
    player.minute=420;
  }

  return Object.freeze({update,sleep});
}
