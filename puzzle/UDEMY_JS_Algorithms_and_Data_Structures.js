// Frequency Counter
const hasSameItems = (arr_1, arr_2) => {
  if(arr_1.length !== arr_2.length) return false;

  const lookup = {};

  for(let val of arr_1) {
    lookup[val] = (lookup[val] || 0) + 1;
  }

  for(let val of arr_2){
    const sqrtVal = Math.sqrt(val);

    if(!lookup[sqrtVal]) return false;

    lookup[sqrtVal] -= 1;
  };

  return true;
};

console.log(hasSameItems([2, 3, 5, 1, 1], [25, 1, 4, 9, 1])); //true

const areTwoWordsSame = (word_1, word_2) => {
  if(word_1.length !== word_2.length) return false;

  const lookup = {};

  for(let letter of word_1) lookup[letter] = (lookup[letter] || 0) + 1;

  for(let val of word_2) {
    if(!lookup[val]) {
      return false;
    } else {
      lookup[val] -= 1;
    };
  }

  return true;
};

console.log(areTwoWordsSame('cat', 'tac')); //true

//Multiple Pointers
const sortedArr = [-4, -1, 0, 1, 3, 5, 11];

const sumZero = (arr) => {
 let left = 0,
     right = arr.length - 1;

     while(left < right) {
       const sum = arr[left] + arr[right];

       if(sum === 0) {
         return [arr[left], arr[right]];
       } else {
         sum > 0 ? right-- : left++;
       }
     }
};

console.log(sumZero(sortedArr)); //[-1, 1];

//
const countUniqueValue = (sortedArr) => {
  let i=0;

  for(let j=1; j<sortedArr.length; j++) {
    if(sortedArr[i] !== sortedArr[j]) {
      i++;
      sortedArr[i] = sortedArr[j];
    };
  };

  return i+1;
}

console.log(countUniqueValue([-2,3,5,19])); //4
