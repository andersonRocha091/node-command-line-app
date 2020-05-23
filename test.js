const { deepEqual, ok } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRADO = { nome: "flash", poder: "speed", id: 1 };

describe("Suite de manipulacao de Herois", () => {
  before(async () => {
    await database.escreverArquivo([]);
    await database.cadastrarHeroi(DEFAULT_ITEM_CADASTRADO);
    await database.cadastrarHeroi(DEFAULT_ITEM_ATUALIZAR);
  });

  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRADO;
    const [resultado] = await database.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it("deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRADO;
    const resultado = await database.cadastrarHeroi(DEFAULT_ITEM_CADASTRADO);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRADO.id);
    deepEqual(actual, expected);
  });

  it("deve remover um heroi por id", async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id);
    deepEqual(resultado, expected);
  });
  const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Laterna Verde",
    poder: "Energia do Anel",
    id: 2,
  };

  it("deve atualizar um heroi pelo id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro",
    };

    const novoDado = {
      nome: "Batman",
      poder: "Dinheiro",
    };

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(resultado, expected);
  });
});
