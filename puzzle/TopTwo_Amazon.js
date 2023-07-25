//average of top two score 
//[sudent_id, average_of_top_two_score]
const items = [
  [2, 89],
  [1, 97],
  [4, 101],
  [3, 56],
  [2, 58],
  [3, 12],
  [3, 95],
  [1, 55],
  [2, 44],
  [4, 10],
  [4, 100],
  [4, 20]
];


const obj = {};

// const obj = {[id]: [all scores]};
for (const [key, value] of items) {
  if (!obj[key]) {
    obj[key] = [value];
  } else {
    obj[key].push(value);
  }
}

const result = [];

for (const key in obj) {
  const topTwo =
    obj[key]
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((acc, curr) => acc + curr, 0);

      const average = Math.floor(topTwo / 2);

  result.push(key, average);
}

console.log(result); //["1", 76, "2", 73, "3", 75, "4", 100]
