require('dotenv').config();
const knex = require('../db'); // seu arquivo que exporta a conexão knex

describe('Testes de conexão com o banco de dados (Knex)', () => {
  test('Deve conectar ao banco e retornar lista de usuários (se existir)', async () => {
    const users = await knex('users').select('*');
    expect(Array.isArray(users)).toBe(true);
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
