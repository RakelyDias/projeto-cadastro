# Sistema de Cadastro de Produtos

Um sistema completo para cadastro e gerenciamento de produtos com frontend HTML/CSS/JavaScript e backend Node.js/Express.

## 📋 Funcionalidades

- ✅ Visualização de produtos cadastrados
- ✅ Cadastro de novos produtos
- ✅ Armazenamento em banco de dados MySQL
- ✅ Interface responsiva e intuitiva
- ✅ API REST para comunicação entre frontend e backend

## 🛠️ Tecnologias

### Frontend
- HTML5
- CSS3
- JavaScript Vanilla

### Backend
- Node.js
- Express.js
- MySQL2

### Banco de Dados
- MySQL (database: web_03mb)

## 📂 Estrutura do Projeto

```
projeto/
├── frontend/
│   ├── index.html          # Página inicial
│   ├── produtos.html       # Lista de produtos
│   ├── cadastro.html       # Formulário de cadastro
│   ├── sobre.html          # Página sobre
│   ├── css/
│   │   └── style.css       # Estilos
│   └── js/
│       ├── config.js       # Configuração da API
│       ├── produtos.js     # Lógica da página de produtos
│       └── cadastro.js     # Lógica do formulário
├── backend/
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependências
│   ├── .env                # Variáveis de ambiente
│   └── database.sql        # Script SQL
└── README.md               # Este arquivo
```

## 🚀 Como Executar

### 1. Preparar o Banco de Dados

Abra seu MySQL e execute os comandos do arquivo `backend/database.sql`:

```sql
CREATE TABLE IF NOT EXISTS produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (nome)
);
```

### 2. Configurar e Rodar o Backend

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Ajustar o arquivo .env conforme necessário
# DB_HOST=localhost
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_NAME=web_03mb

# Rodar o servidor
npm start
```

O servidor rodará em `http://localhost:3001`

### 3. Abrir o Frontend

Abra um navegador e acesse:
```
file:///C:/Users/rakel/OneDrive/Documentos/projetoIA/frontend/index.html
```

Ou use um servidor web local (Python, Live Server, etc.)

## 📝 Rotas da API

### GET /api/produtos
Retorna lista de todos os produtos

**Response:**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Notebook Dell",
      "descricao": "Notebook com processador Intel i5",
      "preco": 2500.00,
      "quantidade": 5,
      "data_criacao": "2025-02-08T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

### POST /api/produtos
Cadastra um novo produto

**Request:**
```json
{
  "nome": "Mouse Logitech",
  "descricao": "Mouse sem fio",
  "preco": 150.00,
  "quantidade": 20
}
```

**Response:**
```json
{
  "sucesso": true,
  "mensagem": "Produto cadastrado com sucesso",
  "id": 2
}
```

## 🎨 Páginas Frontend

1. **home (index.html)** - Página inicial com apresentação do sistema
2. **produtos.html** - Lista todos os produtos cadastrados
3. **cadastro.html** - Formulário para cadastrar novo produto
4. **sobre.html** - Informações sobre o sistema

## ⚙️ Variáveis de Ambiente (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=web_03mb
DB_PORT=3306
PORT=3001
```

## 🐛 Troubleshooting

### Erro: "Cannot GET /api/produtos"
- Verifique se o servidor backend está rodando em porta 3001
- Verifique se a configuração da API em `frontend/js/config.js` está correta

### Erro de conexão ao banco de dados
- Verifique se MySQL está rodando
- Verifique credenciais no arquivo `.env`
- Verifique se banco `web_03mb` e tabela `produtos` existem

### CORS error
- Verifique se o CORS está habilitado no backend (já está configurado)
- Verifique a porta e URL da API

## 📚 Informações Adicionais

- Backend API roda na porta **3001**
- Frontend pode ser acessado via arquivo local ou servidor web
- Banco de dados MySQL deve estar em execução
- Todos os campos são obrigatórios no cadastro

## 👨‍💻 Desenvolvedor

Sistema desenvolvido durante aula de desenvolvimento web MVC com banco de dados.

---

**Última atualização:** Fevereiro 2025
