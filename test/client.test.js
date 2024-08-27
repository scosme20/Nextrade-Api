import { beforeAll, afterAll, test, expect } from '@jest/globals';
import sequelize from '../Config/Database/Database.js';
import Client from '../src/Modules/client/clientModel.js';
import { registerUser, loginUser } from '../src/core/Services/AuthService.js';

beforeAll(async () => {
  try {
    console.log('Iniciando a sincronização do banco de dados...');
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error.message);
  }
});

afterAll(async () => {
  try {
    console.log('Limpando o banco de dados...');
    await sequelize.drop();
    console.log('Banco de dados limpo com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error.message);
  }

  try {
    console.log('Fechando a conexão com o banco de dados...');
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada com sucesso.');
  } catch (error) {
    console.error('Erro ao fechar a conexão com o banco de dados:', error.message);
  }
});

test('should create a new client', async () => {
  const newClientData = {
    email: 'test@example.com',
    password: 'password123',
    cpf: '12345678900',
  };

  const req = { body: newClientData };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  await registerUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});







