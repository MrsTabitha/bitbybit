require('dotenv').config();

describe('Variáveis de ambiente (.env)', () => {
  test('DB_HOST está definida', () => {
    expect(process.env.DB_HOST).toBeDefined();
  });

  test('DB_USER está definida', () => {
    expect(process.env.DB_USER).toBeDefined();
  });

  test('DB_PASSWORD está definida', () => {
    expect(process.env.DB_PASSWORD).toBeDefined();
  });

  test('DB_NAME está definida', () => {
    expect(process.env.DB_NAME).toBeDefined();
  });

  test('GEMINI_API_KEY está definida', () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
  });
});
