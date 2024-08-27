import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../../Modules/client/clientModel.js';
import Seller from '../../Modules/sellers/sellerModel.js';
import Supplier from '../../Modules/supplier/supplierModel.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const register = async (userData) => {
  const { email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  switch(role) {
    case 'supplier':
      return Supplier.create({ ...userData, password: hashedPassword });
    case 'seller':
      return Seller.create({ ...userData, password: hashedPassword });
    case 'client':
      return Client.create({ ...userData, password: hashedPassword });
    default:
      throw new Error('Invalid role');
  }
};

export const login = async (email, password, role, identifier) => {
  let user;
  switch(role) {
    case 'supplier':
      user = await Supplier.findOne({ where: { email, cnpj: identifier } });
      break;
    case 'seller':
      user = await Seller.findOne({ where: { email, registrationNumber: identifier } });
      break;
    case 'client':
      user = await Client.findOne({ where: { email, cpf: identifier } });
      break;
  }

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, role }, secretKey, { expiresIn: '1h' });
    return { token, user };
  }
  throw new Error('Invalid credentials');
};

export const getUserByRole = async (id, role) => {
  switch(role) {
    case 'supplier':
      return Supplier.findByPk(id);
    case 'seller':
      return Seller.findByPk(id);
    case 'client':
      return Client.findByPk(id);
    default:
      return null;
  }
};
