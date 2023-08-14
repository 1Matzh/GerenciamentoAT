// Cria um array vazio para armazenar as turmas
const turmas = [];
// Define a média necessária para passar na escola
const mediaEscola = 6;

// Função para validar um email usando uma expressão regular
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar e formatar um nome
function validarNome(nome) {
  return nome.trim().replace(/\s+/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
  const partesData = dataNascimento.split("-");
  const data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
  const hoje = new Date();
  const diff = hoje - data;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

// Função para classificar um aluno
function classificarAluno(media) {
  if (media >= 9 && media <= 10) {
    return 'A';
  } else if (media >= 8 && media < 9) {
    return 'B';
  } else if (media >= 7 && media < 8) {
    return 'C';
  } else {
    return 'D';
  }
}

// Função para cadastrar uma turma
function cadastrarTurma(codigo, maximo) {
  if (codigo >= 1 && codigo <= 10 && maximo >= 5 && maximo <= 10) {
    const turmaExistente = turmas.find(turma => turma.codigo === codigo);
    if (!turmaExistente) {
      const turma = {
        codigo: codigo,
        maximo: maximo,
        alunos: []
      };
      turmas.push(turma);
      console.info('Turma cadastrada');
      return turma;
    }
  }
  throw new Error('Turma já cadastrada');
}

// Função para cadastrar um aluno
function cadastrarAluno(nome, sobrenome, email, turma, nascimento, notas, ativo = true) {
  if (
    calcularIdade(nascimento) < 16 ||
    !validarEmail(email) ||
    !nome.trim() ||
    !sobrenome.trim() ||
    /\d/.test(nome) ||
    /\d/.test(sobrenome) ||
    notas.some(nota => nota < 0 || nota > 10)
  ) {
    throw new Error('Dados do aluno inválidos');
  }

  const nomeValidado = nome.trim();
  const sobrenomeValidado = sobrenome.trim();
  const turmaEncontrada = turmas.find(t => t.codigo === turma);

  if (nome !== nomeValidado || !turmaEncontrada || turmaEncontrada.alunos.length >= turmaEncontrada.maximo) {
    throw new Error('Aluno ou turma inválidos');
  }

  const alunoExistente = turmaEncontrada.alunos.find(aluno => aluno.email === email);

  if (!alunoExistente) {
    const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
    const classificacao = classificarAluno(media);

    if (
      turmaEncontrada.alunos.length === 0 ||
      (classificacao === 'A' || classificacao === 'B') && turmaEncontrada.alunos.every(aluno => aluno.classificacao === 'A' || aluno.classificacao === 'B') ||
      (classificacao === 'C' || classificacao === 'D') && turmaEncontrada.alunos.every(aluno => aluno.classificacao === 'C' || aluno.classificacao === 'D')
    ) {
      const aluno = {
        nome: nomeValidado,
        sobrenome: sobrenomeValidado,
        email: email,
        turma: turma,
        nascimento: nascimento,
        notas: notas,
        classificacao: classificacao,
        ativo: ativo
      };

      turmaEncontrada.alunos.push(aluno);
      console.info('Aluno cadastrado');
      return aluno;
    } 
    throw new Error('Dados inválidos');
  }

  throw new Error('Aluno já cadastrado');
}

// Função para remover um aluno pelo email
function removerAluno(email) {
  for (const turma of turmas) {
    const index = turma.alunos.findIndex(aluno => aluno.email === email);
    if (index !== -1) {
      turma.alunos.splice(index, 1);
      console.info('Aluno removido');
      return true;
    }
  }
  throw new Error('Aluno não encontrado');
}

// Função para atualizar os dados de um aluno
function atualizarAluno(email, novosDados) {
  for (const turma of turmas) {
    const aluno = turma.alunos.find(aluno => aluno.email === email);
    if (aluno) {
      Object.assign(aluno, novosDados);
      console.info('Aluno atualizado');
      return aluno;
    }
  }
  throw new Error('Aluno não encontrado');
}

// Função para buscar um aluno pelo email
function buscarAluno(email) {
  for (const turma of turmas) {
    const aluno = turma.alunos.find(aluno => aluno.email === email);
    if (aluno) {
      return aluno;
    }
  }
  throw new Error('Aluno não encontrado');
}

// Função para listar todos os alunos
function listarAlunos() {
  const alunos = [];
  for (const turma of turmas) {
    alunos.push(...turma.alunos);
  }
  return alunos;
}

// Função para obter a quantidade de turmas
function quantidadeTurmas() {
  return turmas.length;
}

// Função para calcular a média de um aluno pelo email
function calcularMediaAluno(email) {
  const aluno = buscarAluno(email);
  if (aluno) {
    const somaNotas = aluno.notas.reduce((total, nota) => total + nota, 0);
    return somaNotas / aluno.notas.length;
  }
  throw new Error('Aluno não encontrado');
}

// Função para desativar um aluno pelo email
function desativarAluno(email) {
  const aluno = buscarAluno(email);
  if (aluno) {
    aluno.ativo = false;
    console.info('Aluno desativado');
    return true;
  }
  console.info('Aluno não encontrado');
  return false;
}

// Função para listar alunos ativos
function listarAlunosAtivos() {
  return listarAlunos().filter(aluno => aluno.ativo);
}

// Função para listar alunos inativos
function listarAlunosInativos() {
  return listarAlunos().filter(aluno => !aluno.ativo);
}

// Função para listar alunos com média esperada
function listarAlunosMediaEsperada() {
  return listarAlunos().filter(aluno => calcularMediaAluno(aluno.email) >= mediaEscola);
}

// Função para gerar um relatório completo com diversas informações sobre os alunos
function relatorioCompleto() {
  const alunosAtivos = listarAlunosAtivos();
  const alunosInativos = listarAlunosInativos();
  const alunosAcimaMedia = listarAlunosMediaEsperada(mediaEscola);
  const alunosAbaixoMedia = alunosAtivos.filter(aluno => !alunosAcimaMedia.includes(aluno));

  return {
    quantidadeAlunos: alunosAtivos.length + alunosInativos.length,
    quantidadeTurmas: turmas.length,
    alunosAcimaMedia: alunosAcimaMedia,
    alunosAbaixoMedia: alunosAbaixoMedia,
    alunosMediaCalculada: alunosAtivos.map(aluno => ({ ...aluno, media: calcularMediaAluno(aluno.email) }))
  };
}
