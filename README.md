
# Gerenciar Turmas e Alunos (JS)

Esse projeto tem como objetivo o gerenciamento de turmas e de alunos, feito em uma semana como projeto final do módulo que estou atualmente "Lógica de Programação (JS)" pela Ada Tech. O foco principal é JavaScript, a interface que fiz é apenas um guia simples dos comandos e possivelmente tem bugs pois não é o foco do projeto.


## Funcionalidades

- As funcionalidades obrigatórias e opcionais realizadas se encontram no "guide.md".

### Funcionalidade Extra

- Alunos cadastrados com media **entre 9 e 10** serão classificados como A.

- Alunos cadastrados com media **entre 8 e 9** serão classificados como B.

- Alunos cadastrados com media **entre 7 e 8** serão classificados como C.

- Alunos cadastrados com media **menor que 7** serão classificados como D.

## Uso/Exemplos
Essas informações também se encontram na própria interface.

Segue abaixo, como usar cada comando:

```javascript
[TURMAS]

▸ Cadastrar Turma
cadastrarTurma(código, máximo de alunos);

▸ Quantidade de Turmas
console.log(quantidadeTurmas());
```

```javascript
[ALUNOS]

▸ Cadastrar Aluno(a)
cadastrarAluno("nome", "sobrenome", "email", código da turma, "data de nascimento (01-01-0001)", [10, 9,8 ,7 (notas) ]);

▸ Remover Aluno(a)
removerAluno("email");

▸ Atualizar dados do Aluno(a)
atualizarAluno("email", (dados novos) { nome: "Matheus", notas: [9, 9, 10, 10] });

▸ Buscar Aluno(a)
console.log(buscarAluno("email"));

▸ Listar todos os Aluno(a)s
console.log(listarAlunos());

▸ Calcular média de um Aluno(a)
console.log(calcularMediaAluno("email"));

▸ Desativar um Aluno(a)
desativarAluno("email");

▸ Listar Aluno(a)s ativos
console.log(listarAlunosAtivos());

▸ Listar Aluno(a)s inativos (desativados)
console.log(listarAlunosInativos());

▸ Listar Aluno(a)s acima da média
console.log(listarAlunosMediaEsperada());
```

```javascript
[OUTROS]

▸ Gerar relatório completo
console.log(relatorioCompleto());

▸ Listar Aluno(a)s por Classificação
console.log(listarAlunosClassificacao('valor'));
```





## Possíveis melhorias

Esse projeto é facilmente melhorável, existe várias validações que podem ser acrescentadas ao código. Além disso, todas as funcionalidades estão separadas em funções para uma maior compreensão e facilidade de adição de novas funcionalidades no código.


## Autor

- [@1Matzh](https://github.com/1Matzh) (Matheus Benasse)

