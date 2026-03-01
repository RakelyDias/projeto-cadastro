// Carregar arquivo de configuração primeiro
// config.js deve estar carregado antes deste arquivo

let produtoId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Obter o ID do produto da URL
    const params = new URLSearchParams(window.location.search);
    produtoId = params.get('id');

    if (!produtoId || isNaN(produtoId)) {
        exibirErro('ID do produto inválido');
        return;
    }

    carregarProduto(produtoId);
    configurarFormulario();
});

async function carregarProduto(id) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const form = document.getElementById('form-produto');

    try {
        loading.style.display = 'block';
        error.style.display = 'none';
        form.style.display = 'none';

        const response = await fetch(`${API_URL}/produtos/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao carrega produto: ${response.statusText}`);
        }

        const dados = await response.json();

        if (!dados.sucesso) {
            throw new Error(dados.mensagem || 'Erro ao carregar produto');
        }

        // Preencher o formulário com os dados do produto
        const produto = dados.dados;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('quantidade').value = produto.quantidade;

        loading.style.display = 'none';
        form.style.display = 'block';

    } catch (err) {
        console.error('Erro:', err);
        exibirErro(`Erro ao carregar produto: ${err.message}`);
    }
}

function configurarFormulario() {
    const form = document.getElementById('form-produto');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await atualizarProduto();
    });
}

async function atualizarProduto() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    // Validação básica
    if (!nome || !descricao || isNaN(preco) || isNaN(quantidade)) {
        exibirErro('Preencha todos os campos corretamente');
        return;
    }

    if (preco < 0 || quantidade < 0) {
        exibirErro('Preço e quantidade não podem ser negativos');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/produtos/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                descricao,
                preco,
                quantidade
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar: ${response.statusText}`);
        }

        const dados = await response.json();

        if (!dados.sucesso) {
            throw new Error(dados.mensagem || 'Erro ao atualizar produto');
        }

        // Mostrar mensagem de sucesso
        const form = document.getElementById('form-produto');
        const success = document.getElementById('success');
        const error = document.getElementById('error');

        form.style.display = 'none';
        error.style.display = 'none';
        success.style.display = 'block';

    } catch (err) {
        console.error('Erro:', err);
        exibirErro(`Erro ao atualizar produto: ${err.message}`);
    }
}

function exibirErro(mensagem) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const form = document.getElementById('form-produto');

    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = `Erro: ${mensagem}`;
    form.style.display = 'none';
}
