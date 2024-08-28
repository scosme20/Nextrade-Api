import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Desative se quiser menos logs
    dialectOptions: {
      ssl: {
        require: true, // Exigido se o banco de dados necessitar de SSL
        rejectUnauthorized: false, // Aceita certificados autoassinados
      }
    }
  }
);

export default sequelize;






