import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function criarTabelaProdutos() {
    try {
        console.log('🔄 Conectando ao MySQL...\n');

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'web_03mb'
        });

        console.log('✅ Conectado ao MySQL\n');

        // Ler arquivo SQL
        const sqlPath = path.join(process.cwd(), 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Executar cada comando SQL
        const commands = sqlContent.split(';').filter(cmd => cmd.trim());
        
        for (const command of commands) {
            if (command.trim()) {
                console.log(`Executando: ${command.substring(0, 50)}...`);
                await connection.query(command);
            }
        }

        console.log('\n✅ Tabela produtos_rakely criada com sucesso!');
        console.log('✅ 3 produtos de exemplo inseridos!\n');

        // Verificar resultado
        const [tabelas] = await connection.query(
            "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'produtos_rakely'",
            [process.env.DB_NAME]
        );

        if (tabelas.length > 0) {
            console.log('✅ Verificação: Tabela existe!');
            
            const [produtos] = await connection.query('SELECT * FROM produtos_rakely');
            console.log(`✅ Produtos cadastrados: ${produtos.length}\n`);
            
            console.log('Produtos:');
            produtos.forEach(p => {
                const preco = typeof p.preco === 'number' ? p.preco.toFixed(2) : p.preco;
                console.log(`  [${p.id}] ${p.nome} - R$ ${preco}`);
            });
        }

        await connection.end();
        console.log('\n✅ Concluído com sucesso!');

    } catch (erro) {
        console.log('❌ ERRO:', erro.message);
        console.log('\nVerifique:');
        console.log('  1. MySQL está rodando?');
        console.log('  2. Host, user, password estão corretos no .env?');
        console.log('  3. Banco "web_03mb" existe?');
        console.log('  4. Arquivo database.sql existe?');
        process.exit(1);
    }
    process.exit(0);
}

criarTabelaProdutos();
