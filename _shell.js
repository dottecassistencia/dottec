/**
 * _shell.js — Topbar + Bolinhas fixas em todas as páginas
 * Inclua com: <script src="_shell.js"></script>
 */
(function(){
  'use strict';

  const SB_URL='https://clctxzynpfjilxmyblpg.supabase.co';
  const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3R4enlucGZqaWx4bXlibHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzEyNDMsImV4cCI6MjA5NTM0NzI0M30.YBGIwVFpE52KZKpOjMMMh1WCZbzDLM_adwGxxXhkIL0';

  let USR={nome:'Gaza',perfil:'ADMIN',id:null};
  try{const s=sessionStorage.getItem('dottec_sessao');if(s)USR=JSON.parse(s);}catch{}

  // Página ativa
  const _page=(()=>{
    const f=location.pathname.split('/').pop().replace('.html','');
    if(f.startsWith('os'))return'os';
    if(f.startsWith('venda')||f==='vendas')return'venda';
    if(f==='caixa')return'caixa';
    if(f.startsWith('financeiro')||f==='contas')return'financeiro';
    if(f.startsWith('orcamento'))return'orcamentos';
    if(f.startsWith('pessoa')||f==='cadastro'||f==='pessoas')return'cadastro';
    if(f.startsWith('produto'))return'produtos';
    if(f.startsWith('compra'))return'compras';
    if(f.startsWith('config')||f==='status-config'||f==='servicos-dispositivos'||f==='servicos'||f==='formas-pagamento')return'config';
    return'dashboard';
  })();

  window.MODS=[
    {id:'os',lbl:'OS',ico:'ti-tool',href:'os.html',bg:'linear-gradient(135deg,#FBE9E5,#FFD5CC)',c:'#C94835'},
    {id:'venda',lbl:'Venda',ico:'ti-shopping-cart',href:'venda.html',bg:'linear-gradient(135deg,#FCE7F3,#FBC8E4)',c:'#BE185D'},
    {id:'caixa',lbl:'Caixa',ico:'ti-wallet',href:'caixa.html',bg:'linear-gradient(135deg,#EAF3DE,#C8E89E)',c:'#3B6D11'},
    {id:'financeiro',lbl:'Financeiro',ico:'ti-currency-dollar',href:'financeiro.html',bg:'linear-gradient(135deg,#EAF3DE,#C8E89E)',c:'#3B6D11'},
    {id:'orcamentos',lbl:'Orçamentos',ico:'ti-calculator',href:'orcamentos.html',bg:'linear-gradient(135deg,#CFFAFE,#A5F0F9)',c:'#0E7490'},
    {id:'cadastro',lbl:'Cadastro',ico:'ti-users',href:'pessoas.html',bg:'linear-gradient(135deg,#E3F4F5,#B8EDF0)',c:'#1E9099'},
    {id:'produtos',lbl:'Produtos',ico:'ti-package',href:'produtos.html',bg:'linear-gradient(135deg,#FBE9E5,#FFD5CC)',c:'#C94835'},
    {id:'compras',lbl:'Compras',ico:'ti-truck-delivery',href:'compras.html',bg:'linear-gradient(135deg,#EEF0F5,#D4D9E8)',c:'#3A4A6B'},
    {id:'fiscal',lbl:'Fiscal',ico:'ti-file-invoice',href:'fiscal.html',bg:'linear-gradient(135deg,#EEEAF8,#D8D0F4)',c:'#5B3FA6'},
    {id:'config',lbl:'Config.',ico:'ti-settings',href:'configuracoes.html',bg:'linear-gradient(135deg,#F0EDE7,#DDD9D0)',c:'#5A5855'},
  ];
  window.ATIVOS=['os','venda','caixa','financeiro','orcamentos','cadastro','produtos','compras'];

  // CSS
  const style=document.createElement('style');
  style.textContent=`
:root{--cyan:#29B8C2;--cd:#1E9099;--cbg:#E3F4F5;--coral:#E8604A;--cbg2:#FBE9E5;--dark:#1C1C1A;--text:#2C2C2A;--sub:#8A887F;--border:#EAE7DF;--bg:#EDEAE3;--white:#fff;--amber:#9A6000;--abg:#FBEEDB;--green:#3B6D11;--gbg:#EAF3DE;--red:#DC2626;--rbg:#FEF2F2}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.overlay,.modal-overlay,[class*="overlay"]{z-index:9999!important}
input:not([type=date]):not([type=number]):not([type=email]):not([type=url]),
textarea,
select{text-transform:uppercase}
input::placeholder,textarea::placeholder{text-transform:none}
#_dottec_shell{position:fixed;top:0;left:0;right:0;z-index:900;background:var(--white)}
.sh-topbar{height:62px;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:14px;background:var(--white)}
.sh-logo{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0}
.sh-logo-circle{width:32px;height:32px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#29B8C2,#1E9099);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sh-logo-circle img{width:100%;height:100%;object-fit:cover}
.sh-logo-circle i{font-size:15px;color:#fff}
.sh-logo-nome{font-size:13px;font-weight:700;color:var(--dark);line-height:1.1}
.sh-logo-sub{font-size:9px;color:var(--sub)}
.sh-saud{display:flex;flex-direction:column;gap:1px}
.sh-saud-top{font-size:10px;color:var(--sub)}
.sh-saud-nome{font-size:14px;font-weight:700;color:var(--dark)}
.sh-right{display:flex;align-items:center;gap:10px;margin-left:auto}
.sh-hora{font-size:22px;font-weight:700;color:var(--dark);line-height:1}
.sh-data{font-size:10px;color:var(--sub);text-align:right}
.sh-modbar{border-bottom:1px solid var(--border);box-shadow:0 2px 8px rgba(0,0,0,.06);padding:6px 12px;display:flex;align-items:center;gap:0;background:var(--white)}
.sh-mods{flex:1;display:flex;align-items:stretch;overflow-x:auto}
.sh-mods::-webkit-scrollbar{display:none}
.sh-ball{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;text-decoration:none;padding:6px 4px;border-radius:14px;flex:1;min-width:0;transition:background .15s,transform .2s cubic-bezier(.34,1.5,.64,1)}
.sh-ball:hover{background:var(--bg);transform:translateY(-3px) scale(1.05)}
.sh-ball.active{background:var(--cbg)}
.sh-ball-icon{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;position:relative;transition:box-shadow .15s}
.sh-ball.active .sh-ball-icon{box-shadow:0 0 0 3px var(--cyan)}
.sh-ball-lbl{font-size:10px;font-weight:700;color:var(--sub);text-transform:uppercase;white-space:nowrap;letter-spacing:.04em}
.sh-ball.active .sh-ball-lbl{color:var(--cyan)}
.sh-ball-bdg{position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:var(--coral);color:#fff;font-size:8px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid var(--white)}
@media(max-width:600px){
  .sh-topbar{height:52px;padding:0 12px}
  .sh-hora{font-size:17px}
  .sh-ball{min-width:0;flex:1;padding:4px 2px}
  .sh-ball-icon{width:36px;height:36px;font-size:15px}
  .sh-ball-lbl{font-size:8px}
  .sh-modbar{padding:4px 8px}
  }
@media(min-width:601px) and (max-width:900px){
  .sh-ball{min-width:0;flex:1;padding:5px 4px}
  .sh-ball-icon{width:44px;height:44px;font-size:18px}
  .sh-ball-lbl{font-size:9px}
}
.sh-more-wrap{position:relative;flex-shrink:0}
.sh-more{width:32px;height:32px;border-radius:50%;background:var(--bg);border:1.5px dashed var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--sub);cursor:pointer}
.sh-more-drop{display:none;position:absolute;top:calc(100% + 6px);right:0;background:var(--white);border:1px solid var(--border);border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.12);padding:6px;z-index:9001;min-width:160px}
.sh-more-drop.open{display:block}
.sh-more-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;font-size:12.5px;font-weight:600;color:var(--text);text-decoration:none}
.sh-more-item:hover{background:var(--bg)}
.sh-more-item i{font-size:13px;width:16px;text-align:center}
@keyframes _sh_fadein{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
/* Previne flash de conteúdo não estilizado */
html{scroll-behavior:smooth}
`;
  document.head.insertBefore(style,document.head.firstChild);

  // HTML do shell
  const shell=document.createElement('div');
  shell.id='_dottec_shell';
  shell.innerHTML=`
<div class="sh-topbar">
  <a class="sh-logo" href="dashboard.html">
    <div class="sh-logo-circle">
      <img src="logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
      <i class="ti ti-device-laptop" style="display:none"></i>
    </div>
    <div>
      <div class="sh-logo-nome">Dottec</div>
      <div class="sh-logo-sub">Assistência</div>
    </div>
  </a>
  <div class="sh-saud">
    <div class="sh-saud-top" id="sh-saud-top">Bom dia,</div>
    <div class="sh-saud-nome" id="sh-saud-nome">${USR.nome}</div>
  </div>
  <div class="sh-right">
    <div style="text-align:right">
      <div class="sh-hora" id="sh-hora">--:--</div>
      <div class="sh-data" id="sh-data"></div>
    </div>
  </div>
</div>
<div class="sh-modbar">
  <div class="sh-mods" id="sh-mods"><i class="ti ti-loader-2" style="animation:spin .7s linear infinite;color:var(--sub)"></i></div>
  <div class="sh-more-wrap" id="sh-more-wrap" style="display:none">
    <div class="sh-more" onclick="toggleShMore(event)"><i class="ti ti-dots"></i></div>
    <div class="sh-more-drop" id="sh-more-drop"></div>
  </div>
</div>`;

  // Injeta no topo do body
  function init(){
    document.body.insertBefore(shell,document.body.firstChild);

    // Espaçador: empurra o conteúdo abaixo do shell fixo
    const spacer=document.createElement('div');
    spacer.id='_sh_spacer';
    document.body.insertBefore(spacer,shell.nextSibling);

    // Calcula e aplica altura do spacer
    function applySpacerHeight(){
      const h=shell.offsetHeight;
      if(h>0){
        spacer.style.cssText='height:'+h+'px;flex-shrink:0;display:block';
        // Se a página tem .filter-bar, fixa ela logo abaixo
        const fb=document.querySelector('.filter-bar');
        if(fb){
          fb.style.position='fixed';
          fb.style.top=h+'px';
          fb.style.left='0';
          fb.style.right='0';
          fb.style.zIndex='8999';
          // Empurra o conteúdo abaixo do filter-bar também
          const fbH=fb.offsetHeight;
          spacer.style.height=(h+fbH)+'px';
          const body=document.querySelector('.body');
          if(body) body.style.paddingTop=fbH+'px';
        }
      } else {
        setTimeout(applySpacerHeight,50);
      }
    }
    requestAnimationFrame(applySpacerHeight);
    window.addEventListener('load',()=>{applySpacerHeight();_showPage();});



    // Relógio e saudação
    function tick(){
      const n=new Date(),h=n.getHours();
      const top=document.getElementById('sh-saud-top');
      const hora=document.getElementById('sh-hora');
      const data=document.getElementById('sh-data');
      if(top)top.textContent=h<12?'Bom dia,':h<18?'Boa tarde,':'Boa noite,';
      if(hora)hora.textContent=n.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      if(data)data.textContent=n.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
    }
    tick();setInterval(tick,10000);

    // Módulos
    loadShMods().then(()=>_showPage()).catch(()=>_showPage());
    // Garante que a página aparece mesmo se loadShMods demorar
    setTimeout(_showPage, 300);
  }

  async function loadShMods(){
    let db=window._dottecDb;
    if(!db&&typeof supabase!=='undefined'){
      window._dottecDb=supabase.createClient(SB_URL,SB_KEY);
      db=window._dottecDb;
    }
    if(db&&USR.id){
      try{
        const{data}=await db.from('configuracoes_sistema').select('valor').eq('chave','mods_u_'+USR.id).maybeSingle();
        if(data?.valor){try{ATIVOS=JSON.parse(data.valor);}catch{}}
      }catch{}
    }
    const ativos=ATIVOS.slice(0,8).map(id=>MODS.find(m=>m.id===id)).filter(Boolean);
    const resto=MODS.filter(m=>!ATIVOS.slice(0,8).includes(m.id));
    const grid=document.getElementById('sh-mods');
    if(grid){
      const logoBall=`<a class="sh-ball" href="dashboard.html">
        <div class="sh-ball-icon" style="background:var(--bg);border:1.5px solid var(--border);overflow:hidden;border-radius:50%">
          <img src="logo.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
          <i class="ti ti-layout-dashboard" style="display:none;color:var(--cyan);font-size:inherit"></i>
        </div>
        <span class="sh-ball-lbl" style="color:${_page==='dashboard'?'var(--cyan)':''}">Início</span>
      </a>`;
      grid.innerHTML=logoBall+ativos.map(m=>`
        <a class="sh-ball${m.id===_page?' active':''}" href="${m.href}">
          <div class="sh-ball-icon" style="background:${m.bg}">
            <i class="ti ${m.ico}" style="color:${m.c}"></i>
            ${m.id==='os'?'<span class="sh-ball-bdg" id="sh-os-bdg" style="display:none"></span>':''}
          </div>
          <span class="sh-ball-lbl">${m.lbl}</span>
        </a>`).join('');
    }
    const mw=document.getElementById('sh-more-wrap');
    const md=document.getElementById('sh-more-drop');
    if(resto.length&&mw&&md){
      mw.style.display='block';
      md.innerHTML=resto.map(m=>`<a class="sh-more-item" href="${m.href}"><i class="ti ${m.ico}" style="color:${m.c}"></i>${m.lbl}</a>`).join('');
    } else if(mw) mw.style.display='none';
  }

  window.toggleShMore=function(e){
    e.stopPropagation();
    document.getElementById('sh-more-drop').classList.toggle('open');
  };
  document.addEventListener('click',()=>document.getElementById('sh-more-drop')?.classList.remove('open'));

  // Esconde o conteúdo imediatamente para evitar flash
  const _hideStyle = document.createElement('style');
  _hideStyle.textContent = 'body{opacity:0}';
  document.head.appendChild(_hideStyle);

  function _showPage(){
    _hideStyle.textContent = 'body{opacity:1;transition:opacity .15s ease}';
    setTimeout(()=>_hideStyle.remove(), 200);
  }

  if(document.body)init();
  else document.addEventListener('DOMContentLoaded',init);
})();
