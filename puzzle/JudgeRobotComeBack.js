const judgeRobotComeBack = (moves) => {
  let x = 0;
  let y = 0;

  for (const move of moves) {
    switch (move) {
      case "L": x--; break;
      case "R": x++; break;
      case "D": y--; break;
      case "U": y++; break;
    }
  }

  return x === 0 && y === 0;
};

console.log(judgeRobotComeBack("LRRRRUUUULLLDDDD"));
