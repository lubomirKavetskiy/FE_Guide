const maxSubarraySum = (arr, num) => {
  if(num > arr.length) return null;

  let max=0;

  for(let i=0; i<arr.length - num + 1; i++){
    let temp =0;

    for(let j=0; j<num; j++) {
      temp += arr[i + j];
      
      if(temp > max) max = temp;
    }
  };

  return max;
}

maxSubarraySum([1,2,3,4,5,1,10,5,1], 2) //10+5=15
