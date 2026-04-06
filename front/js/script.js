let tipoAtual = null;
const categoriasPorTipoAtivo = {
  "DISPONIBILIDADE": ["DINHEIRO_CAIXA", "CONTA_CORRENTE", "CONTA_POUPANCA", "OUTROS"],
  "INVESTIMENTOS": ["TESOURO_DIRETO", "FUNDOS_INVESTIMENTO", "ACOES", "OUTROS"],
  "DIREITOS": ["IMOVEIS", "VEICULOS", "ELETRONICOS", "ASSINATURAS", "OUTROS"]
};

const categoriasPorTipoPassivo = {
  "CURTO_PRAZO": ["CARTAO_CREDITO", "EMPRESTIMO", "BOLETOS", "OUTROS"],
  "LONGO_PRAZO": ["FINANCIAMENTO_IMOBILIARIO", "FINANCIAMENTO_VEICULO", "OUTROS"]
};

const tokenToLabel = {
  'DINHEIRO': 'Dinheiro',
  'CAIXA': 'Caixa',
  'CONTA': 'Conta',
  'CORRENTE': 'Corrente',
  'POUPANCA': 'Poupança',
  'TESOURO': 'Tesouro',
  'DIRETO': 'Direto',
  'FUNDOS': 'Fundos',
  'INVESTIMENTO': 'Investimento',
  'INVESTIMENTOS': 'Investimentos',
  'ACOES': 'Ações',
  'IMOVEIS': 'Imóveis',
  'VEICULOS': 'Veículos',
  'ELETRONICOS': 'Eletrônicos',
  'ASSINATURAS': 'Assinaturas',
  'OUTROS': 'Outros',
  'FINANCEIRO': 'Financeiro',
  'TRIBUTARIO': 'Tributário',
  'CUSTO': 'Custo',
  'FIXO': 'Fixo',
  'VARIAVEL': 'Variável',
  'CUSTO_FIXO': 'Custo Fixo',
  'CUSTO_VARIAVEL': 'Custo Variável',
  'OPERACIONAL': 'Operacional',
  'NAO': 'Não',
  'NAO_OPERACIONAL': 'Não Operacional',
  'DISPONIBILIDADE': 'Disponibilidade',
  'DIREITOS': 'Direitos',
  'CARTAO_CREDITO': 'Cartão Crédito',
  'EMPRESTIMO': 'Empréstimo',
  'BOLETOS/FATURAS': 'Boletos/Faturas',
  'FINANCIAMENTO_IMOBILIARIO': 'Financiamento Imobiliário',
  'FINANCIAMENTO_VEICULO': 'Financiamento Veículo'
};

function prettifyLabel(key) {
  if (!key) return '';
  if (tokenToLabel[key]) return tokenToLabel[key];

  const parts = key.split('_');
  const words = parts.map(part => {
    const up = part.toUpperCase();
    if (tokenToLabel[up]) return tokenToLabel[up];
    const lower = up.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
  return words.join(' ');
}

function filtrarCategoriasAtivo(tipoSelecionado) {
  const select = document.getElementById('CategoriaAtivo');
  if (!select) return;

  while (select.options.length > 1) select.remove(1);

  if (!tipoSelecionado) {
    select.disabled = true;
    return;
  }

  const permitidas = categoriasPorTipoAtivo[tipoSelecionado] || [];
  permitidas.forEach(val => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = prettifyLabel(val);
    select.appendChild(opt);
  });
  select.disabled = false;
}

function filtrarCategoriasPassivo(tipoSelecionado) {
  const select = document.getElementById('CategoriaPassivo');
  if (!select) return;

  while (select.options.length > 1) select.remove(1);

  if (!tipoSelecionado) {
    select.disabled = true;
    return;
  }

  const permitidas = categoriasPorTipoPassivo[tipoSelecionado] || [];
  permitidas.forEach(val => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = prettifyLabel(val);
    select.appendChild(opt);
  });
  select.disabled = false;
}

