//https://www.youtube.com/watch?v=Y0ql7woAZy8
const prices = [7, 1, 2, 3, 4, 3, 6];
// buy | sell
// ----------
// 1   |   4  : 4-1=3
// 3   |   6  : 6-3=3
// profit = 3+3 = 6

const getPriceProfit = () => {
  let profit = 0;

  for(let i = 1; i < prices.length; i++) {
    if(prices[i] > prices[i-1]) {
      const diff = prices[i] - prices[i-1];
      profit += diff;
    }
  };

  return profit;
};

console.log(getPriceProfit());
