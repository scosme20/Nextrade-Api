import request from 'supertest';
import app from '../app.js';

describe('Product API', () => {
  let productId;

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Produto Teste',
        description: 'Descrição do Produto Teste',
        price: 49.99,
        stock: 15,
        supplierId: 1,
        sellerId: 1
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    productId = response.body.id;
  });

  it('should get all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a product by ID', async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', productId);
  });

  it('should update a product', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Produto Atualizado',
        description: 'Descrição Atualizada',
        price: 59.99,
        stock: 10
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Produto Atualizado');
  });

  it('should delete a product', async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(204);
  });
});