function abrirFormulario(tipo) {
  tipoAtual = tipo;
  const containers = [
    'formContainerAtivo',
    'formContainerPassivo',
    'formContainerDespesa',
    'formContainerReceita',
    'formContainerDeletar'
  ];
  containers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  switch (tipoAtual && tipoAtual.toLowerCase()) {
    case 'ativos':
      if (document.getElementById('formContainerAtivo')) document.getElementById('formContainerAtivo').style.display = 'block';
      break;
    case 'passivos':
      if (document.getElementById('formContainerPassivo')) document.getElementById('formContainerPassivo').style.display = 'block';
      break;
    case 'despesas':
      if (document.getElementById('formContainerDespesa')) document.getElementById('formContainerDespesa').style.display = 'block';
      break;
    case 'receitas':
      if (document.getElementById('formContainerReceita')) document.getElementById('formContainerReceita').style.display = 'block';
      break;
    case 'deletar':
      if (document.getElementById('formContainerDeletar')) document.getElementById('formContainerDeletar').style.display = 'block';
      break;
    default:
      console.warn(`Tipo desconhecido ao abrir formulário: ${tipo}`);
      tipoAtual = null;
      alert('Tipo desconhecido. Selecione um tipo válido.');
      return;
  }

  const tipoCap = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const tituloEl = document.getElementById(`formTitulo${tipoCap}`);
  if (tituloEl) tituloEl.textContent = `Cadastrar ${tipoCap}`;
  const dadosEl = document.getElementById('dados');
  if (dadosEl) dadosEl.textContent = '';

  if (tipoAtual && tipoAtual.toLowerCase() === 'ativos') {
    const tipoSelect = document.getElementById('TipoAtivo');
    if (tipoSelect) {
      tipoSelect.onchange = function () {
        filtrarCategoriasAtivo(tipoSelect.value);
      };
      filtrarCategoriasAtivo(tipoSelect.value);
    }
  }

  if (tipoAtual && tipoAtual.toLowerCase() === 'passivos') {
    const tipoPassivoSelect = document.getElementById('TipoPassivo');
    if (tipoPassivoSelect) {
      tipoPassivoSelect.onchange = function () {
        filtrarCategoriasPassivo(tipoPassivoSelect.value);
      };
      filtrarCategoriasPassivo(tipoPassivoSelect.value);
    }
  }
}

function fecharFormulario() {
  const containers = [
    'formContainerAtivo',
    'formContainerPassivo',
    'formContainerDespesa',
    'formContainerReceita',
    'formContainerDeletar'];
  containers.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  tipoAtual = null;
}

