function deepFreeze(value){
  if(value&&typeof value==='object'&&!Object.isFrozen(value)){
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
}

const V8_PLAYER_TEMPLATE=deepFreeze({
  x:900,
  y:680,
  name:'Raya',
  species:'wildcat',
  fur:'#c9784e',
  eye:'#6fa7d2',
  mark:'stripe',
  personality:'Curious',
  homeGroup:'Moonfall Colony',
  hunger:90,
  energy:90,
  health:100,
  skills:{pounce:0,stealth:0,fight:0,social:0},
  memories:['🌅 Born into the wild'],
  day:1,
  minute:420,
  waterfallFound:false,
  friendMet:false,
  waterfallHintSeen:false,
  difficulty:'easy',
  milestones:{mother:false,play:false,sleep:false,waterfall:false,friend:false,training:0,hunt:false},
  zone:'home'
});

const V8_RELATIONSHIP_TEMPLATES=deepFreeze({
  mother:{trust:100,talks:0,fights:0,bond:100,history:['❤️ Nightpelt is your mother.']},
  sister:{trust:75,talks:0,fights:0,bond:80,history:['🐾 Bramblepaw is your sister.']},
  brother:{trust:75,talks:0,fights:0,bond:80,history:['🐾 Jonnipur is your brother.']},
  leader:{trust:10,talks:0,fights:0,bond:5,history:['👑 You have seen Mossheart around home.']},
  warrior:{trust:5,talks:0,fights:0,bond:5,history:['⚔️ Ashstep is one of the hunters.']},
  healer:{trust:10,talks:0,fights:0,bond:10,history:['🌿 Clovermist is the healer.']},
  secretFriend:{trust:50,talks:0,fights:0,bond:50,history:['💧 You have not met anyone at the waterfall yet.']}
});

const V8_WILDCAT_NPCS=deepFreeze([
  {id:'mother',name:'Nightpelt',role:'Mother • loving and kind',x:840,y:610,color:'#34383b',eye:'#83b97c',mark:'chest'},
  {id:'sister',name:'Bramble',role:'Sister • bold and competitive',x:950,y:630,color:'#9a6d4e',eye:'#d1ac56',mark:'stripe'},
  {id:'brother',name:'Jonnipur',role:'Brother • curious and playful',x:930,y:735,color:'#c4a078',eye:'#75a9cc',mark:'patch'},
  {id:'leader',name:'Mossheart',role:'Colony Elder • strict but kind',x:900,y:365,color:'#a76d4b',eye:'#8ec272',mark:'stripe'},
  {id:'warrior',name:'Ashstep',role:'Hunter • quick and watchful',x:1160,y:650,color:'#5b6268',eye:'#d1ac56',mark:'chest'},
  {id:'healer',name:'Clovermist',role:'Healer • keeper of herbs and stories',x:620,y:570,color:'#d7cfbe',eye:'#75a9cc',mark:'patch'}
]);

const V8_WOLF_NPCS=deepFreeze([
  {id:'mother',name:'Nightwind',role:'Mother • loving and steady',x:840,y:610,color:'#4c5053',eye:'#8eb585',mark:'chest'},
  {id:'sister',name:'Briar',role:'Sister • bold and competitive',x:950,y:630,color:'#755f4e',eye:'#d0a85a',mark:'stripe'},
  {id:'brother',name:'Juniper',role:'Brother • curious and playful',x:930,y:735,color:'#9b8b78',eye:'#78a5c3',mark:'patch'},
  {id:'leader',name:'Stonecrest',role:'Pack Elder • strict but kind',x:900,y:365,color:'#69645d',eye:'#90b675',mark:'stripe'},
  {id:'warrior',name:'Flint',role:'Hunter • strong and alert',x:1160,y:650,color:'#555b5f',eye:'#d1ac56',mark:'chest'},
  {id:'healer',name:'Sage',role:'Healer • keeper of herbs and stories',x:620,y:570,color:'#b7b0a4',eye:'#75a9cc',mark:'patch'}
]);

export const V8_DIFFICULTY_RULES=deepFreeze({
  easy:{training:2,drain:.8},
  medium:{training:4,drain:1},
  hard:{training:6,drain:1.25}
});

function clone(value){
  if(Array.isArray(value))return value.map(clone);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,clone(item)]));
  return value;
}

export function createPlayerState(){return clone(V8_PLAYER_TEMPLATE)}
export function createRelationships(){return clone(V8_RELATIONSHIP_TEMPLATES)}
export function getNPCDefinitions(species){return clone(species==='wolf'?V8_WOLF_NPCS:V8_WILDCAT_NPCS)}
