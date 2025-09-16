const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luige",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 4,
  pontos: 0,
};

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const r = Math.random();
  if (r < 0.33) return "Reta";
  if (r < 0.66) return "Curva";
  return "Confronto";
}

function logRollResults(player, atributoNome, diceResult, atributoValor) {
  console.log(
    `${player.nome} rolou ${atributoNome}: ${diceResult} + ${atributoValor} = ${diceResult + atributoValor}`
  );
}

async function playerRaceEngine(caracter1, caracter2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n-- Rodada ${round} --\n`);

    const block = getRandomBlock();
    console.log(`Bloco sorteado: ${block}\n`);

    const diceresult1 = rollDice();
    const diceresult2 = rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "Reta") {
      total1 = caracter1.velocidade + diceresult1;
      total2 = caracter2.velocidade + diceresult2;

      logRollResults(caracter1, "velocidade", diceresult1, caracter1.velocidade);
      logRollResults(caracter2, "velocidade", diceresult2, caracter2.velocidade);
    } else if (block === "Curva") {
      total1 = caracter1.manobrabilidade + diceresult1;
      total2 = caracter2.manobrabilidade + diceresult2;

      logRollResults(caracter1, "manobrabilidade", diceresult1, caracter1.manobrabilidade);
      logRollResults(caracter2, "manobrabilidade", diceresult2, caracter2.manobrabilidade);
    } else if (block === "Confronto") {
      const power1 = diceresult1 + caracter1.poder;
      const power2 = diceresult2 + caracter2.poder;

      logRollResults(caracter1, "poder", diceresult1, caracter1.poder);
      logRollResults(caracter2, "poder", diceresult2, caracter2.poder);

      if (power1 > power2) {
        console.log(`${caracter1.nome} venceu o confronto!`);
        caracter1.pontos++;
      } else if (power2 > power1) {
        console.log(`${caracter2.nome} venceu o confronto!`);
        caracter2.pontos++;
      } else {
        console.log("Confronto empatado!");
      }
      // Não pontua novamente fora deste bloco para 'Confronto'
      continue;
    }

    // pontuação padrão (Reta/Curva)
    if (total1 > total2) {
      caracter1.pontos++;
      console.log(`${caracter1.nome} venceu a rodada!`);
    } else if (total2 > total1) {
      caracter2.pontos++;
      console.log(`${caracter2.nome} venceu a rodada!`);
    } else if (block !== "Confronto") {
      console.log("Rodada empatada!");
    }

    console.log(`Placar atual: ${caracter1.nome} ${caracter1.pontos} x ${caracter2.pontos} ${caracter2.nome}`);
  }

  // Resultado final
  console.log("\n----- Resultado Final -----");
  console.log(`${player1.nome}: ${player1.pontos}`);
  console.log(`${player2.nome}: ${player2.pontos}`);

  if (player1.pontos > player2.pontos) {
    console.log(`${player1.nome} é o vencedor!`);
  } else if (player2.pontos > player1.pontos) {
    console.log(`${player2.nome} é o vencedor!`);
  } else {
    console.log("A corrida terminou empatada!");
  }
}

(async function main() {
  console.log(`Corrida entre ${player1.nome} e ${player2.nome} começou...\n`);
  await playerRaceEngine(player1, player2);
})();