document.addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  if (!form || form.tagName !== 'FORM') return;
  if (!tipoAtual) {
    const formId = form.id ? form.id.toLowerCase() : '';
    if (formId.includes('ativo')) tipoAtual = 'ativos';
    else if (formId.includes('passivo')) tipoAtual = 'passivos';
    else if (formId.includes('despesa')) tipoAtual = 'despesas';
    else if (formId.includes('receita')) tipoAtual = 'receitas';
  }

  

  const dadosDiv = document.getElementById('dados');
  const baseUrl = `${API_BASE_URL}/${tipoAtual}/criar`;

  try {
    let payload = {};
    const formData = new FormData(form);

    switch (tipoAtual.toLowerCase()) {
      case 'ativos': {
        const tipoAtivo = formData.get('tipo') || '';
        const categoria = formData.get('categoria') || '';
        const nome = formData.get('nome') || '';
        payload = { tipo: tipoAtivo, categoria: categoria, nome: nome};
        break;
      }
      case 'passivos': {
        const tipoPassivo = formData.get('tipo') || '';
        const categoriaPassivo = formData.get('categoria') || '';
        const nomePassivo = formData.get('nome') || '';
        payload = { tipo: tipoPassivo, categoria: categoriaPassivo, nome: nomePassivo };
        break;
      }
      case 'despesas': {
        const tipoDespesa = formData.get('tipo') || '';
        const nome = formData.get('descricao') || '';
        payload = { tipo: tipoDespesa, nome: nome};
        break;
      }
      case 'receitas': {
        const tipoReceita = formData.get('tipo') || '';
        const nomeR = formData.get('descricao') || '';
        payload = { tipo: tipoReceita, nome: nomeR};
        break;
      }
      default:
        throw new Error(`Tipo inválido: ${tipoAtual}`);
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: falha ao cadastrar ${tipoAtual}`);
    }

    const data = await response.json();
    if (dadosDiv) dadosDiv.textContent = JSON.stringify(data, null, 2);

    const containers = ['formContainerAtivo','formContainerPassivo','formContainerDespesa','formContainerReceita'];
    containers.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    
    if (typeof carregarLista === 'function') {
        carregarLista(tipoAtual.toLowerCase(), 'lista-' + tipoAtual.toLowerCase());
    }
    
    tipoAtual = null;
  } catch (erro) {
    if (dadosDiv) dadosDiv.textContent = `❌ Erro: ${erro.message}`;
  }
});

let deletarContexto = null;

window.prepararDelecao = function(tipo, id, nome) {
    deletarContexto = { tipo, id };
    const modal = document.getElementById('formContainerDeletar');
    const msg = document.getElementById('msgDeletarDireto');
    
    if (modal && msg) {
        msg.innerHTML = `Tem certeza que deseja excluir o item <strong>${nome}</strong>?`;
        fecharFormulario();
        modal.style.display = 'block';
    }
};

window.confirmarDelecaoDireta = async function() {
    if (!deletarContexto) return;
    const { tipo, id } = deletarContexto;
    const dadosDiv = document.getElementById('dados');
    if (dadosDiv) dadosDiv.textContent = 'Processando exclusão...';
    
    const resultadoPanel = document.getElementById('resultado');
    if (resultadoPanel) resultadoPanel.classList.add('show');
    
    const url = `${API_BASE_URL}/${tipo}/deletar/${id}`; 
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            if (dadosDiv) dadosDiv.innerHTML = `<span class="text-success">✅ Registro removido com sucesso!</span>`;
            if (typeof carregarTodasAsListas === 'function') {
                carregarTodasAsListas();
            }
            fecharFormulario();
        } else {
             let mensagemErro = "Erro desconhecido ao deletar.";
             try {
                 const erroData = await response.json();
                 if (erroData.message) mensagemErro = erroData.message;
                 else if (erroData.error) mensagemErro = erroData.error;
             } catch(e) {}
             throw new Error(mensagemErro);
        }
    } catch(erro) {
        if (dadosDiv) dadosDiv.innerHTML = `<span class="text-danger">❌ ${erro.message}</span>`;
    }
};

const ESTADO_PAGINACAO = {
    ativos: { dados: [], atual: 1, limite: 4 },
    passivos: { dados: [], atual: 1, limite: 4 },
    despesas: { dados: [], atual: 1, limite: 4 },
    receitas: { dados: [], atual: 1, limite: 4 }
};

window.mudarPagina = function(tipo, direcao) {
    const st = ESTADO_PAGINACAO[tipo];
    // Conta total baseado nos filtrados para não explodir max páginas ao pesquisar
    const inputPesquisa = document.getElementById('pesquisa-' + tipo);
    let dadosView = st.dados;
    
    if (inputPesquisa && inputPesquisa.value.trim() !== '') {
        const t = inputPesquisa.value.trim().toLowerCase();
        dadosView = st.dados.filter(item => {
            const n = (item.nome || item.descricao || '').toLowerCase();
            const c = (item.categoria || item.tipo || '').toLowerCase();
            return n.includes(t) || c.includes(t);
        });
    }

    const totalPaginas = Math.ceil(dadosView.length / st.limite);
    let nova = st.atual + direcao;
    if (nova >= 1 && nova <= totalPaginas) {
        st.atual = nova;
        renderizarPagina(tipo);
    }
};

window.pesquisarEm = function(tipo) {
    ESTADO_PAGINACAO[tipo].atual = 1; // Reseta a paginação numa nova pesquisa
    renderizarPagina(tipo);
};

async function carregarLista(tipoEndpoint, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Se não estiver na página certa (só na cadastros.html)
    
    container.innerHTML = '<div class="text-center p-3 text-muted"><i class="fa-solid fa-spinner fa-spin"></i> Carregando...</div>';
    
    try {
        const url = `${API_BASE_URL}/${tipoEndpoint}/buscar`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Erro ao buscar ${tipoEndpoint}`);
        
        const dados = await resp.json();
        
        ESTADO_PAGINACAO[tipoEndpoint].dados = dados || [];
        ESTADO_PAGINACAO[tipoEndpoint].atual = 1;
        
        renderizarPagina(tipoEndpoint);
        
    } catch (error) {
       console.error(error);
       container.innerHTML = `<div class="text-danger p-2 text-center" style="font-size: 0.8rem;">Erro na busca.</div>`;
    }
}

