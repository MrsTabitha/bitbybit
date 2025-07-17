function validarCadastro({ username, email, password }) {
  if (!username || !email || !password) {
    return false;
  }
  if (!email.includes('@') || !email.includes('.')) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  return true;
}

describe('Validação de campos de cadastro', () => {
  test('Cadastro válido deve ser aceito', () => {
    const resultado = validarCadastro({
      username: 'talita',
      email: 'talita@email.com',
      password: '123456'
    });
    expect(resultado).toBe(true);
  });

  test('Cadastro sem username deve ser rejeitado', () => {
    const resultado = validarCadastro({
      username: '',
      email: 'teste@email.com',
      password: '123456'
    });
    expect(resultado).toBe(false);
  });

  test('Email inválido deve ser rejeitado', () => {
    const resultado = validarCadastro({
      username: 'fulano',
      email: 'emailsemarroba.com',
      password: '123456'
    });
    expect(resultado).toBe(false);
  });

  test('Senha muito curta deve ser rejeitada', () => {
    const resultado = validarCadastro({
      username: 'fulano',
      email: 'teste@teste.com',
      password: '123'
    });
    expect(resultado).toBe(false);
  });
});
