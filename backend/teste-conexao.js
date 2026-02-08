import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testarConexao() {
    try {
        console.log('🔄 Testando conexão com MySQL...\n');
        console.log('Configurações:');
        console.log(`  Host: ${process.env.DB_HOST}`);
        console.log(`  User: ${process.env.DB_USER}`);
        console.log(`  Database: ${process.env.DB_NAME}`);
        console.log(`  Port: ${process.env.DB_PORT}\n`);

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Conexão com MySQL: OK\n');

        // Testar se tabela existe
        const [tabelas] = await connection.query(
            "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'produtos_rakely'",
            [process.env.DB_NAME]
        );

        if (tabelas.length > 0) {
            console.log('✅ Tabela "produtos_rakely" existe no banco\n');

            // Contar produtos
            const [resultado] = await connection.query('SELECT COUNT(*) as total FROM produtos_rakely');
            console.log(`✅ Total de produtos: ${resultado[0].total}\n`);

            // Listar produtos
            const [produtos] = await connection.query('SELECT id, nome, preco FROM produtos_rakely');
            console.log('Produtos cadastrados:');
            produtos.forEach(p => {
                console.log(`  [${p.id}] ${p.nome} - R$ ${p.preco}`);
            });
        } else {
            console.log('❌ Tabela "produtos_rakely" NÃO existe no banco');
            console.log('   Execute o SQL de backend/database.sql primeiro!\n');
        }

        await connection.end();
        console.log('\n✅ Teste concluído!');

    } catch (erro) {
        console.log('❌ ERRO:', erro.message);
        console.log('\nVerifique:');
        console.log('  1. MySQL está rodando?');
        console.log('  2. Credenciais no .env estão corretas?');
        console.log('  3. Banco "web_03mb" foi criado?');
        console.log('  4. Tabela "produtos" foi criada (execute database.sql)?');
    }
    process.exit(0);
}

testarConexao();
