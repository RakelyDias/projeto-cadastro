import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do pool de conexões MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota para listar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [produtos] = await connection.query(
      'SELECT id, nome, descricao, preco, quantidade FROM produtos_rakely ORDER BY id DESC'
    );
    connection.release();
    
    res.json({
      sucesso: true,
      dados: produtos,
      total: produtos.length
    });
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar produtos',
      erro: erro.message
    });
  }
});

// Rota para cadastrar novo produto
app.post('/api/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade } = req.body;

    // Validação básica
    if (!nome || !descricao || !preco || !quantidade) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    if (isNaN(preco) || isNaN(quantidade) || preco < 0 || quantidade < 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preço e quantidade devem ser números válidos'
      });
    }

    const connection = await pool.getConnection();
    const [resultado] = await connection.query(
      'INSERT INTO produtos_rakely (nome, descricao, preco, quantidade, data_criacao) VALUES (?, ?, ?, ?, NOW())',
      [nome, descricao, parseFloat(preco), parseInt(quantidade)]
    );
    connection.release();

    res.status(201).json({
      sucesso: true,
      mensagem: 'Produto cadastrado com sucesso',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao cadastrar produto:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar produto',
      erro: erro.message
    });
  }
});

// Rota para buscar um produto específico
app.get('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID do produto inválido'
      });
    }

    const connection = await pool.getConnection();
    const [produtos] = await connection.query(
      'SELECT id, nome, descricao, preco, quantidade FROM produtos_rakely WHERE id = ?',
      [parseInt(id)]
    );
    connection.release();

    if (produtos.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    res.json({
      sucesso: true,
      dados: produtos[0]
    });
  } catch (erro) {
    console.error('Erro ao buscar produto:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar produto',
      erro: erro.message
    });
  }
});

// Rota para atualizar um produto (PUT)
app.put('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade } = req.body;

    // Validação básica
    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID do produto inválido'
      });
    }

    if (!nome || !descricao || !preco || !quantidade) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    if (isNaN(preco) || isNaN(quantidade) || preco < 0 || quantidade < 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preço e quantidade devem ser números válidos'
      });
    }

    const connection = await pool.getConnection();
    const [resultado] = await connection.query(
      'UPDATE produtos_rakely SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ?',
      [nome, descricao, parseFloat(preco), parseInt(quantidade), parseInt(id)]
    );
    connection.release();

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Produto atualizado com sucesso'
    });
  } catch (erro) {
    console.error('Erro ao atualizar produto:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar produto',
      erro: erro.message
    });
  }
});

// Rota para deletar um produto
app.delete('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID do produto inválido'
      });
    }

    const connection = await pool.getConnection();
    const [resultado] = await connection.query(
      'DELETE FROM produtos_rakely WHERE id = ?',
      [parseInt(id)]
    );
    connection.release();

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Produto deletado com sucesso'
    });
  } catch (erro) {
    console.error('Erro ao deletar produto:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao deletar produto',
      erro: erro.message
    });
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'Servidor rodando' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
