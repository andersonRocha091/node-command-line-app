#!/usr/bin/env node
const commander = require("commander");

const Database = require("./src/database");
const Heroi = require("./src/heroi");

async function main() {
  commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "Listar heroi(s)")
    .option("-r, --remover [value]", "Remover um heroi pelo id")
    .option("-i, --id [value]", "Id do Heroi")
    .option("-a, --atualizar [value]", "Atualiza um Heroi por id")
    .parse(process.argv);
  const heroi = new Heroi(commander);

  try {
    if (commander.cadastrar) {
      const resultado = await Database.cadastrarHeroi(heroi);
      if (!resultado) {
        console.error("Heroi não foi cadastrado");
        return;
      }
      console.log(`Heroi ${heroi.nome} Cadastrado com sucesso`);
    }
    if (commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
      return;
    }
    if (commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Não foi possível remover o heroi");
        return;
      }
      console.log("Heroi removido com sucesso!");
    }
    if (commander.atualizar) {
      const idParaAtualizar = parseInt(commander.atualizar);
      delete heroi.id;
      //remover todas as chaves null ou undefined
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );

      if (!resultado) {
        console.error("Não foi possivel atualizar o herói");
        return;
      }
      console.log("Heroi atualizado com sucesso");
    }
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
