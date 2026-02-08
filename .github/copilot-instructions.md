# Sistema de Cadastro de Produtos

## 🎯 Visão Geral do Projeto

Sistema completo e funcional para cadastro e gerenciamento de produtos com frontend HTML/CSS/JavaScript e backend Node.js/Express.

## ✅ Status Geral

- [x] Verificação do arquivo copilot-instructions.md
- [x] Requisitos do projeto esclarecidos
- [x] Projeto estruturado (frontend + backend)
- [x] Frontend customizado com 3 páginas
- [x] Backend com 2 rotas API
- [x] Banco de dados SQL configurado
- [x] Dependências instaladas
- [x] Tudo funcionando

## 📦 O que foi criado

### Frontend (3 páginas)
1. **index.html** - Página inicial com apresentação
2. **produtos.html** - Lista de produtos
3. **cadastro.html** - Formulário para cadastrar
4. **sobre.html** - Informações sobre o projeto

### Backend (2 rotas)
- `GET /api/produtos` - Retorna lista de produtos
- `POST /api/produtos` - Cadastra novo produto

### Banco de Dados
- Tabela `produtos` no banco `web_03mb`
- Campos: id, nome, descricao, preco, quantidade, data_criacao

## 🚀 Como Executar

### 1. Criar Banco de Dados
```sql
CREATE DATABASE web_03mb;
USE web_03mb;

CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (nome)
);
```

### 2. Iniciar Backend
```bash
cd backend
npm install  # Se ainda não instalou
npm start
```

O servidor rodará em `http://localhost:3001`

### 3. Abrir Frontend
- Use Live Server extension no VS Code, ou
- Abra `frontend/index.html` no navegador

## 📋 Verificação de Funcionamento

1. ✅ **GET /api/produtos** - Testa listagem
   - Abra: http://localhost:3001/api/produtos

2. ✅ **POST /api/produtos** - Testa cadastro
   - Use a página de cadastro no frontend

3. ✅ **CORS ativado** - Comunicação frontend-backend funcionando

## 📁 Estrutura Final

```
projetoIA/
├── frontend/           # Páginas HTML, CSS, JS
│   ├── index.html
│   ├── produtos.html
│   ├── cadastro.html
│   ├── sobre.html
│   ├── css/style.css
│   └── js/
├── backend/            # Servidor Node.js/Express
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── database.sql
│   └── node_modules/
├── README.md           # Documentação completa
├── INSTALACAO.md       # Guia de execução
└── .gitignore
```

## 🔗 GitHub

Para enviar para GitHub:

```bash
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git branch -M main
git push -u origin main
```

Todos os arquivos já estão versionados e prontos para push!

## 📝 Arquivos Importantes

- [README.md](README.md) - Documentação completa
- [INSTALACAO.md](INSTALACAO.md) - Guia passo a passo
- [backend/database.sql](backend/database.sql) - Script SQL
- [backend/.env](backend/.env) - Configurações (EDITAR COM SUAS CREDENCIAIS)
