import app from './app.js';
import dotenv from 'dotenv';
import sequelize from './Config/Database/Database.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

console.log('Configurações do Banco de Dados:');
console.log(`- Host: ${sequelize.config.host}`);
console.log(`- Porta: ${sequelize.config.port}`);
console.log(`- Banco de Dados: ${sequelize.config.database}`);
console.log(`- Usuário: ${sequelize.config.username}`);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Falha ao conectar ao banco de dados:', err);
  });










