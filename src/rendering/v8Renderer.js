export function createV8Renderer({ctx,getViewport,getCamera,getZone,getPlayer,getVisibleNpcs,getClock}){
  function sx(x){return x-getCamera().x}
  function sy(y){return y-getCamera().y}

  function tree(x,y,s=1){
    let X=sx(x),Y=sy(y);
    ctx.fillStyle='#604834';ctx.fillRect(X-7*s,Y+8*s,14*s,34*s);
    ctx.fillStyle='#315b40';ctx.beginPath();ctx.arc(X,Y,30*s,0,7);ctx.fill();
    ctx.fillStyle='#437251';ctx.beginPath();ctx.arc(X-17*s,Y+4*s,20*s,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(X+17*s,Y+4*s,20*s,0,7);ctx.fill();
  }

  function den(x,y,w,h,label){
    let X=sx(x),Y=sy(y);
    ctx.fillStyle='#5c4d3c';ctx.beginPath();ctx.ellipse(X,Y,w/2,h/2,0,0,7);ctx.fill();
    ctx.fillStyle='#27352d';ctx.beginPath();ctx.ellipse(X,Y+10,w*.19,h*.25,0,0,7);ctx.fill();
    ctx.fillStyle='#fffddd';ctx.font='bold 11px -apple-system';ctx.textAlign='center';ctx.fillText(label,X,Y-h*.62);
  }

  function animal(c,isPlayer=false){
    const player=getPlayer();
    let X=sx(c.x),Y=sy(c.y);
    ctx.save();ctx.translate(X,Y);
    const species=c.species||player.species;
    const bodyColor=c.color||player.fur;
    const eyeColor=c.eye||player.eye;
    const scale=isPlayer?.78:1;

    ctx.fillStyle='#0003';ctx.beginPath();
    ctx.ellipse(0,18,species==='wolf'?(isPlayer?22:30):(isPlayer?18:23),7,0,0,7);ctx.fill();
    ctx.scale(scale,scale);

    if(species==='wolf'){
      ctx.fillStyle=bodyColor;
      ctx.beginPath();ctx.ellipse(0,2,31,19,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(-19,-9,15,20,-.2,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(-23,-28,17,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(-34,-23,14,8,-.05,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.moveTo(-35,-39);ctx.lineTo(-31,-57);ctx.lineTo(-22,-40);ctx.fill();
      ctx.beginPath();ctx.moveTo(-18,-41);ctx.lineTo(-11,-56);ctx.lineTo(-8,-37);ctx.fill();
      const legs=[[-18,13],[-5,14],[13,13],[24,11]];
      legs.forEach(([lx,ly])=>{ctx.fillRect(lx,ly,7,22);ctx.beginPath();ctx.ellipse(lx+3.5,35,6,3,0,0,Math.PI*2);ctx.fill()});
      ctx.strokeStyle=bodyColor;ctx.lineWidth=13;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(28,0);ctx.quadraticCurveTo(48,-7,53,10);ctx.stroke();
      const mark=c.mark||player.mark;
      if(mark==='chest'){ctx.fillStyle='#f3e9d7';ctx.beginPath();ctx.ellipse(-20,-6,8,13,-.2,0,Math.PI*2);ctx.fill()}
      if(mark==='patch'){ctx.fillStyle='#f3e9d7';ctx.beginPath();ctx.ellipse(-29,-29,7,8,.25,0,Math.PI*2);ctx.fill()}
      if(mark==='stripe'){ctx.strokeStyle='#473a31';ctx.lineWidth=3;[-30,-24,-18].forEach(x=>{ctx.beginPath();ctx.moveTo(x,-42);ctx.lineTo(x-2,-35);ctx.stroke()})}
      ctx.fillStyle=eyeColor;ctx.beginPath();ctx.arc(-29,-29,3,0,Math.PI*2);ctx.arc(-19,-29,3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(-29,-29,1.2,0,Math.PI*2);ctx.arc(-19,-29,1.2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-46,-23,3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.font='bold 12px -apple-system';ctx.textAlign='center';ctx.fillText(c.name||player.name,-10,-65);
    }else{
      ctx.fillStyle=bodyColor;ctx.beginPath();ctx.ellipse(0,2,20,27,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(0,-20,18,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.moveTo(-13,-31);ctx.lineTo(-6,-45);ctx.lineTo(-1,-31);ctx.fill();
      ctx.beginPath();ctx.moveTo(13,-31);ctx.lineTo(6,-45);ctx.lineTo(1,-31);ctx.fill();
      ctx.strokeStyle=bodyColor;ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(16,7);ctx.quadraticCurveTo(37,-7,30,-27);ctx.stroke();
      const mark=c.mark||player.mark;
      if(mark==='stripe'){ctx.strokeStyle='#473a31';ctx.lineWidth=3;[-6,0,6].forEach(x=>{ctx.beginPath();ctx.moveTo(x,-36);ctx.lineTo(x-2,-29);ctx.stroke()})}
      if(mark==='patch'){ctx.fillStyle='#f3e9d7';ctx.beginPath();ctx.ellipse(7,-25,7,9,.3,0,Math.PI*2);ctx.fill()}
      if(mark==='chest'){ctx.fillStyle='#f3e9d7';ctx.beginPath();ctx.ellipse(0,4,8,14,0,0,Math.PI*2);ctx.fill()}
      ctx.fillStyle=eyeColor;ctx.beginPath();ctx.arc(-6,-21,3,0,Math.PI*2);ctx.arc(6,-21,3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(-6,-21,1.2,0,Math.PI*2);ctx.arc(6,-21,1.2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#b66d6d';ctx.beginPath();ctx.arc(0,-15,2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.font='bold 12px -apple-system';ctx.textAlign='center';ctx.fillText(c.name||player.name,0,-52);
    }
    ctx.restore();
  }

  function homeBackground(){
    const {W,H}=getViewport(),player=getPlayer();
    ctx.fillStyle='#4d7255';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#789a6c';ctx.beginPath();ctx.arc(sx(900),sy(650),480,0,7);ctx.fill();
    ctx.strokeStyle='#b8a27d';ctx.lineWidth=100;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx(900),sy(650));ctx.lineTo(sx(900),sy(1100));ctx.stroke();
    den(850,760,230,145,player.species==='wolf'?'Pup Den':'Nursery');
    den(900,275,170,100,player.species==='wolf'?'Pack Elder den':'Colony Elder den');
    den(540,520,150,90,player.species==='wolf'?'Herb Hollow':'Healer den');
    den(1210,620,160,95,'Hunters');
    for(let i=0;i<34;i++){let a=i*.75,r=460+(i%5)*40;tree(900+Math.cos(a)*r,650+Math.sin(a)*r*.75,.85+(i%3)*.12)}
  }

  function waterfallBackground(){
    const {W,H}=getViewport();
    ctx.fillStyle='#284b3a';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#6f9168';ctx.beginPath();ctx.ellipse(sx(900),sy(620),430,370,0,0,7);ctx.fill();
    ctx.fillStyle='#a9d8e8';ctx.fillRect(sx(865),sy(280),70,220);
    ctx.fillStyle='#e7f7fb';ctx.fillRect(sx(878),sy(285),10,210);ctx.fillRect(sx(910),sy(285),8,210);
    ctx.fillStyle='#78a9bd';ctx.beginPath();ctx.ellipse(sx(900),sy(560),175,90,0,0,7);ctx.fill();
    ctx.fillStyle='#68645d';[[755,540,40],[1045,550,48],[795,655,30],[1010,670,34]].forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(sx(x),sy(y),r,0,7);ctx.fill()});
    for(let i=0;i<22;i++){let a=i*.9,r=340+(i%4)*38;tree(900+Math.cos(a)*r,610+Math.sin(a)*r*.72,.82+(i%3)*.1)}
    ctx.strokeStyle='#b8a27d';ctx.lineWidth=78;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx(900),sy(760));ctx.lineTo(sx(900),sy(1080));ctx.stroke();
    ctx.font='bold 14px -apple-system';ctx.textAlign='center';ctx.fillStyle='#fffddd';ctx.fillRect(sx(900)-52,sy(245)-15,104,22);ctx.fillStyle='#26342b';ctx.fillText('Waterfall',sx(900),sy(245)+1);
    const exitText='← Trail Home';let ex=sx(900),ey=sy(930);ctx.font='bold 13px -apple-system';ctx.textAlign='center';let ew=ctx.measureText(exitText).width+18;ctx.fillStyle='#fffddd';ctx.fillRect(ex-ew/2,ey-16,ew,23);ctx.fillStyle='#26342b';ctx.fillText(exitText,ex,ey+1);
  }

  function draw(){
    const {W,H}=getViewport(),player=getPlayer(),cats=getVisibleNpcs();
    if(getZone()==='waterfall')waterfallBackground();else homeBackground();
    cats.filter(c=>{if((c.zone||'home')!==getZone())return false;return true}).forEach(c=>animal({...c,species:c.species||player.species}));
    animal({x:player.x,y:player.y,name:player.name,color:player.fur,eye:player.eye,mark:player.mark,species:player.species},true);
    if(getZone()==='home'){
      const labels=[[850,760,player.species==='wolf'?'Pup Den':'Nursery'],[900,275,player.species==='wolf'?'Pack Elder':'Colony Elder'],[540,520,player.species==='wolf'?'Herb Hollow':'Healer Den'],[1210,620,'Hunters'],[620,900,'Waterfall Trail →']];
      labels.forEach(([x,y,t])=>{let X=sx(x),Y=sy(y)-65;ctx.font='bold 12px -apple-system';ctx.textAlign='center';let ww=ctx.measureText(t).width+12;ctx.fillStyle='#fffddd';ctx.fillRect(X-ww/2,Y-13,ww,19);ctx.fillStyle='#26342b';ctx.fillText(t,X,Y+1)});
      const {hour}=getClock();
      if(hour>=21||hour<6)cats.filter(c=>(c.zone||'home')==='home'&&c.id!=='warrior').forEach(c=>{ctx.fillStyle='#fff';ctx.font='bold 16px -apple-system';ctx.textAlign='left';ctx.fillText('z z z',sx(c.x)+15,sy(c.y)-45)});
    }
  }

  return Object.freeze({draw});
}
