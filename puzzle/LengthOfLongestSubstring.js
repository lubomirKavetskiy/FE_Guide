function lengthOfLongestSubstring(s: string): number {
    let arr = Array.from(s);
  let result = 0;
  let temp = "";
 

  for (let a in arr) {
    const slicedArr = arr.slice(+a);  
    const slicedArrlength = slicedArr.length - 1;
   
    for (let b in slicedArr) {
      const bNumber = +b;  
      if (temp.includes(slicedArr[bNumber])) {
        if(temp.length > result) {
          result = temp.length;
        }
     
        temp = slicedArr[b];

        if (bNumber === slicedArrlength) {
          temp = "";
        }
        
      } else {
        temp += slicedArr[b];

        if (bNumber === slicedArrlength) {
          if(temp.length > result) {
            result = temp.length;
          }

          temp = "";
        }
      }
    } 
  }

  return result;
};
