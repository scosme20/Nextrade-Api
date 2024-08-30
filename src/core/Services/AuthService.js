import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../../Modules/client/clientModel.js';
import Seller from '../../Modules/sellers/sellerModel.js';
import Supplier from '../../Modules/supplier/supplierModel.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in .env file');
}

export const register = async (userData) => {
  const { email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user;
    switch (role) {
      case 'supplier':
        user = await Supplier.create({ ...userData, password: hashedPassword });
        break;
      case 'seller':
        user = await Seller.create({ ...userData, password: hashedPassword });
        break;
      case 'client':
        user = await Client.create({ ...userData, password: hashedPassword });
        break;
      default:
        throw new Error('Invalid role');
    }
    const token = jwt.sign({ id: user.id, role }, secretKey, { expiresIn: '1h' });

    return { token, user };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const login = async (email, password, role, identifier) => {
  let user;
  try {
    switch (role) {
      case 'supplier':
        user = await Supplier.findOne({ where: { email, cnpj: identifier } });
        break;
      case 'seller':
        user = await Seller.findOne({ where: { email, registrationNumber: identifier } });
        break;
      case 'client':
        user = await Client.findOne({ where: { email, cpf: identifier } });
        break;
      default:
        throw new Error('Invalid role');
    }

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role }, secretKey, { expiresIn: '1h' });

      return { token, user };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const getUserByRole = async (id, role) => {
  try {
    switch (role) {
      case 'supplier':
        return await Supplier.findByPk(id);
      case 'seller':
        return await Seller.findByPk(id);
      case 'client':
        return await Client.findByPk(id);
      default:
        throw new Error('Invalid role');
    }
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};
