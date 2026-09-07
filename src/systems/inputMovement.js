export function createInputMovement({joystick,stick,getPlayer,isStarted,isDialogueOpen,closeMenu}){
  let move={x:0,y:0};
  let activePointerId=null;
  let center={x:0,y:0};

  function resetPointer(){
    const pointerId=activePointerId;
    activePointerId=null;
    move={x:0,y:0};
    stick.style.transform='translate(0,0)';
    if(pointerId!==null&&typeof joystick.releasePointerCapture==='function'){
      try{joystick.releasePointerCapture(pointerId)}catch{}
    }
  }

  function movePointer(event){
    if(activePointerId===null||event.pointerId!==activePointerId)return;
    let dx=event.clientX-center.x,dy=event.clientY-center.y,magnitude=Math.hypot(dx,dy),maxDistance=34;
    if(magnitude>maxDistance){dx=dx/magnitude*maxDistance;dy=dy/magnitude*maxDistance}
    move={x:dx/maxDistance,y:dy/maxDistance};
    stick.style.transform=`translate(${dx}px,${dy}px)`;
    event.preventDefault();
  }

  function startPointer(event){
    if(activePointerId!==null)return;
    activePointerId=event.pointerId;
    let bounds=joystick.getBoundingClientRect();
    center={x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2};
    if(typeof joystick.setPointerCapture==='function'){
      try{joystick.setPointerCapture(event.pointerId)}catch{}
    }
    movePointer(event);
  }

  joystick.addEventListener('pointerdown',startPointer,{passive:false});
  joystick.addEventListener('pointermove',movePointer,{passive:false});
  joystick.addEventListener('pointerup',resetPointer,{passive:false});
  joystick.addEventListener('pointercancel',resetPointer,{passive:false});
  joystick.addEventListener('lostpointercapture',resetPointer,{passive:false});
  addEventListener('pointermove',movePointer,{passive:false});
  addEventListener('pointerup',resetPointer,{passive:false});
  addEventListener('pointercancel',resetPointer,{passive:false});

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