function renderizarPagina(tipoEndpoint) {
    const containerId = 'lista-' + tipoEndpoint;
    const pagContainerId = 'paginacao-' + tipoEndpoint;
    const container = document.getElementById(containerId);
    const pagContainer = document.getElementById(pagContainerId);
    
    if (!container) return;
    
    const st = ESTADO_PAGINACAO[tipoEndpoint];
    let dados = st.dados;
    
    const inputPesquisa = document.getElementById('pesquisa-' + tipoEndpoint);
    if (inputPesquisa && inputPesquisa.value.trim() !== '') {
        const termo = inputPesquisa.value.trim().toLowerCase();
        dados = dados.filter(item => {
            const n = (item.nome || item.descricao || '').toLowerCase();
            const c = (item.categoria || item.tipo || '').toLowerCase();
            const formatada = prettifyLabel(item.categoria || item.tipo).toLowerCase();
            return n.includes(termo) || c.includes(termo) || formatada.includes(termo);
        });
    }
    
    container.innerHTML = '';
    
    if (dados.length === 0) {
        if (st.dados.length > 0) {
            container.innerHTML = '<div class="text-center p-3 text-muted" style="font-size: 0.9rem;">Nenhum compatível com a pesquisa.</div>';
        } else {
            container.innerHTML = '<div class="text-center p-3 text-muted" style="font-size: 0.9rem;">Nenhum registro.</div>';
        }
        if(pagContainer) pagContainer.innerHTML = '';
        return;
    }
    
    // Calcula as fatias
    const inicio = (st.atual - 1) * st.limite;
    const fim = inicio + st.limite;
    const itensPagina = dados.slice(inicio, fim);
    
    itensPagina.forEach(item => {
        const nomeStr = item.nome || item.descricao || 'Sem Nome';
        const catStr = item.categoria || item.tipo || '';

        let iconClass = 'fa-solid fa-file-invoice';
        let iconBoxStyle = 'background:#edf2f7; color:#4a5568;';
        if(tipoEndpoint === 'ativos') {
            iconClass = 'fa-solid fa-chart-simple';
            iconBoxStyle = 'background:#ebf4ff; color:#4299e1;';
        } else if(tipoEndpoint === 'passivos') {
            iconClass = 'fa-solid fa-cash-register';
            iconBoxStyle = 'background:#f0fff4; color:#48bb78;';
        } else if(tipoEndpoint === 'despesas') {
            iconClass = 'fa-solid fa-file-invoice-dollar';
            iconBoxStyle = 'background:#fffff0; color:#ecc94b;';
        } else if(tipoEndpoint === 'receitas') {
            iconClass = 'fa-solid fa-arrow-trend-up';
            iconBoxStyle = 'background:#fff5f5; color:#f56565;';
        }

        const itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';
        
        itemDiv.innerHTML = `
          <div class="item-icon" style="${iconBoxStyle}">
            <i class="${iconClass}"></i>
          </div>
          <div class="item-details" style="flex: 2; padding-right: 10px; display: flex; align-items: center;">
            <div class="item-name">${nomeStr}</div>
          </div>
          <div class="item-cat" style="flex: 1; text-align: right; font-weight: 600;">${prettifyLabel(catStr)}</div>
          <div style="width: 28px; margin-left: 10px; display: flex; align-items: center; justify-content: center;">
              <button class="btn-delete-item" onclick="prepararDelecao('${tipoEndpoint}', ${item.id}, '${nomeStr.replace(/'/g, "\\'")}')" title="Excluir"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        container.appendChild(itemDiv);
    });
    
    // Atualiza paginação UI
    if (pagContainer) {
        const totalPaginas = Math.ceil(dados.length / st.limite);
        if (totalPaginas <= 1) {
            pagContainer.innerHTML = ''; // Não mostra paginação
        } else {
            pagContainer.innerHTML = `
                <button class="page-btn" onclick="mudarPagina('${tipoEndpoint}', -1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="page-btn active">${st.atual}</button>
                <span>de ${totalPaginas}</span>
                <button class="page-btn" onclick="mudarPagina('${tipoEndpoint}', 1)"><i class="fa-solid fa-chevron-right"></i></button>
            `;
        }
    }
}

async function carregarTodasAsListas() {
    await Promise.all([
        carregarLista('ativos', 'lista-ativos'),
        carregarLista('passivos', 'lista-passivos'),
        carregarLista('despesas', 'lista-despesas'),
        carregarLista('receitas', 'lista-receitas')
    ]);
}

window.addEventListener('DOMContentLoaded', () => {
    carregarTodasAsListas();
});