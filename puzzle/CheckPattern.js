const checkPattern = (arr, pattern) => {
  const obj = {};
  if(arr.length !== pattern.length) return false;

  for(let i=0; i<arr.length; i++){
    const currArrItem = arr[i],
          currPatternItem = pattern[i];

    if(!obj[currArrItem]) {
      obj[currArrItem] = currPatternItem;
    } else {
      if(obj[currArrItem] !== currPatternItem) return false;
    }
  };

  return true;
};

checkPattern(['cat', 'dog', 'cat', 'cat'], 'abaa'); //true
checkPattern(['cat', 'dog', 'cat', 'dog'], 'abaa'); //false
