export function createInputMovement({joystick,stick,getPlayer,isStarted,isDialogueOpen,closeMenu}){
  let move={x:0,y:0};
  let joyId=null;
  let center={x:0,y:0};

  function jstart(event){
    let touch=event.changedTouches?event.changedTouches[0]:event;
    joyId=touch.identifier??'m';
    let bounds=joystick.getBoundingClientRect();
    center={x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2};
    jmove(event);
  }

  function jmove(event){
    if(joyId===null)return;
    let touch=event.changedTouches?[...event.changedTouches].find(item=>item.identifier===joyId):event;
    if(!touch)return;
    let dx=touch.clientX-center.x,dy=touch.clientY-center.y,magnitude=Math.hypot(dx,dy),maxDistance=34;
    if(magnitude>maxDistance){dx=dx/magnitude*maxDistance;dy=dy/magnitude*maxDistance}
    move={x:dx/maxDistance,y:dy/maxDistance};
    stick.style.transform=`translate(${dx}px,${dy}px)`;
    event.preventDefault();
  }

  function jend(){
    joyId=null;
    move={x:0,y:0};
    stick.style.transform='translate(0,0)';
  }

  joystick.addEventListener('touchstart',jstart,{passive:false});
  joystick.addEventListener('touchmove',jmove,{passive:false});
  joystick.addEventListener('touchend',jend,{passive:false});
  joystick.addEventListener('mousedown',jstart);
  addEventListener('mousemove',event=>{if(joyId==='m')jmove(event)});
  addEventListener('mouseup',jend);

  function update(deltaTime){
    if(!isStarted()||isDialogueOpen())return;
    let player=getPlayer(),length=Math.hypot(move.x,move.y)||1;
    player.x+=move.x/length*145*deltaTime;
    player.y+=move.y/length*145*deltaTime;
    player.x=Math.max(560,Math.min(1240,player.x));
    player.y=Math.max(300,Math.min(980,player.y));
    if(Math.abs(move.x)+Math.abs(move.y)>.05)closeMenu();
  }

  return Object.freeze({update});
}
