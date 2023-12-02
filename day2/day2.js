// Will I just be parsing *everything* through a txt file? who knows!
const fs = require('fs');

// Declaring constants to use
const puzzles = readPuzzlesFromFile('./input.txt');
const games = puzzles.map(parseGameLine);

const part1 = calculatePart1(games);
const part2 = calculatePart2(games);

// get all of the games from the input.txt
function readPuzzlesFromFile(filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n');
}

// Splitting them up. (divorce babe, divorce)
function parseGameLine(line) {
  return line.split(':', 2)[1].split(';').map(g => g.split(','));
}

// Determining whether the game is possible to win or not
function isPossible(cube) {
  const num = parseInt(cube);
  const colorLimits = { red: 12, green: 13, blue: 14 };

  return Object.entries(colorLimits).some(([color, limit]) => cube.endsWith(` ${color}`) && num <= limit);
}


// Part 1 answer, adding the sums of the game ids of winning games
function calculatePart1(games) {
  return games.reduce((sum, game, index) => sum + (game.every(set => set.every(isPossible)) ? index + 1 : 0), 0);
}

// Part 2 answer, similar to the first part but now with more Math.
function calculatePart2(games) {
  return games.reduce((sum, game) => {
    return sum + [' red', ' green', ' blue'].reduce((product, color) => {
      return product * Math.max(...game.flat().map(g => g.trim().endsWith(color) ? parseInt(g, 10) : 0));
    }, 1);
  }, 0);
}

// Logs the results and numbers!
console.log(part1, part2);