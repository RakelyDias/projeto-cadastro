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

async function deletarProduto(id, cardElement) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar: ${response.statusText}`);
        }

        const dados = await response.json();
        if (!dados.sucesso) {
            throw new Error(dados.mensagem || 'Erro ao deletar produto');
        }

        // Remover o card do DOM com animação suave
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'scale(0.95)';
        cardElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            cardElement.remove();
        }, 300);

        alert('Produto deletado com sucesso!');

        // Se não há mais produtos, mostrar empty state
        const container = document.getElementById('produtos-container');
        if (container.children.length === 0) {
            document.getElementById('empty-state').style.display = 'block';
        }

    } catch (err) {
        console.error('Erro:', err);
        alert(`Erro ao deletar produto: ${err.message}`);
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
        <div class="produto-acoes">
            <a href="editar-produto.html?id=${produto.id}" class="btn btn-info">✏️ Editar</a>
            <button class="btn btn-danger btn-delete" data-id="${produto.id}">🗑️ Excluir</button>
        </div>
    `;

    // Adicionar event listener para o botão de deletar
    const btnDelete = card.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => deletarProduto(produto.id, card));

    return card;
}
