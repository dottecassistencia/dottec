/**
 * _shell.js — Header + Bolinhas idênticos ao dashboard em todas as páginas
 * Uso: <script src="_shell.js"></script> no <head> de qualquer página
 * Detecta a página atual pelo pathname e marca a bolinha ativa
 */
(function(){
  'use strict';

  const SB_URL='https://clctxzynpfjilxmyblpg.supabase.co';
  const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3R4enlucGZqaWx4bXlibHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzEyNDMsImV4cCI6MjA5NTM0NzI0M30.YBGIwVFpE52KZKpOjMMMh1WCZbzDLM_adwGxxXhkIL0';

  // Detecta página atual para marcar bolinha ativa
  const _page = (() => {
    const f = location.pathname.split('/').pop().replace('.html','');
    if(f.startsWith('os')) return 'os';
    if(f.startsWith('venda')||f==='vendas') return 'venda';
    if(f==='caixa') return 'caixa';
    if(f.startsWith('financeiro')||f==='contas') return 'financeiro';
    if(f.startsWith('orcamento')) return 'orcamentos';
    if(f.startsWith('pessoa')||f==='cadastro'||f==='pessoas') return 'cadastro';
    if(f.startsWith('produto')) return 'produtos';
    if(f.startsWith('compra')) return 'compras';
    if(f.startsWith('config')||f==='status-config'||f==='servicos-dispositivos'||f==='servicos'||f==='formas-pagamento') return 'config';
    return 'dashboard';
  })();

  // Usuário atual
  let USR = {nome:'Gaza', perfil:'ADMIN', id:null};
  try{ const s=sessionStorage.getItem('dottec_sessao'); if(s) USR=JSON.parse(s); }catch{}

  // Injeta CSS do header e bolinhas
  const style = document.createElement('style');
  style.textContent = `
:root{--cyan:#29B8C2;--cd:#1E9099;--cbg:#E3F4F5;--coral:#E8604A;--cbg2:#FBE9E5;--dark:#1C1C1A;--text:#2C2C2A;--sub:#8A887F;--border:#EAE7DF;--bg:#EDEAE3;--white:#fff;--amber:#9A6000;--abg:#FBEEDB;--green:#3B6D11;--gbg:#EAF3DE;--red:#DC2626;--rbg:#FEF2F2}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
/* Shell fixo no topo */
#_dottec_shell{position:fixed;top:0;left:0;right:0;z-index:900}
#_dottec_shell .header{box-shadow:0 2px 8px rgba(0,0,0,.07)}
.header{
  height:62px;background:var(--white);border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 20px;gap:14px;
  flex-shrink:0;box-shadow:0 1px 6px rgba(0,0,0,.05);
}
.h-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.h-logo-circle{
  width:40px;height:40px;border-radius:50%;overflow:hidden;
  background:linear-gradient(135deg,#29B8C2,#1E9099);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 10px rgba(41,184,194,.3);flex-shrink:0;
}
.h-logo-circle img{width:100%;height:100%;object-fit:cover;display:block}
.h-logo-circle i{font-size:20px;color:#fff}
.h-logo-text{}
.h-logo-nome{font-family:'Lora',serif;font-size:15px;font-weight:700;color:var(--dark);line-height:1.1}
.h-logo-sub{font-size:10px;color:var(--sub)}
.h-saud{flex:1;padding-left:4px}
.h-saud-top{font-size:12px;color:var(--sub)}
.h-saud-nome{font-family:'Lora',serif;font-size:16px;font-weight:700;color:var(--dark);line-height:1.1}
.h-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.h-dt{text-align:right}
.h-hora{font-family:'Lora',serif;font-size:18px;font-weight:700;color:var(--dark);line-height:1}
.h-data{font-size:11px;color:var(--sub);margin-top:1px}
.h-perfil{
  width:36px;height:36px;border-radius:50%;
  background:var(--bg);border:1.5px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;color:var(--sub);cursor:pointer;
  transition:all .15s;text-decoration:none;flex-shrink:0;
}
.h-perfil:hover{background:var(--dark);color:#fff;border-color:var(--dark)}
.mod-bar{
  background:var(--white);border:1px solid var(--border);border-radius:14px;
  padding:12px 16px;margin-bottom:12px;
  display:flex;align-items:center;gap:10px;
}
.mods-grid{
  flex:1;
  display:grid;
  /* cada bolinha ocupa no mínimo 64px, no máximo 1fr — preenche o card todo */
  grid-template-columns:repeat(auto-fit,minmax(64px,1fr));
  gap:6px 4px;
  justify-items:center;
  align-items:start;
}
.mod-ball{
  display:flex;flex-direction:column;align-items:center;gap:4px;
  text-decoration:none;color:inherit;cursor:pointer;
  width:100%;max-width:76px;
}
.mod-ball-icon{
  width:50px;height:50px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:22px;
  position:relative;
  transition:transform .22s cubic-bezier(.34,1.5,.64,1),box-shadow .22s;
}
.mod-ball:hover .mod-ball-icon{transform:translateY(-4px) scale(1.08);box-shadow:0 8px 20px rgba(0,0,0,.13)}
.mod-ball-lbl{font-size:9.5px;font-weight:700;color:var(--sub);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%}
.mod-ball-bdg{position:absolute;top:-2px;right:-2px;width:15px;height:15px;border-radius:50%;background:var(--red);border:2px solid var(--white);font-size:8px;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center}
.mod-more-wrap{position:relative;flex-shrink:0}
.mod-more-btn{
  display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;
  width:64px;
}
.mod-more{
  width:50px;height:50px;border-radius:50%;
  background:var(--bg);border:1.5px dashed var(--border);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;color:var(--sub);transition:all .15s;
}
.mod-more:hover{background:#E2DFD6;border-color:var(--sub)}
.mod-more-lbl{font-size:9.5px;font-weight:700;color:var(--sub);text-align:center}
.mod-more-drop{display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--white);border:1px solid var(--border);border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.12);padding:6px;z-index:300;min-width:180px}
.mod-more-drop.open{display:block}
.mod-more-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;font-size:13px;font-weight:600;color:var(--text);text-decoration:none;transition:background .12s}
.mod-more-item:hover{background:var(--bg)}
.mod-more-item i{font-size:16px;width:20px;text-align:center}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.spin{animation:spin .7s linear infinite;display:inline-block}

/* Transição suave de página */
body > *:not(#_dottec_shell):not(#_shell_spacer){animation:_shell_fadein .18s ease}
@keyframes _shell_fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.insertBefore(style, document.head.firstChild);

  // Injeta HTML do header e bolinhas antes de qualquer conteúdo do body
  const shell = document.createElement('div');
  shell.id = '_dottec_shell';
  shell.innerHTML = `
<header class="header">
  <a class="h-logo" href="dashboard.html">
    <div class="h-logo-circle">
      <img src="logo.png" alt="Dottec" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
      <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center"><i class="ti ti-device-laptop"></i></span>
    </div>
    <div class="h-logo-text">
      <div class="h-logo-nome">Dottec</div>
      <div class="h-logo-sub">Assistência Inteligente</div>
    </div>
  </a>
  <div class="h-saud">
    <div class="h-saud-top" id="h-saud-top">—</div>
    <div class="h-saud-nome" id="h-saud-nome">—</div>
  </div>
  <div class="h-right">
    <div class="h-dt">
      <div class="h-hora" id="h-hora">—</div>
      <div class="h-data" id="h-data">—</div>
    </div>
    <a class="h-perfil" href="#" title="Meu perfil"><i class="ti ti-id-badge-2"></i></a>
  </div>
</header>

<!-- BODY SCROLLÁVEL -->
<div class="body">
<!-- BOLINHAS -->
<div class="mod-bar">
  <div class="mods-grid" id="mods-grid">
    <div style="color:var(--sub)"><i class="ti ti-loader-2 spin"></i></div>
  </div>
  <div class="mod-more-wrap" id="more-wrap" style="display:none">
    <div class="mod-more-btn" onclick="toggleMore(event)">
      <div class="mod-more"><i class="ti ti-dots"></i></div>
      <span class="mod-more-lbl">mais</span>
    </div>
    <div class="mod-more-drop" id="more-drop"></div>
  </div>
</div>
  `;

  function injectShell() {
    document.body.insertBefore(shell, document.body.firstChild);
    // body flex column (só se não tiver ainda)
    if(getComputedStyle(document.body).display !== 'flex'){
      document.body.style.display = 'flex';
      document.body.style.flexDirection = 'column';
    }
    document.body.style.overflowY = 'hidden';
    // padding-top para compensar header fixo (header 62px + mod-bar ~78px = 140px)
    // Calcula após render
    // move .filter-bar para dentro do shell (fica fixo junto ao cabeçalho)
    const moveFilterBar = () => {
      const fb = document.querySelector('.filter-bar');
      if(fb && !shell.contains(fb)){
        fb.style.margin = '0';
        fb.style.borderTop = 'none';
        shell.appendChild(fb);
      }
    };
    // spacer = altura do shell (incluindo filter-bar se movida)
    const makespacer = () => {
      moveFilterBar();
      let existing = document.getElementById('_shell_spacer');
      if(!existing){
        existing = document.createElement('div');
        existing.id = '_shell_spacer';
        existing.style.flexShrink = '0';
        document.body.insertBefore(existing, shell.nextSibling);
      }
      const h = shell.offsetHeight;
      existing.style.height = (h || 118) + 'px';
    };
    requestAnimationFrame(()=>{ makespacer(); requestAnimationFrame(makespacer); });
    initShell();
  }

  if(document.body) { injectShell(); }
  else { document.addEventListener('DOMContentLoaded', injectShell); }

  function initShell() {
    // Relógio
    function tick() {
      const n=new Date(), h=n.getHours();
      const t=document.getElementById('h-saud-top');
      const nm=document.getElementById('h-saud-nome');
      const hr=document.getElementById('h-hora');
      const dt=document.getElementById('h-data');
      if(t) t.textContent = h<12?'Bom dia,':h<18?'Boa tarde,':'Boa noite,';
      if(nm) nm.textContent = USR.nome;
      if(hr) hr.textContent = n.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      if(dt) dt.textContent = n.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
    }
    tick();
    setInterval(tick, 10000);

    // Módulos
    const MODS=[
  {id:'os',         lbl:'OS',         ico:'ti-tool',            href:'os.html',           bg:'linear-gradient(135deg,#FBE9E5,#FFD5CC)',c:'#C94835'},
  {id:'venda',      lbl:'Venda',      ico:'ti-shopping-cart',   href:'venda.html',         bg:'linear-gradient(135deg,#FCE7F3,#FBC8E4)',c:'#BE185D'},
  {id:'caixa',      lbl:'Caixa',      ico:'ti-wallet',          href:'caixa.html',         bg:'linear-gradient(135deg,#EAF3DE,#C8E89E)',c:'#3B6D11'},
  {id:'financeiro', lbl:'Financeiro', ico:'ti-currency-dollar', href:'financeiro.html',    bg:'linear-gradient(135deg,#EAF3DE,#C8E89E)',c:'#3B6D11'},
  {id:'orcamentos', lbl:'Orçamentos', ico:'ti-calculator',      href:'orcamentos.html',    bg:'linear-gradient(135deg,#CFFAFE,#A5F0F9)',c:'#0E7490'},
  {id:'cadastro',   lbl:'Cadastro',   ico:'ti-users',           href:'pessoas.html',       bg:'linear-gradient(135deg,#E3F4F5,#B8EDF0)',c:'#1E9099'},
  {id:'produtos',   lbl:'Produtos',   ico:'ti-package',         href:'produtos.html',      bg:'linear-gradient(135deg,#FBE9E5,#FFD5CC)',c:'#C94835'},
  {id:'compras',    lbl:'Compras',    ico:'ti-truck-delivery',  href:'compras.html',       bg:'linear-gradient(135deg,#EEF0F5,#D4D9E8)',c:'#3A4A6B'},
  {id:'fiscal',     lbl:'Fiscal',     ico:'ti-file-invoice',    href:'fiscal.html',        bg:'linear-gradient(135deg,#EEEAF8,#D8D0F4)',c:'#5B3FA6'},
  {id:'config',     lbl:'Config.',    ico:'ti-settings',        href:'configuracoes.html', bg:'linear-gradient(135deg,#F0EDE7,#DDD9D0)',c:'#5A5855'},
];
    let ATIVOS=['os','venda','caixa','financeiro','orcamentos','cadastro','produtos','compras'];

    async function loadMods() {
      let db = window._dottecDb;
      if(!db && typeof supabase !== 'undefined') {
        window._dottecDb = supabase.createClient(SB_URL, SB_KEY);
        db = window._dottecDb;
      }
      if(db && USR.id) {
        try {
          const {data} = await db.from('configuracoes_sistema').select('valor').eq('chave','mods_u_'+USR.id).maybeSingle();
          if(data?.valor) { try{ ATIVOS=JSON.parse(data.valor); }catch{} }
        } catch{}
      }
      const ativos = ATIVOS.slice(0,8).map(id=>MODS.find(m=>m.id===id)).filter(Boolean);
      const resto = MODS.filter(m=>!ATIVOS.slice(0,8).includes(m.id));
      const grid = document.getElementById('mods-grid');
      if(grid) {
        grid.innerHTML = ativos.map(m=>`
          <a class="mod-ball${m.id===_page?' active':''}" href="${m.href}" title="${m.lbl}">
            <div class="mod-ball-icon" style="background:${m.bg}">
              <i class="ti ${m.ico}" style="color:${m.c}"></i>
              ${m.id==='os'?'<span class="mod-ball-bdg" id="os-bdg" style="display:none">!</span>':''}
            </div>
            <span class="mod-ball-lbl">${m.lbl}</span>
          </a>`).join('');
      }
      const mw = document.getElementById('more-wrap');
      const md = document.getElementById('more-drop');
      if(resto.length && mw && md) {
        mw.style.display = 'block';
        md.innerHTML = resto.map(m=>`<a class="mod-more-item" href="${m.href}"><i class="ti ${m.ico}" style="color:${m.c}"></i>${m.lbl}</a>`).join('');
      } else if(mw) { mw.style.display = 'none'; }
    }
    loadMods();

    // Close dropdown on click outside
    document.addEventListener('click', () => document.getElementById('more-drop')?.classList.remove('open'));
  }

  // toggleMore exposta globalmente
  window.toggleMore = function(e) {
    e.stopPropagation();
    document.getElementById('more-drop')?.classList.toggle('open');
  };

})();
