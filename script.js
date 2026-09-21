const URL_RESULTADOS = "https://script.google.com/macros/s/AKfycbyqgOPIXzoP7nhlD8TcAMjW_o3hdx0EL-nz6-Blq24PKFqRusLU8-YfTOBUpm7p65PA/exec";

const guides=[
{id:"faisca",name:"FAÍSCA",emoji:"⚡",desc:"ANIMADO"},{id:"nexo",name:"NEXO",emoji:"🧠",desc:"TRANQUILO"},
{id:"brasa",name:"BRASA",emoji:"🔥",desc:"DETERMINADO"},{id:"lumi",name:"LUMI",emoji:"🌈",desc:"ALEGRE"},
{id:"atlas",name:"ATLAS",emoji:"🛡️",desc:"CORAJOSO"}];

const missions=[
{title:"A PISTA CIRCULAR",skill:"PERÍMETRO DA CIRCUNFERÊNCIA",text:"A PISTA ESPORTIVA TEM RAIO DE 5 M. PRECISAMOS DE UMA FAIXA PARA DAR UMA VOLTA COMPLETA. USE π = 3,1. QUANTOS METROS DE FAIXA SERÃO NECESSÁRIOS?",answer:31,opts:[15.5,31,62,25],unit:"M",formula:"C = 2 × π × RAIO",img:"m1.png",hint1:"USE A FÓRMULA C = 2 × π × RAIO.",hint2:"SUBSTITUA: C = 2 × 3,1 × 5."},
{title:"O JARDIM QUADRADO",skill:"PERÍMETRO DO QUADRADO",text:"UM JARDIM QUADRADO TEM 12 M DE LADO. UMA CERCA SERÁ COLOCADA EM TODO O CONTORNO. QUANTOS METROS DE CERCA SERÃO NECESSÁRIOS?",answer:48,opts:[24,36,48,144],unit:"M",formula:"P = 4 × LADO",img:"m2.png",hint1:"O QUADRADO TEM 4 LADOS IGUAIS.",hint2:"USE P = 4 × 12."},
{title:"A QUADRA",skill:"PERÍMETRO DO RETÂNGULO",text:"UMA QUADRA RETANGULAR TEM 20 M DE COMPRIMENTO E 10 M DE LARGURA. QUANTOS METROS SÃO NECESSÁRIOS PARA CONTORNAR TODA A QUADRA?",answer:60,opts:[30,40,60,200],unit:"M",formula:"P = 2 × (COMPRIMENTO + LARGURA)",img:"m3.png",hint1:"CONTORNAR SIGNIFICA CALCULAR O PERÍMETRO.",hint2:"USE P = 2 × (20 + 10)."},
{title:"O RESERVATÓRIO",skill:"VOLUME DO CUBO",text:"UM RESERVATÓRIO EM FORMA DE CUBO TEM ARESTA DE 4 M. QUAL É O VOLUME?",answer:64,opts:[16,48,64,12],unit:"M³",formula:"V = ARESTA × ARESTA × ARESTA",special:"tank",hint1:"NO CUBO, AS 3 DIMENSÕES TÊM A MESMA MEDIDA.",hint2:"CALCULE 4 × 4 × 4."},
{title:"A CAIXA DE SUPRIMENTOS",skill:"VOLUME DO PARALELEPÍPEDO",text:"UMA CAIXA MEDE 5 M DE COMPRIMENTO, 3 M DE LARGURA E 2 M DE ALTURA. QUAL É O VOLUME?",answer:30,opts:[10,15,30,60],unit:"M³",formula:"V = COMPRIMENTO × LARGURA × ALTURA",img:"m5.png",hint1:"USE AS TRÊS DIMENSÕES DA CAIXA.",hint2:"CALCULE 5 × 3 × 2."},
{title:"A FONTE",skill:"PERÍMETRO DA CIRCUNFERÊNCIA",text:"A FONTE PRECISA RECEBER UMA FAIXA DE LUZ EM TODA A SUA BORDA. O RAIO É 7 M E π = 3,1. QUAL DEVE SER O COMPRIMENTO DA FAIXA?",answer:43.4,opts:[21.7,43.4,49,136.4],unit:"M",formula:"C = 2 × π × RAIO",img:"m6.png",hint1:"A FAIXA DÁ UMA VOLTA COMPLETA NA FONTE.",hint2:"USE C = 2 × 3,1 × 7."},
{title:"A ÁREA DE SEGURANÇA",skill:"PERÍMETRO DO QUADRADO",text:"UMA ÁREA QUADRADA TEM 15 M DE LADO. UMA BARREIRA SERÁ COLOCADA AO REDOR DE TODO O LOCAL. QUAL É O COMPRIMENTO TOTAL?",answer:60,opts:[45,50,60,30],unit:"M",formula:"P = 4 × LADO",img:"m7.png",hint1:"AO REDOR SIGNIFICA CALCULAR O CONTORNO.",hint2:"USE P = 4 × 15."},
{title:"O CAMPO",skill:"PERÍMETRO DO RETÂNGULO",text:"UM CAMPO RETANGULAR TEM 30 M DE COMPRIMENTO E 18 M DE LARGURA. QUANTOS METROS DE CORDA SÃO NECESSÁRIOS PARA CONTORNÁ-LO?",answer:96,opts:[66,78,96,120],unit:"M",formula:"P = 2 × (COMPRIMENTO + LARGURA)",img:"m8.png",hint1:"NÃO QUEREMOS A ÁREA; QUEREMOS O CONTORNO.",hint2:"USE P = 2 × (30 + 18)."},
{title:"O COFRE",skill:"VOLUME DO CUBO",text:"UM COFRE CÚBICO TEM ARESTA INTERNA DE 3 M. QUAL É O VOLUME INTERNO?",answer:27,opts:[9,18,27,36],unit:"M³",formula:"V = ARESTA × ARESTA × ARESTA",img:"m9.png",hint1:"VOLUME DO CUBO USA AS TRÊS DIMENSÕES.",hint2:"CALCULE 3 × 3 × 3."},
{title:"O DEPÓSITO CENTRAL",skill:"VOLUME DO PARALELEPÍPEDO",text:"O DEPÓSITO MEDE 8 M DE COMPRIMENTO, 5 M DE LARGURA E 3 M DE ALTURA. QUAL É O VOLUME?",answer:120,opts:[90,100,120,150],unit:"M³",formula:"V = COMPRIMENTO × LARGURA × ALTURA",img:"m10.png",hint1:"USE COMPRIMENTO, LARGURA E ALTURA.",hint2:"CALCULE 8 × 5 × 3."}
];

