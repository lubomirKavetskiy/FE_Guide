//Sliding window
const lengthOfLongestSubstring = (str) => {
  let maxSize = 0;
  let left = 0;
  let set = new Set();

  for (let i = 0; i < str.length; i++) {
    const currItem = str[i];

    while (set.has(currItem)) {
      set.delete(str[left]);
      left++;
    }

    set.add(currItem);
    maxSize = Math.max(maxSize, i - left + 1);
  }

  return maxSize;
};

console.log(lengthOfLongestSubstring("a"));

const longestSubstring = (str) => { 
  let res = "";
  let left = 0;
  let set = new Set();
 

  for (let i = 0; i < str.length; i++) {
    const currItem = str[i];

    while (set.has(currItem)) {
      set.delete(str[left]);
      left++;
    }

    set.add(currItem);
    res = res.length > set.size ? res : [...set].join("");
  }

  return res;
};

console.log(longestSubstring("a"));
