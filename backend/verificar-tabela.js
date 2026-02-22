import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function listarTabelas() {
    try {
        console.log('🔄 Conectando ao MySQL benseverplex...\n');

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log(`✅ Conectado a ${process.env.DB_HOST}\n`);
        console.log(`📊 Banco de dados: ${process.env.DB_NAME}\n`);

        // Listar todas as tabelas
        const [tabelas] = await connection.query(
            "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?",
            [process.env.DB_NAME]
        );

        console.log(`Total de tabelas: ${tabelas.length}\n`);
        console.log('Tabelas encontradas:');
        tabelas.forEach(t => {
            console.log(`  - ${t.TABLE_NAME}`);
        });

        // Verificar especificamente produtos_rakely
        console.log('\n---\n');
        const [produtosRakely] = await connection.query(
            "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'produtos_rakely'",
            [process.env.DB_NAME]
        );

        if (produtosRakely.length > 0) {
            console.log('✅ Tabela produtos_rakely EXISTE!\n');
            
            const [produtos] = await connection.query('SELECT COUNT(*) as total FROM produtos_rakely');
            console.log(`Total de registros: ${produtos[0].total}`);
        } else {
            console.log('❌ Tabela produtos_rakely NÃO foi encontrada no banco!');
            console.log('Será criada agora...\n');
            
            // Criar tabela
            const sqlCreate = `
                CREATE TABLE IF NOT EXISTS produtos_rakely (
                  id INT PRIMARY KEY AUTO_INCREMENT,
                  nome VARCHAR(100) NOT NULL,
                  descricao TEXT NOT NULL,
                  preco DECIMAL(10, 2) NOT NULL,
                  quantidade INT NOT NULL,
                  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  UNIQUE KEY (nome)
                );
            `;
            
            await connection.query(sqlCreate);
            console.log('✅ Tabela produtos_rakely CRIADA!\n');
            
            // Inserir dados
            const sqlInsert = `
                INSERT IGNORE INTO produtos_rakely (nome, descricao, preco, quantidade) VALUES
                ('Notebook Dell', 'Notebook com processador Intel i5', 2500.00, 5),
                ('Mouse Logitech', 'Mouse sem fio com bateria longa', 150.00, 20),
                ('Teclado Mecânico', 'Teclado RGB com cherry switches', 450.00, 10);
            `;
            
            await connection.query(sqlInsert);
            console.log('✅ 3 produtos inseridos!\n');
        }

        await connection.end();

    } catch (erro) {
        console.log('❌ ERRO:', erro.message);
        console.log('\nVerifique:');
        console.log('  1. As credenciais no .env estão corretas?');
        console.log(`  2. Host: ${process.env.DB_HOST}`);
        console.log(`  3. User: ${process.env.DB_USER}`);
        console.log(`  4. Database: ${process.env.DB_NAME}`);
        process.exit(1);
    }
}

listarTabelas();
