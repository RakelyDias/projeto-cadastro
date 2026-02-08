-- Criar tabela de produtos no banco web_03mb
CREATE TABLE IF NOT EXISTS produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (nome)
);

-- Inserir alguns produtos de exemplo
INSERT IGNORE INTO produtos (nome, descricao, preco, quantidade) VALUES
('Notebook Dell', 'Notebook com processador Intel i5', 2500.00, 5),
('Mouse Logitech', 'Mouse sem fio com bateria longa', 150.00, 20),
('Teclado Mecânico', 'Teclado RGB com cherry switches', 450.00, 10);
