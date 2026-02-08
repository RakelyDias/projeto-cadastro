// Carregar arquivo de configuração primeiro
// config.js deve estar carregado antes deste arquivo

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

async function carregarProdutos() {
    const container = document.getElementById('produtos-container');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const emptyState = document.getElementById('empty-state');

    try {
        loading.style.display = 'block';
        container.innerHTML = '';
        error.style.display = 'none';
        emptyState.style.display = 'none';

        const response = await fetch(`${API_URL}/produtos`);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
        }

        const dados = await response.json();

        if (!dados.sucesso) {
            throw new Error(dados.mensagem || 'Erro ao carregar produtos');
        }

        loading.style.display = 'none';

        if (dados.dados.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        // Renderizar produtos
        dados.dados.forEach(produto => {
            const card = criarCardProduto(produto);
            container.appendChild(card);
        });

    } catch (err) {
        console.error('Erro:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = `Erro: ${err.message}. Verifique se o servidor está rodando em ${API_URL}`;
    }
}

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'produto-card';

    const dataFormatada = new Date(produto.data_criacao).toLocaleDateString('pt-BR');
    const precoFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p class="produto-descricao">${produto.descricao}</p>
        <div class="produto-preco">${precoFormatado}</div>
        <div class="produto-quantidade">
            <strong>Quantidade:</strong> ${produto.quantidade} unidade(s)
        </div>
        <div class="produto-data">
            Cadastrado em: ${dataFormatada}
        </div>
    `;

    return card;
}