let state=JSON.parse(localStorage.getItem("recMatStateV4")||"null")||{screen:"start",name:"",average:null,guide:null,index:0,lives:10,xp:0,attempts:0,history:[],selected:null,order:null,finaleSeen:false};
const app=document.querySelector("#app"),save=()=>localStorage.setItem("recMatStateV4",JSON.stringify(state));
const G=()=>guides.find(g=>g.id===state.guide)||guides[0],fmt=n=>Number(n).toLocaleString("pt-BR",{maximumFractionDigits:2});
const maxRecovery=a=>a<=5?3:a<=6?2:1;
function guideBox(t){let g=G();return `<div class="guidebox"><div class="avatar">${g.emoji}</div><div><strong>${g.name}</strong><p>${t}</p></div></div>`}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function speak(t){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="pt-BR";u.rate=.96;speechSynthesis.speak(u)}
function victorySound(){try{let A=window.AudioContext||window.webkitAudioContext,c=new A(),now=c.currentTime;[523,659,784,1047].forEach((f,i)=>{let o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.0001,now+i*.14);g.gain.exponentialRampToValueAtTime(.16,now+i*.14+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.14+.35);o.start(now+i*.14);o.stop(now+i*.14+.4)})}catch(e){}}
function render(){if(state.screen==="start")start();else if(state.screen==="guide")chooseGuide();else if(state.screen==="intro")intro();else if(state.screen==="finale")finale();else if(state.screen==="game")game();else final();save()}
function start(){app.innerHTML=`<section class="card start-card center"><img src="imagens/logo-sesi.png" class="logo-sesi"><div class="game-icons">🎮 📐</div><h1>OPERAÇÃO RECONSTRUÇÃO</h1><div class="title-badges"><span>RECUPERAÇÃO DE MATEMÁTICA</span><b>7º ANO</b></div>${guideBox("OLÁ! EU VOU ACOMPANHAR VOCÊ NESTA MISSÃO. PRIMEIRO, DIGITE SEU NOME E SUA MÉDIA ATUAL DE MATEMÁTICA.")}<div class="field"><label>NOME</label><input id="name" value="${state.name||""}" placeholder="DIGITE SEU NOME"></div><div class="field"><label>MÉDIA ATUAL (0 A 10)</label><input id="avg" value="${state.average??""}" placeholder="EX.: 5,4"></div><button class="btn" id="next">CONTINUAR ›</button><p class="note">💾 O PROGRESSO É SALVO NESTE NAVEGADOR.</p></section>`;document.querySelector("#next").onclick=()=>{let n=document.querySelector("#name").value.trim(),a=parseFloat(document.querySelector("#avg").value.replace(",", "."));if(!n||isNaN(a)||a<0||a>10)return alert("PREENCHA O NOME E UMA MÉDIA ENTRE 0 E 10.");state.name=n.toUpperCase();state.average=a;state.screen="guide";render()}}
function chooseGuide(){app.innerHTML=`<section class="card center"><h2>ESCOLHA SEU GUIA</h2><p>ELE VAI ACOMPANHAR VOCÊ DURANTE AS 10 MISSÕES.</p><div class="guides">${guides.map(g=>`<button class="guide ${state.guide===g.id?"selected":""}" data-id="${g.id}"><div class="avatar">${g.emoji}</div><b>${g.name}</b><small>${g.desc}</small></button>`).join("")}</div><button class="btn" id="go" ${state.guide?"":"disabled"}>ESCOLHER ESTE GUIA</button></section>`;document.querySelectorAll(".guide").forEach(b=>b.onclick=()=>{state.guide=b.dataset.id;render()});document.querySelector("#go").onclick=()=>{state.screen="intro";render()}}
function intro(){app.innerHTML=`<section class="card center">${guideBox(`TUDO PRONTO, ${state.name}! VOCÊ COMEÇA COM 10 VIDAS. SE ERRAR, EU DOU UMA PISTA. QUANTO MENOS AJUDA USAR, MAIS XP VOCÊ GANHA!`)}<div class="stats"><div class="stat"><b>❤️ 10</b>VIDAS</div><div class="stat"><b>⭐ 300</b>XP POSSÍVEIS</div><div class="stat"><b>🎯 10</b>MISSÕES</div></div><button class="btn" id="begin">COMEÇAR MISSÃO 🚀</button></section>`;document.querySelector("#begin").onclick=()=>{state.screen="game";render()}}
function visual(m){if(m.special==="tank")return `<div class="tankscene"><div class="hose">〰️💧</div><div class="tank"><div class="water" id="water"></div><span>RESERVATÓRIO</span></div></div>`;return m.img?`<img class="mission-img" src="imagens/${m.img}" alt="ILUSTRAÇÃO DA MISSÃO">`:""}
function game(feedback="",kind=""){let m=missions[state.index];if(!state.order)state.order=shuffle(m.opts);app.innerHTML=`<div class="hud"><span class="pill">❤️ ${state.lives}/10</span><span class="pill">⭐ ${state.xp}/300 XP</span><span class="pill">MISSÃO ${state.index+1}/10</span></div><div class="progress"><span style="width:${state.index*10}%"></span></div><section class="card"><div class="mission">MISSÃO ${String(state.index+1).padStart(2,"0")} — ${m.title}</div>${guideBox(state.attempts===0?"LEIA COM ATENÇÃO. VOCÊ CONSEGUE!":state.attempts===1?m.hint1:m.hint2)}<div class="mission-grid"><div>${visual(m)}<div class="formula">${m.formula}</div></div><div><p class="problem">${m.text}</p><div class="choices">${state.order.map(v=>`<button class="choice ${state.selected===v?"chosen":""}" data-v="${v}">${fmt(v)} ${m.unit}</button>`).join("")}</div><button class="btn" id="answer" ${state.selected===null?"disabled":""}>CONFIRMAR RESPOSTA ›</button><button class="sound" id="hear">🔊 OUVIR</button></div></div>${feedback?`<div class="feedback ${kind}">${feedback}</div>`:""}</section>`;document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{state.selected=Number(b.dataset.v);render()});document.querySelector("#answer").onclick=check;document.querySelector("#hear").onclick=()=>speak(m.text)}
function nextMission(msg,kind){save();game(msg,kind);setTimeout(()=>{state.screen=(state.index===8&&!state.finaleSeen)?"finale":"game";state.selected=null;state.order=null;render()},1500)}
function check(){let m=missions[state.index],val=state.selected;if(val===m.answer){let earned=state.attempts===0?30:state.attempts===1?24:18;state.xp+=earned;state.history.push({mission:state.index+1,skill:m.skill,correct:true,attempts:state.attempts+1,xp:earned});if(m.special==="tank"){let w=document.querySelector("#water");if(w)w.classList.add("fill")}speak(`Isso aí! Você conseguiu! Agora você tem ${state.xp} XP. Arrasou!`);state.index++;state.attempts=0;if(state.index>=10){setTimeout(()=>{state.screen="final";render()},900);return}nextMission(`ISSO! VOCÊ CONSEGUIU! ⭐ +${earned} XP. ARRASOU!`,"good")}else{state.attempts++;if(state.lives>0)state.lives--;document.querySelector(".chosen")?.classList.add("wrong");state.selected=null;if(state.attempts>=3){state.history.push({mission:state.index+1,skill:m.skill,correct:false,attempts:3,xp:0});state.index++;state.attempts=0;if(state.index>=10){state.screen="final";render();return}nextMission(`A RESPOSTA ERA ${fmt(m.answer)} ${m.unit}. VAMOS CONTINUAR!`,"bad")}else{save();setTimeout(()=>game("AINDA NÃO! VOCÊ PERDEU UMA VIDA, MAS TEM OUTRA CHANCE. VEJA A PISTA!","bad"),450)}}}
function finale(){state.finaleSeen=true;app.innerHTML=`<section class="card finale center"><img src="imagens/finale.png" alt="GRANDE FINAL"><h1>🎆 GRANDE FINAL! 🎆</h1>${guideBox("VOCÊ CHEGOU NAS DUAS ÚLTIMAS MISSÕES! AGORA O DESAFIO FICA MAIS DIFÍCIL. MANTENHA O FOCO E USE TUDO O QUE APRENDEU!")}<button class="btn" id="cont">VAMOS LÁ! 🏆</button><button class="sound" id="fsound">🔊 SOM DE GRANDE FINAL</button></section>`;victorySound();document.querySelector("#fsound").onclick=victorySound;document.querySelector("#cont").onclick=()=>{state.screen="game";state.order=null;render()}}
async function enviarResultadoFinal(dados){
  if(localStorage.getItem("resultadoRecMatEnviado")==="sim") return;
  try{
    await fetch(URL_RESULTADOS,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(dados)
    });
    localStorage.setItem("resultadoRecMatEnviado","sim");
  }catch(erro){
    console.error("Erro ao enviar resultado:",erro);
  }
}

