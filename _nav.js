/* ─────────────────────────────────────────────────────────────
   _nav.js  —  Navegação global Dottec Assistência
   Inclua em todas as páginas:
     <script src="_nav.js"></script>
   Defina antes de incluir (opcional):
     const PAGE_ID = 'os';          // para marcar o ativo
     const BREADCRUMB = [           // trilha de navegação
       {label:'Configurações', href:'configuracoes.html'},
       {label:'Status'}
     ];
   ───────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", function(){
(function(){
  const SB_URL='https://clctxzynpfjilxmyblpg.supabase.co';
  const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3R4enlucGZqaWx4bXlibHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzEyNDMsImV4cCI6MjA5NTM0NzI0M30.YBGIwVFpE52KZKpOjMMMh1WCZbzDLM_adwGxxXhkIL0';

  // ── sessão ──────────────────────────────────────────────────
  let USR = {nome:'Gaza', perfil:'ADMIN', id:null};
  try { const s = sessionStorage.getItem('dottec_sessao'); if(s) USR = JSON.parse(s); } catch{}

  // ── módulos do menu ─────────────────────────────────────────
  const MENU = [
    {id:'dashboard',  label:'Início',      icon:'ti-home',           href:'dashboard.html'},
    {id:'os',         label:'OS',          icon:'ti-tool',           href:'os.html',          alerta:true},
    {id:'venda',      label:'Venda',       icon:'ti-shopping-cart',  href:'venda.html'},
    {id:'financeiro', label:'Financeiro',  icon:'ti-currency-dollar',href:'financeiro.html'},
    {id:'orcamentos', label:'Orçamentos',  icon:'ti-calculator',     href:'orcamentos.html'},
    {id:'cadastro',   label:'Cadastro',    icon:'ti-users',          href:'pessoas.html'},
    {id:'produtos',   label:'Produtos',    icon:'ti-package',        href:'produtos.html'},
    {id:'compras',    label:'Compras',     icon:'ti-truck-delivery', href:'compras.html'},
    {id:'fiscal',     label:'Fiscal',      icon:'ti-file-invoice',   href:'fiscal.html'},
    {id:'configuracoes',label:'Config.',   icon:'ti-settings',       href:'configuracoes.html'},
  ];

  // detecta página atual pelo PAGE_ID ou pela URL
  const PAGE = (typeof PAGE_ID !== 'undefined') ? PAGE_ID :
    (() => {
      const f = location.pathname.split('/').pop().replace('.html','');
      if(f.startsWith('os')) return 'os';
      if(f.startsWith('venda')||f==='vendas') return 'venda';
      if(f==='contas'||f==='caixa'||f==='financeiro') return 'financeiro';
      if(f.startsWith('pessoa')||f==='cadastro') return 'cadastro';
      if(f.startsWith('produto')) return 'produtos';
      if(f.startsWith('compra')) return 'compras';
      if(f.startsWith('nf')||f==='fiscal') return 'fiscal';
      if(f.startsWith('orcamento')) return 'orcamentos';
      if(f.startsWith('config')||f==='status-config'||f==='formas-pagamento'||f==='servicos'||f==='certificado') return 'configuracoes';
      return 'dashboard';
    })();

  // breadcrumb global definido por cada página ou vazio
  const CRUMB = (typeof BREADCRUMB !== 'undefined') ? BREADCRUMB : [];

  // ── CSS injetado ─────────────────────────────────────────────
  const css = `
  #dottec-nav-shell *{box-sizing:border-box;margin:0;padding:0}
  #dottec-nav-shell{
    position:fixed;top:0;left:0;right:0;z-index:900;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Figtree,sans-serif;
  }

  /* TOPBAR */
  #dnt-top{
    background:#fff;border-bottom:1px solid #EAE7DF;
    display:flex;align-items:center;height:54px;padding:0 20px;gap:14px;
    box-shadow:0 1px 4px rgba(0,0,0,.06);
  }
  #dnt-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
  #dnt-logo-circle{
    width:34px;height:34px;border-radius:50%;
    background:linear-gradient(135deg,#29B8C2,#1E9099);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 8px rgba(41,184,194,.35);
    font-size:16px;color:#fff;flex-shrink:0;
  }
  #dnt-logo-name{font-size:14px;font-weight:700;color:#1C1C1A;letter-spacing:-.01em;white-space:nowrap}
  #dnt-logo-sub{font-size:10px;color:#8A887F;margin-top:1px;white-space:nowrap}

  /* BREADCRUMB */
  #dnt-crumb{display:flex;align-items:center;gap:5px;flex:1;overflow:hidden;padding:0 4px}
  .dnt-crumb-sep{font-size:12px;color:#C8C5BC;flex-shrink:0}
  .dnt-crumb-item{font-size:12.5px;color:#8A887F;text-decoration:none;white-space:nowrap;
    padding:3px 8px;border-radius:6px;transition:background .12s,color .12s;flex-shrink:0}
  .dnt-crumb-item:hover{background:#F0EDE7;color:#1C1C1A}
  .dnt-crumb-item.current{color:#1C1C1A;font-weight:600;cursor:default}
  .dnt-crumb-item.current:hover{background:transparent}

  /* DIREITA */
  #dnt-right{display:flex;align-items:center;gap:10px;flex-shrink:0;margin-left:auto}
  #dnt-time{font-size:11px;color:#8A887F;white-space:nowrap}
  #dnt-saud{font-size:11.5px;color:#5A5855;white-space:nowrap;font-weight:500}
  #dnt-av{
    width:30px;height:30px;border-radius:50%;
    background:linear-gradient(135deg,#29B8C2,#1E9099);
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;color:#fff;cursor:pointer;flex-shrink:0;
    box-shadow:0 2px 6px rgba(41,184,194,.3);
  }

  /* BARRA SECUNDÁRIA: BUSCA + NAV */
  #dnt-bar{
    background:#FAFAF7;border-bottom:1px solid #EAE7DF;
    display:flex;align-items:center;gap:0;height:42px;
    box-shadow:0 1px 3px rgba(0,0,0,.04);
  }

  /* NAV HORIZONTAL */
  #dnt-nav{display:flex;align-items:center;height:100%;overflow-x:auto;flex-shrink:0}
  #dnt-nav::-webkit-scrollbar{display:none}
  .dnt-nav-item{
    height:100%;display:flex;align-items:center;gap:5px;padding:0 13px;
    font-size:12px;font-weight:600;color:#8A887F;white-space:nowrap;
    text-decoration:none;border-bottom:2px solid transparent;
    transition:color .15s,border-color .15s,background .15s;flex-shrink:0;
    position:relative;
  }
  .dnt-nav-item i{font-size:14px}
  .dnt-nav-item:hover{color:#1C1C1A;background:#F0EDE7}
  .dnt-nav-item.on{color:#1C1C1A;border-bottom-color:#29B8C2;background:#fff}
  .dnt-nav-badge{
    background:#E8604A;color:#fff;font-size:8.5px;font-weight:800;
    border-radius:10px;padding:1px 5px;line-height:1.4;
    position:absolute;top:8px;right:4px;
  }
  .dnt-nav-sep{width:1px;height:20px;background:#EAE7DF;flex-shrink:0;margin:0 2px}

  /* BUSCA */
  #dnt-search-wrap{flex:1;position:relative;border-left:1px solid #EAE7DF}
  #dnt-search-row{
    display:flex;align-items:center;gap:8px;height:42px;padding:0 14px;
    cursor:text;
  }
  #dnt-search-row i{font-size:15px;color:#B5B2A8;flex-shrink:0}
  #dnt-search-inp{
    flex:1;border:none;outline:none;font-size:13.5px;
    background:transparent;color:#1C1C1A;font-family:inherit;
    text-transform:uppercase;caret-color:#29B8C2;
  }
  #dnt-search-inp::placeholder{text-transform:none;color:#B5B2A8;font-size:13px}
  #dnt-search-kbd{font-size:10px;color:#B5B2A8;background:#EAE7DF;border-radius:4px;padding:1px 6px;flex-shrink:0}

  /* DROPDOWN BUSCA */
  #dnt-sr{
    display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;
    background:#fff;border:1px solid #EAE7DF;border-radius:12px;
    box-shadow:0 16px 48px rgba(0,0,0,.13);max-height:460px;overflow-y:auto;z-index:999;
  }
  #dnt-sr.open{display:block}
  .dnt-sr-sec{padding:8px 14px 4px;font-size:10px;font-weight:700;color:#94938E;text-transform:uppercase;letter-spacing:.08em;display:flex;align-items:center;gap:8px}
  .dnt-sr-sec::after{content:'';flex:1;height:1px;background:#F0EDE7}
  .dnt-sr-row{display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;border-bottom:1px solid #F5F4F0;transition:background .1s}
  .dnt-sr-row:hover,.dnt-sr-row.foc{background:#F5F4F0}
  .dnt-sr-row:last-child{border-bottom:none}
  .dnt-sr-ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
  .dnt-sri-p{background:#E3F4F5;color:#1E9099}
  .dnt-sri-pr{background:#FBE9E5;color:#C94835}
  .dnt-sri-os{background:#FBEEDB;color:#9A6000}
  .dnt-sri-c{background:#EAF3DE;color:#3B6D11}
  .dnt-sri-v{background:#EEF0F5;color:#3A4A6B}
  .dnt-sr-info{flex:1;min-width:0}
  .dnt-sr-title{font-size:13px;font-weight:600;color:#1C1C1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dnt-sr-sub{font-size:11px;color:#8A887F;margin-top:1px}
  .dnt-sr-meta{font-size:11.5px;color:#94938E;flex-shrink:0;white-space:nowrap}
  .dnt-sr-subg{border-left:2px solid #E8E5DF;margin:2px 14px 6px 54px;border-radius:0 6px 6px 0}
  .dnt-sr-subr{display:flex;align-items:center;gap:7px;padding:6px 10px;font-size:12px;color:#5A5855;cursor:pointer;transition:background .1s}
  .dnt-sr-subr:hover{background:#F5F4F0}
  .dnt-sr-subr i{font-size:13px;color:#94938E}
  .dnt-sr-empty{padding:2rem;text-align:center;color:#94938E}
  .dnt-sr-empty i{font-size:26px;display:block;margin-bottom:8px;opacity:.3}
  .dnt-sr-foot{padding:8px 14px;border-top:1px solid #F0EDE7;font-size:11px;color:#94938E;text-align:center}

  /* ESPAÇAMENTO DO BODY */
  body{padding-top:96px!important}
  `;

  // ── injeta CSS ───────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── monta HTML ───────────────────────────────────────────────
  const crumbHTML = (() => {
    const parts = [{label:'Início', href:'dashboard.html'}, ...CRUMB];
    return parts.map((c, i) => {
      const isLast = i === parts.length - 1;
      const sep = i > 0 ? '<span class="dnt-crumb-sep">›</span>' : '';
      if(isLast) return `${sep}<span class="dnt-crumb-item current">${c.label}</span>`;
      return `${sep}<a class="dnt-crumb-item" href="${c.href}">${c.label}</a>`;
    }).join('');
  })();

  const navHTML = MENU.map(m => `
    <a class="dnt-nav-item${PAGE===m.id?' on':''}" href="${m.href}" id="dnt-nav-${m.id}">
      <i class="ti ${m.icon}"></i>${m.label}
      ${m.alerta ? '<span class="dnt-nav-badge" id="dnt-os-badge" style="display:none">!</span>' : ''}
    </a>
    ${m.id==='os'||m.id==='orcamentos'||m.id==='cadastro' ? '<div class="dnt-nav-sep"></div>' : ''}
  `).join('');

  const shell = document.createElement('div');
  shell.id = 'dottec-nav-shell';
  shell.innerHTML = `
    <div id="dnt-top">
      <a id="dnt-logo" href="dashboard.html">
        <div id="dnt-logo-circle"><i class="ti ti-device-laptop"></i></div>
        <div>
          <div id="dnt-logo-name">Dottec Assistência</div>
          <div id="dnt-logo-sub">Sistema de Gestão</div>
        </div>
      </a>
      <div id="dnt-crumb">${crumbHTML}</div>
      <div id="dnt-right">
        <span id="dnt-time">—</span>
        <span id="dnt-saud">—</span>
        <div id="dnt-av">${USR.nome[0].toUpperCase()}</div>
      </div>
    </div>
    <div id="dnt-bar">
      <nav id="dnt-nav">${navHTML}</nav>
      <div id="dnt-search-wrap">
        <div id="dnt-search-row">
          <i class="ti ti-search"></i>
          <input id="dnt-search-inp" type="text" placeholder="Buscar clientes, OS, produtos, contas..." autocomplete="off"/>
          <span id="dnt-search-kbd">ESC</span>
        </div>
        <div id="dnt-sr"></div>
      </div>
    </div>
  `;
  document.body.insertBefore(shell, document.body.firstChild);

  // ── relógio ──────────────────────────────────────────────────
  function tick(){
    const n = new Date(), h = n.getHours();
    document.getElementById('dnt-time').textContent =
      n.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'}).toUpperCase() +
      ' · ' + n.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    document.getElementById('dnt-saud').textContent =
      (h<12?'Bom dia':h<18?'Boa tarde':'Boa noite') + ', ' + USR.nome;
  }
  tick(); setInterval(tick, 15000);

  // ── alertas OS ───────────────────────────────────────────────
  async function checkAlertas(){
    try {
      const db = getDb(); if(!db) return;
      const {data:sc} = await db.from('status_config')
        .select('nome').eq('modulo','OS').eq('gera_alerta',true).eq('ativo',true);
      if(!sc||!sc.length) return;
      const {count} = await db.from('ordens_servico')
        .select('id',{count:'exact',head:true}).in('status', sc.map(s=>s.nome));
      const badge = document.getElementById('dnt-os-badge');
      if(badge){
        if(count>0){badge.style.display='inline';badge.textContent=count;}
        else{badge.style.display='none';}
      }
    } catch{}
  }
  // espera supabase carregar
  setTimeout(checkAlertas, 800);
  setInterval(checkAlertas, 60000);

  // ── busca global ─────────────────────────────────────────────
  let busTimer, RESULTADOS = [], FOCI = -1;
  const inp = document.getElementById('dnt-search-inp');
  const sr  = document.getElementById('dnt-sr');

  inp.addEventListener('input', () => {
    const q = inp.value.trim();
    clearTimeout(busTimer); FOCI = -1;
    if(q.length < 2){sr.classList.remove('open'); return;}
    sr.innerHTML = '<div class="dnt-sr-empty"><i class="ti ti-loader-2" style="animation:_dnt_spin .7s linear infinite;font-size:22px"></i></div>';
    sr.classList.add('open');
    busTimer = setTimeout(() => executaBusca(q), 300);
  });

  // injeta keyframe de spin
  const kf = document.createElement('style');
  kf.textContent = '@keyframes _dnt_spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
  document.head.appendChild(kf);

  // reutiliza instância existente da página ou cria uma só vez
  let _navDb = null;
  function getDb(){
    if(_navDb) return _navDb;
    if(typeof supabase === 'undefined') return null;
    // tenta reutilizar o cliente da página se existir (window.db ou window._sb)
    if(window._dottecDb) return window._dottecDb;
    _navDb = supabase.createClient(SB_URL, SB_KEY);
    window._dottecDb = _navDb;
    return _navDb;
  }

  async function executaBusca(q){
    const db = getDb();
    if(!db){sr.classList.remove('open');return;}
    const t = q.toUpperCase(), doc = q.replace(/\D/g,'');
    const fmt = v => 'R$ '+(v||0).toLocaleString('pt-BR',{minimumFractionDigits:2});
    const safe = async(p) => { try{ return await p; }catch{ return {data:[]}; } };
    const [rP,rPr,rOS,rC,rV] = await Promise.all([
      db.from('pessoas').select('id,nome,documento,tipo_doc,celular,is_cliente,is_fornecedor')
        .or(`nome.ilike.%${t}%${doc?`,documento.ilike.%${doc}%`:''}`)
        .eq('ativo',true).limit(4),
      db.from('produtos').select('id,codigo,nome,valor_venda,estoque_atual')
        .ilike('nome','%'+t+'%').eq('ativo',true).limit(3),
      safe(db.from('ordens_servico').select('id,numero,cliente_nome,aparelho,status')
        .or(`cliente_nome.ilike.%${t}%,aparelho.ilike.%${t}%`).limit(4)),
      safe(db.from('contas').select('id,tipo,descricao,valor,status')
        .ilike('descricao','%'+t+'%').limit(3)),
      safe(db.from('vendas').select('id,numero,total,nome_cliente,criado_em')
        .ilike('nome_cliente','%'+t+'%').order('criado_em',{ascending:false}).limit(3)),
    ]);
    RESULTADOS = []; let html = '';

    const pessoas = rP.data||[];
    if(pessoas.length){
      html += '<div class="dnt-sr-sec">Pessoas</div>';
      for(const p of pessoas){
        const url = `pessoa-novo.html?id=${p.id}`;
        RESULTADOS.push({url});
        html += `<div class="dnt-sr-row" data-i="${RESULTADOS.length-1}" onclick="location.href='${url}'">
          <div class="dnt-sr-ico dnt-sri-p"><i class="ti ti-user"></i></div>
          <div class="dnt-sr-info">
            <div class="dnt-sr-title">${p.nome}</div>
            <div class="dnt-sr-sub">${p.tipo_doc}: ${p.documento||''} · ${p.celular||''}</div>
          </div>
          <div class="dnt-sr-meta">${[p.is_cliente?'CLI':'',p.is_fornecedor?'FOR':''].filter(Boolean).join(' · ')}</div>
        </div>`;
        // sub: OS e contas da pessoa
        const [rOp,rCp] = await Promise.all([
          db.from('ordens_servico').select('id,numero,status,aparelho').eq('pessoa_id',p.id).limit(2).catch(()=>({data:[]})),
          db.from('contas').select('id,tipo,descricao,valor').eq('pessoa_id',p.id).in('status',['ABERTA','VENCIDA']).limit(2).catch(()=>({data:[]})),
        ]);
        const subs = [
          ...(rOp.data||[]).map(o=>({i:'ti-tool',txt:`OS #${String(o.numero).padStart(4,'0')} — ${o.status} · ${o.aparelho||''}`,url:`os-nova.html?id=${o.id}`})),
          ...(rCp.data||[]).map(c=>({i:'ti-currency-dollar',txt:`${c.tipo==='PAGAR'?'Pagar':'Receber'}: ${c.descricao} — ${fmt(c.valor)}`,url:`contas.html`})),
        ];
        if(subs.length){
          html += '<div class="dnt-sr-subg">';
          subs.forEach(s=>{
            RESULTADOS.push({url:s.url});
            html += `<div class="dnt-sr-subr" data-i="${RESULTADOS.length-1}" onclick="location.href='${s.url}'"><i class="ti ${s.i}"></i>${s.txt}</div>`;
          });
          html += '</div>';
        }
      }
    }

    const prods = rPr.data||[];
    if(prods.length){
      html += '<div class="dnt-sr-sec">Produtos</div>';
      prods.forEach(p=>{
        const url = `produto-novo.html?id=${p.id}`;
        RESULTADOS.push({url});
        html += `<div class="dnt-sr-row" data-i="${RESULTADOS.length-1}" onclick="location.href='${url}'">
          <div class="dnt-sr-ico dnt-sri-pr"><i class="ti ti-package"></i></div>
          <div class="dnt-sr-info"><div class="dnt-sr-title">${p.nome}</div><div class="dnt-sr-sub">Est: ${p.estoque_atual||0}</div></div>
          <div class="dnt-sr-meta">${fmt(p.valor_venda)}</div>
        </div>`;
      });
    }

    const oss = rOS.data||[];
    if(oss.length){
      html += '<div class="dnt-sr-sec">Ordens de Serviço</div>';
      oss.forEach(o=>{
        const url = `os-nova.html?id=${o.id}`;
        RESULTADOS.push({url});
        html += `<div class="dnt-sr-row" data-i="${RESULTADOS.length-1}" onclick="location.href='${url}'">
          <div class="dnt-sr-ico dnt-sri-os"><i class="ti ti-tool"></i></div>
          <div class="dnt-sr-info"><div class="dnt-sr-title">OS #${String(o.numero).padStart(4,'0')} — ${o.cliente_nome}</div><div class="dnt-sr-sub">${o.aparelho||''} · ${o.status}</div></div>
          <div class="dnt-sr-meta"><i class="ti ti-chevron-right"></i></div>
        </div>`;
      });
    }

    const contas = rC.data||[];
    if(contas.length){
      html += '<div class="dnt-sr-sec">Contas</div>';
      contas.forEach(c=>{
        RESULTADOS.push({url:'contas.html'});
        html += `<div class="dnt-sr-row" data-i="${RESULTADOS.length-1}" onclick="location.href='contas.html'">
          <div class="dnt-sr-ico dnt-sri-c"><i class="ti ti-currency-dollar"></i></div>
          <div class="dnt-sr-info"><div class="dnt-sr-title">${c.descricao}</div><div class="dnt-sr-sub">${c.tipo==='PAGAR'?'A Pagar':'A Receber'} · ${c.status}</div></div>
          <div class="dnt-sr-meta">${fmt(c.valor)}</div>
        </div>`;
      });
    }

    const vendas = rV.data||[];
    if(vendas.length){
      html += '<div class="dnt-sr-sec">Vendas</div>';
      vendas.forEach(v=>{
        RESULTADOS.push({url:'vendas.html'});
        html += `<div class="dnt-sr-row" data-i="${RESULTADOS.length-1}" onclick="location.href='vendas.html'">
          <div class="dnt-sr-ico dnt-sri-v"><i class="ti ti-shopping-cart"></i></div>
          <div class="dnt-sr-info"><div class="dnt-sr-title">Venda #${String(v.numero).padStart(4,'0')} — ${v.nome_cliente||'Balcão'}</div><div class="dnt-sr-sub">${new Date(v.criado_em).toLocaleDateString('pt-BR')}</div></div>
          <div class="dnt-sr-meta">${fmt(v.total)}</div>
        </div>`;
      });
    }

    if(!RESULTADOS.length) html = `<div class="dnt-sr-empty"><i class="ti ti-search-off"></i>Sem resultados para "${q.toUpperCase()}"</div>`;
    else html += '<div class="dnt-sr-foot">↑ ↓ navegar · Enter abrir · ESC fechar</div>';
    sr.innerHTML = html;
  }

  inp.addEventListener('keydown', e => {
    const rows = sr.querySelectorAll('.dnt-sr-row,.dnt-sr-subr');
    if(!rows.length) return;
    if(e.key==='ArrowDown'){e.preventDefault();FOCI=Math.min(FOCI+1,rows.length-1);}
    else if(e.key==='ArrowUp'){e.preventDefault();FOCI=Math.max(FOCI-1,0);}
    else if(e.key==='Enter'){e.preventDefault();const r=rows[FOCI];if(r){const i=+r.dataset.i;if(RESULTADOS[i])location.href=RESULTADOS[i].url;}}
    else if(e.key==='Escape'){sr.classList.remove('open');inp.blur();return;}
    rows.forEach((r,i)=>r.classList.toggle('foc',i===FOCI));
    if(FOCI>=0)rows[FOCI].scrollIntoView({block:'nearest'});
  });

  document.addEventListener('click', e => {
    if(!e.target.closest('#dnt-search-wrap')) sr.classList.remove('open');
  });

  // atalho teclado: foca na busca apenas com / ou Ctrl+K, NUNCA captura letras soltas
  document.addEventListener('keydown', e => {
    // Só ativa com atalho explícito: barra "/" ou Ctrl+K
    if((e.key === '/' || (e.key === 'k' && e.ctrlKey)) && !e.metaKey) {
      const active = document.activeElement;
      const tag = active ? active.tagName : '';
      if(tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active.isContentEditable) return;
      e.preventDefault();
      inp.focus();
    }
  });

})();
});