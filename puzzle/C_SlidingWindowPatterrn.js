const maxSubarraySum = (arr, num) => {
  if(arr.length < num) return null;

  let sum=0, temp=0;

  for(let i=0; i<num; i++) {
    sum +=arr[i];
  };
  
  temp = sum;

  for(let i=num; i<arr.length; i++){
    temp = temp - arr[i - num] + arr[i];
    sum = Math.max(temp, sum);
  };

  return sum;
};

maxSubarraySum([1,2,3,4,5,1,10,5,1], 2) //10+5=15