function final(){
  let max=maxRecovery(state.average),
      rec=Math.round((state.xp/300)*max*100)/100,
      fa=Math.min(10,Math.round((state.average+rec)*100)/100),
      per=state.history.filter(h=>h.skill.startsWith("PERÍMETRO")),
      vol=state.history.filter(h=>h.skill.startsWith("VOLUME")),
      pct=a=>a.length?Math.round(a.filter(x=>x.correct).length/a.length*100):0,
      pp=pct(per), pv=pct(vol);

  enviarResultadoFinal({
    nome:state.name,
    mediaAnterior:state.average,
    xp:state.xp,
    vidas:state.lives,
    pontosRecuperados:rec,
    mediaFinal:fa,
    perimetro:pp+"%",
    volume:pv+"%"
  });

  app.innerHTML=`<section class="card center final-card"><div class="trophy">🏆</div><h1>MISSÃO CONCLUÍDA!</h1>${guideBox(`PARABÉNS, ${state.name}! VOCÊ TERMINOU AS 10 MISSÕES. VEJA O QUE VOCÊ CONQUISTOU!`)}<button class="sound" id="again">🔊 OUVIR VITÓRIA NOVAMENTE</button><div class="stats"><div class="stat"><b>⭐ ${state.xp}/300</b>XP</div><div class="stat"><b>❤️ ${state.lives}/10</b>VIDAS</div><div class="stat"><b>+${fmt(rec)}</b>PONTOS</div></div><p>MÉDIA ANTERIOR: <b>${fmt(state.average)}</b></p><div class="final">${fmt(fa)}</div><p><b>NOVA MÉDIA</b></p><div class="stats"><div class="stat"><b>${pp}%</b>PERÍMETRO</div><div class="stat"><b>${pv}%</b>VOLUME</div><div class="stat"><b>${fmt(max)}</b>MÁXIMO DA RECUPERAÇÃO</div></div><p class="note">📤 RESULTADO ENVIADO PARA A PROFESSORA.</p><button class="btn secondary" id="restart">RECOMEÇAR DO ZERO</button></section>`;
  setTimeout(()=>{victorySound();speak(`Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`)},250);
  document.querySelector("#again").onclick=()=>{victorySound();speak(`Missão concluída! Parabéns, ${state.name}! Você completou as dez missões!`)};
  document.querySelector("#restart").onclick=()=>{if(confirm("APAGAR O PROGRESSO E RECOMEÇAR?")){localStorage.removeItem("recMatStateV4");localStorage.removeItem("resultadoRecMatEnviado");location.reload()}};
}
render();