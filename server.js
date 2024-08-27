import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/Database/Database.js';
import authRoutes from './src/Routes/Auth/authRoutes.js';
import catalogRoutes from './src/Routes/catalogue/catalogueRoutes.js';
import productRoutes from './src/Routes/product/productRoutes.js';
import orderRoutes from './src/Routes/order/order.js';
import demandRoutes from './src/Routes/Demand/demmandRoutes.js';
import swaggerSetup from './Config/swagger/swagger.js'; // Importa o arquivo de configuração do Swagger

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/', catalogRoutes);
app.use('/api/', productRoutes);
app.use('/api/', orderRoutes);
app.use('/api/', demandRoutes); // Certifique-se de que a rota demand está correta

// Configuração do Swagger
swaggerSetup(app);

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









