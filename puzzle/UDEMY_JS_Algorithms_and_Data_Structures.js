
const hasSameItems = (arr_1, arr_2) => {
  if(arr_1.lenght !== arr_2.lenght) return false;

  const frequencyCounter_1 = {};
  const frequencyCounter_2 = {};

  for(let val of arr_1) {
    frequencyCounter_1[val] = (frequencyCounter_1[val] || 0) + 1;
  };

  for(let val of arr_2) {
    frequencyCounter_2[val] = (frequencyCounter_2[val] || 0) + 1;
  }

  for(let val in frequencyCounter_1) {
    if(frequencyCounter_1[val] !== frequencyCounter_2[val ** 2]) return false;
  }

  return true;
};

console.log(hasSameItems([2, 3, 5, 1, 1], [25, 1, 4, 9, 1])); //true

const areTwoWordsSame = (word_1, word_2) => {
  if(word_1.lenght !== word_2.lenght) return false;

  const frequencyCounter_1 = {},
        frequencyCounter_2 = {};

  for(let letter of word_1) frequencyCounter_1[letter] = (frequencyCounter_1[letter] || 0) + 1;

  for(let letter of word_2) frequencyCounter_2[letter] = (frequencyCounter_2[letter] || 0) + 1;

  for(let key in frequencyCounter_1) {
    if(frequencyCounter_1[key] !== frequencyCounter_2[key]) return false;
  }

  return true;
};

console.log(areTwoWordsSame('cat', 'tac')); //true
