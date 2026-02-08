# 🚀 Guia de Execução - Sistema de Cadastro de Produtos

## ⚠️ PRÉ-REQUISITOS

1. **Node.js** - Instale de: https://nodejs.org/
2. **MySQL** - Instale de: https://www.mysql.com/downloads/
3. **Git** - Para clonar o repositório

## 📋 PASSO A PASSO

### 1️⃣ Preparar o Banco de Dados

**Opção A: Usando MySQL Workbench ou phpMyAdmin**
- Abra o cliente MySQL
- Crie um banco de dados chamado `web_03mb`
- Execute o script SQL (copie o conteúdo de `backend/database.sql`)
- Estrutura da tabela será criada automaticamente

**Opção B: Usando terminal MySQL**
```bash
mysql -u root -p

# Digite a senha (ou deixe em branco se não houver)

# Execute:
CREATE DATABASE IF NOT EXISTS web_03mb;
USE web_03mb;

# Copie e cole o conteúdo de backend/database.sql aqui
```

**SQL para copiar:**
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

INSERT IGNORE INTO produtos (nome, descricao, preco, quantidade) VALUES
('Notebook Dell', 'Notebook com processador Intel i5', 2500.00, 5),
('Mouse Logitech', 'Mouse sem fio com bateria longa', 150.00, 20),
('Teclado Mecânico', 'Teclado RGB com cherry switches', 450.00, 10);
```

### 2️⃣ Configurar Credenciais do Banco de Dados

Edite o arquivo `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=web_03mb
DB_PORT=3306
PORT=3001
```

### 3️⃣ Iniciar o Servidor Backend

```bash
# Abra PowerShell ou CMD
cd backend

# Se ainda não instalou as dependências:
npm install

# Inicie o servidor:
npm start
```

✅ Você verá: `Servidor rodando na porta 3001`

### 4️⃣ Abrir o Frontend

**Opção A: Abrir arquivo localmente**
- Abra `frontend/index.html` direto no navegador

**Opção B: Usar Live Server (recomendado)**
- No VS Code, instale a extensão "Live Server"
- Clique com botão direito em `frontend/index.html`
- Selecione "Open with Live Server"

**Opção C: Python SimpleHTTPServer**
```bash
cd frontend
python -m http.server 5000
# Abra: http://localhost:5000
```

## ✅ Testes de Funcionamento

### 1. Testar API (GET)
Abra no navegador:
```
http://localhost:3001/api/produtos
```
Deve retornar JSON com produtos

### 2. Testar Listagem
Abra a página:
```
http://localhost:3001/frontend/produtos.html
```
Ou acesse via Live Server

### 3. Testar Cadastro
1. Abra `cadastro.html`
2. Preencha o formulário
3. Clique em "Cadastrar Produto"
4. Você será redirecionado para a lista
5. O novo produto deve aparecer

## ⚙️ Estrutura de Pastas

```
projetoIA/
├── backend/
│   ├── server.js          ← Servidor Principal
│   ├── package.json       ← Dependências
│   ├── .env               ← Configurações (EDITAR)
│   ├── database.sql       ← Script SQL
│   └── node_modules/      ← Instalado com npm install
│
├── frontend/
│   ├── index.html         ← Página inicial
│   ├── produtos.html      ← Lista de produtos
│   ├── cadastro.html      ← Formulário
│   ├── sobre.html         ← Sobre o projeto
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── config.js
│       ├── produtos.js
│       └── cadastro.js
│
├── README.md
├── INSTALACAO.md          ← Este arquivo
└── .gitignore
```

## 🔧 Troubleshooting

### Erro: "Cannot connect to database"
- ✅ MySQL está rodando?
- ✅ Credenciais do .env estão corretas?
- ✅ Banco de dados `web_03mb` foi criado?
- ✅ Tabela `produtos` existe no banco?

### Erro: "Module not found: express"
```bash
cd backend
npm install
```

### Erro: CORS em localhost
- Verifique se o CORS está habilitado no backend (já está)
- Certifique-se que frontend e backend têm URLs corretas

### Frontend não carrega os produtos
- ✅ Backend está rodando em http://localhost:3001?
- ✅ API URL em `js/config.js` está correta?
- ✅ Abra console (F12) e veja os erros

## 📶 Portas Utilizadas

- **Backend:** http://localhost:3001
- **Frontend (Live Server):** http://localhost:5500
- **MySQL:** localhost:3306

## 🚀 Para Produção

1. Gere um build otimizado do frontend
2. Configure variáveis de ambiente seguras
3. Use HTTPS
4. Configure CORS apenas para domínios permitidos
5. Use um gerenciador de processos como PM2 para o backend

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as portas estão disponíveis
2. Veja os logs do console do browser (F12)
3. Veja os logs do servidor no terminal
4. Verifique as credenciais MySQL

---

**Última atualização:** Fevereiro 2025
