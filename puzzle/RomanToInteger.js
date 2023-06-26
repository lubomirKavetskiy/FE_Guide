Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

const list = new Map();
list.set('I', 1).set('V', 5).set('X', 10).set('L', 50).set('C', 100).set('D', 500).set('M', 1000);


const romanToInt = (romanStr: string):number => {
  let res = 0;
  let currIdx = 0;

  for(const s of romanStr) {
    const currNumber = list.get(s);
    const prevRomanStr = romanStr[currIdx - 1];

    res += currNumber;
   
    if((s === 'V' || s === 'X') && prevRomanStr === 'I') {
      res -= 2;
    }
    else if((s === 'L' || s === 'C') && prevRomanStr === 'X') {
      res -= 20;
    }
    else if((s === 'D' || s === 'M') && prevRomanStr === 'C') {
      res -= 200;
    };

    currIdx++;
  }

  return res;
};
