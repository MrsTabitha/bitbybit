const bcrypt = require('bcryptjs');

describe('Lógica de autenticação com bcrypt', () => {
  const senhaOriginal = '123456';
  let senhaCriptografada;

  test('Hash da senha deve ser diferente da senha original', async () => {
    senhaCriptografada = await bcrypt.hash(senhaOriginal, 10);
    expect(senhaCriptografada).not.toBe(senhaOriginal);
  });

  test('Senha correta deve passar na comparação', async () => {
    const resultado = await bcrypt.compare(senhaOriginal, senhaCriptografada);
    expect(resultado).toBe(true);
  });

  test('Senha incorreta deve falhar na comparação', async () => {
    const resultado = await bcrypt.compare('senha-errada', senhaCriptografada);
    expect(resultado).toBe(false);
  });
});
