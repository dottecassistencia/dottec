/**
 * _shell.js — Header + Bolinhas fixos idênticos ao dashboard
 * Inclua em qualquer página antes de </head>:
 *   <script src="_shell.js"></script>
 * O body da página recebe padding-top:auto para não sobrepor o shell.
 */
(function(){
  const SB_URL='https://clctxzynpfjilxmyblpg.supabase.co';
  const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3R4enlucGZqaWx4bXlibHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzEyNDMsImV4cCI6MjA5NTM0NzI0M30.YBGIwVFpE52KZKpOjMMMh1WCZbzDLM_adwGxxXhkIL0';

  function getDb(){
    if(!window._dottecDb && typeof supabase !== 'undefined')
      window._dottecDb = supabase.createClient(SB_URL, SB_KEY);
    return window._dottecDb || null;
  }

  let USR = {nome:'Gaza', perfil:'ADMIN', id:null};
  try{ const s=sessionStorage.getItem('dottec_sessao'); if(s) USR=JSON.parse(s); }catch{}

  // Módulos disponíveis
  const MODS = [
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

  // Detecta página atual
  const PAGE_ID = (typeof window._shellPageId !== 'undefined') ? window._shellPageId :
    (() => {
      const f = location.pathname.split('/').pop().replace('.html','');
      if(f.startsWith('os')) return 'os';
      if(f.startsWith('venda')||f==='vendas') return 'venda';
      if(f==='caixa') return 'caixa';
      if(f==='financeiro'||f==='contas') return 'financeiro';
      if(f.startsWith('orcamento')) return 'orcamentos';
      if(f.startsWith('pessoa')||f==='cadastro') return 'cadastro';
      if(f.startsWith('produto')) return 'produtos';
      if(f.startsWith('compra')) return 'compras';
      if(f.startsWith('nf')||f==='fiscal') return 'fiscal';
      if(f.startsWith('config')||f==='status-config'||f==='formas-pagamento'||f==='servicos'||f==='certificado') return 'config';
      return 'dashboard';
    })();

  // CSS — idêntico ao dashboard
  const CSS = `
:root{--cyan:#29B8C2;--cd:#1E9099;--cbg:#E3F4F5;--dark:#1C1C1A;--sub:#8A887F;--border:#EAE7DF;--bg:#EDEAE3;--white:#fff}
#_shell{position:fixed;top:0;left:0;right:0;z-index:900;font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}

/* HEADER */
#_shell .header{height:62px;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:14px;flex-shrink:0;box-shadow:0 1px 6px rgba(0,0,0,.05)}
#_shell .h-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
#_shell .h-logo-circle{width:40px;height:40px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#29B8C2,#1E9099);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(41,184,194,.3);flex-shrink:0}
#_shell .h-logo-circle img{width:100%;height:100%;object-fit:cover;display:block}
#_shell .h-logo-circle span{display:none;width:100%;height:100%;align-items:center;justify-content:center}
#_shell .h-logo-circle i{font-size:20px;color:#fff}
#_shell .h-logo-nome{font-family:'Lora',Georgia,serif;font-size:15px;font-weight:700;color:var(--dark);line-height:1.1}
#_shell .h-logo-sub{font-size:10px;color:var(--sub)}
#_shell .h-saud{flex:1;padding-left:4px}
#_shell .h-saud-top{font-size:12px;color:var(--sub)}
#_shell .h-saud-nome{font-family:'Lora',Georgia,serif;font-size:16px;font-weight:700;color:var(--dark);line-height:1.1}
#_shell .h-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
#_shell .h-dt{text-align:right}
#_shell .h-hora{font-family:'Lora',Georgia,serif;font-size:18px;font-weight:700;color:var(--dark);line-height:1}
#_shell .h-data{font-size:11px;color:var(--sub);margin-top:1px}
#_shell .h-perfil{width:36px;height:36px;border-radius:50%;background:var(--bg);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--sub);cursor:pointer;transition:all .15s;text-decoration:none;flex-shrink:0}
#_shell .h-perfil:hover{background:var(--dark);color:#fff;border-color:var(--dark)}

/* BOLINHAS */
#_shell .mod-bar{background:var(--white);border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;gap:10px}
#_shell .mods-grid{flex:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:6px 4px;justify-items:center;align-items:start}
#_shell .mod-ball{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;color:inherit;cursor:pointer;width:100%;max-width:76px}
#_shell .mod-ball-icon{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;position:relative;transition:transform .22s cubic-bezier(.34,1.5,.64,1),box-shadow .22s}
#_shell .mod-ball:hover .mod-ball-icon{transform:translateY(-4px) scale(1.08);box-shadow:0 8px 20px rgba(0,0,0,.13)}
#_shell .mod-ball.active .mod-ball-icon{box-shadow:0 0 0 2.5px var(--cyan),0 4px 12px rgba(41,184,194,.25)}
#_shell .mod-ball-lbl{font-size:9.5px;font-weight:700;color:var(--sub);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%}
#_shell .mod-ball.active .mod-ball-lbl{color:var(--cyan)}
#_shell .mod-ball-bdg{position:absolute;top:-2px;right:-2px;width:15px;height:15px;border-radius:50%;background:#DC2626;border:2px solid var(--white);font-size:8px;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center}
#_shell .mod-more-wrap{position:relative;flex-shrink:0}
#_shell .mod-more-btn{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;width:64px}
#_shell .mod-more{width:50px;height:50px;border-radius:50%;background:var(--bg);border:1.5px dashed var(--border);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--sub);transition:all .15s}
#_shell .mod-more:hover{background:#E2DFD6;border-color:var(--sub)}
#_shell .mod-more-lbl{font-size:9.5px;font-weight:700;color:var(--sub);text-align:center}
#_shell .mod-more-drop{display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--white);border:1px solid var(--border);border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,.12);padding:6px;z-index:10;min-width:180px}
#_shell .mod-more-drop.open{display:block}
#_shell .mod-more-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;font-size:13px;font-weight:600;color:var(--dark);text-decoration:none;transition:background .12s}
#_shell .mod-more-item:hover{background:var(--bg)}
#_shell .mod-more-item i{font-size:16px;width:20px;text-align:center}

@keyframes _shell_spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
`;

  // Injeta CSS
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // Injeta HTML
  const shell = document.createElement('div');
  shell.id = '_shell';
  shell.innerHTML = `
    <div class="header">
      <a class="h-logo" href="dashboard.html">
        <div class="h-logo-circle">
          <img src="logo.png" alt="Dottec" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
          <span><i class="ti ti-device-laptop"></i></span>
        </div>
        <div>
          <div class="h-logo-nome">Dottec</div>
          <div class="h-logo-sub">Assistência Inteligente</div>
        </div>
      </a>
      <div class="h-saud">
        <div class="h-saud-top" id="_sh_saud_top">—</div>
        <div class="h-saud-nome" id="_sh_saud_nome">—</div>
      </div>
      <div class="h-right">
        <div class="h-dt">
          <div class="h-hora" id="_sh_hora">—</div>
          <div class="h-data" id="_sh_data">—</div>
        </div>
        <a class="h-perfil" href="#" title="Meu perfil"><i class="ti ti-id-badge-2"></i></a>
      </div>
    </div>
    <div class="mod-bar">
      <div class="mods-grid" id="_sh_grid">
        <div style="color:var(--sub)"><i class="ti ti-loader-2" style="animation:_shell_spin .7s linear infinite;display:inline-block"></i></div>
      </div>
      <div class="mod-more-wrap" id="_sh_more_wrap" style="display:none">
        <div class="mod-more-btn" id="_sh_more_btn">
          <div class="mod-more"><i class="ti ti-dots"></i></div>
          <span class="mod-more-lbl">mais</span>
        </div>
        <div class="mod-more-drop" id="_sh_more_drop"></div>
      </div>
    </div>
  `;
  // Insere como primeiro filho do body
  if(document.body) {
    document.body.insertBefore(shell, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.insertBefore(shell, document.body.firstChild);
    });
  }

  // Padding no body para não sobrepor
  const padStyle = document.createElement('style');
  padStyle.textContent = 'body{padding-top:136px!important}';
  document.head.appendChild(padStyle);

  // Relógio
  function tick(){
    const n=new Date(), h=n.getHours();
    const top = document.getElementById('_sh_saud_top');
    const nome = document.getElementById('_sh_saud_nome');
    const hora = document.getElementById('_sh_hora');
    const data = document.getElementById('_sh_data');
    if(top) top.textContent = h<12?'Bom dia,':h<18?'Boa tarde,':'Boa noite,';
    if(nome) nome.textContent = USR.nome;
    if(hora) hora.textContent = n.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    if(data) data.textContent = n.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
  }
  tick();
  setInterval(tick, 10000);

  // Bolinhas
  let ATIVOS = ['os','venda','caixa','financeiro','orcamentos','cadastro','produtos','compras'];

  async function renderMods(){
    const db = getDb();
    if(db && USR.id){
      try{
        const{data}=await db.from('configuracoes_sistema').select('valor').eq('chave','mods_u_'+USR.id).maybeSingle();
        if(data?.valor){ try{ATIVOS=JSON.parse(data.valor);}catch{} }
      }catch{}
    }
    const ativos = ATIVOS.slice(0,8).map(id=>MODS.find(m=>m.id===id)).filter(Boolean);
    const resto  = MODS.filter(m=>!ATIVOS.slice(0,8).includes(m.id));

    const grid = document.getElementById('_sh_grid');
    if(grid){
      grid.innerHTML = ativos.map(m=>`
        <a class="mod-ball${m.id===PAGE_ID?' active':''}" href="${m.href}">
          <div class="mod-ball-icon" style="background:${m.bg}">
            <i class="ti ${m.ico}" style="color:${m.c}"></i>
            ${m.id==='os'?'<span class="mod-ball-bdg" id="_sh_os_bdg" style="display:none">!</span>':''}
          </div>
          <span class="mod-ball-lbl">${m.lbl}</span>
        </a>`).join('');
    }

    const mw = document.getElementById('_sh_more_wrap');
    const md = document.getElementById('_sh_more_drop');
    if(resto.length && mw && md){
      mw.style.display = 'block';
      md.innerHTML = resto.map(m=>`<a class="mod-more-item" href="${m.href}"><i class="ti ${m.ico}" style="color:${m.c}"></i>${m.lbl}</a>`).join('');
    } else if(mw){
      mw.style.display = 'none';
    }

    // toggle "mais"
    const btn = document.getElementById('_sh_more_btn');
    if(btn) btn.onclick = function(e){
      e.stopPropagation();
      document.getElementById('_sh_more_drop')?.classList.toggle('open');
    };
    document.addEventListener('click', ()=>document.getElementById('_sh_more_drop')?.classList.remove('open'));

    // badge OS
    if(db){
      try{
        const{data:sc}=await db.from('status_config').select('nome').eq('modulo','OS').eq('gera_alerta',true).eq('ativo',true);
        if(sc?.length){
          const{count}=await db.from('ordens_servico').select('id',{count:'exact',head:true}).in('status',sc.map(s=>s.nome));
          const b=document.getElementById('_sh_os_bdg');
          if(b&&count>0){b.style.display='flex';b.textContent=count>9?'9+':count;}
        }
      }catch{}
    }
  }

  renderMods();
})();
