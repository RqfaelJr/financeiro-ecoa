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


function formatMoney(value) {
    if (value === null || value === undefined) return 'R$ 0,00';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num || 0);
}

function formatDateBR(dataString) {
    if (!dataString) return '';
    const dataLimpa = dataString.split('T')[0];
    const partes = dataLimpa.split('-');
    if (partes.length < 3) return dataString; 
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatDateFile(dataString) {
    if (!dataString) return '';
    const dataLimpa = dataString.split('T')[0];
    const partes = dataLimpa.split('-');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}