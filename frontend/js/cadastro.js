// Formulário de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produto');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await cadastrarProduto();
    });
});

async function cadastrarProduto() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    const successDiv = document.getElementById('success');
    const errorDiv = document.getElementById('error');

    successDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Validação básica no cliente
    if (!nome || !descricao || isNaN(preco) || isNaN(quantidade)) {
        errorDiv.textContent = 'Todos os campos são obrigatórios e devem ser válidos';
        errorDiv.style.display = 'block';
        return;
    }

    if (preco < 0 || quantidade < 0) {
        errorDiv.textContent = 'Preço e quantidade devem ser maiores ou iguais a 0';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
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

        const dados = await response.json();

        if (!dados.sucesso) {
            throw new Error(dados.mensagem || 'Erro ao cadastrar produto');
        }

        // Sucesso
        successDiv.style.display = 'block';
        document.getElementById('form-produto').reset();

        // Redirecionar para lista de produtos após 2 segundos
        setTimeout(() => {
            window.location.href = 'produtos.html';
        }, 2000);

    } catch (err) {
        console.error('Erro:', err);
        errorDiv.textContent = `Erro: ${err.message}. Verifique se o servidor está rodando em ${API_URL}`;
        errorDiv.style.display = 'block';
    }
}
