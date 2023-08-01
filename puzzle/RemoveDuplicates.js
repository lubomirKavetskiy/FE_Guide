//https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"

function removeDuplicates(s: string, k: number): string {
  let stack = [];

  for(let i = 0; i < s.length; i++) {
    let curr = s[i];

    if(stack.length === 0 || curr !== stack[stack.length - 1][0]){
      stack.push([curr, 1]);
    } else {
      stack[stack.length - 1][1]++;
      if(stack[stack.length - 1][1] === k) stack.pop();
    }
  }

  let res = '';

  for(let [char, count] of stack) {
    res +=char.repeat(count);
  }

  return res;
};
