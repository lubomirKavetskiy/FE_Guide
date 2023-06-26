const findMostUsedCharacter = (str) => {
  let result;
  let data = {};
  let maxNumber = 0;

  for (let i of str) {
    const currNumber = data[i];

    if (currNumber >= 0) {
      const newNumber = currNumber + 1;

      data[i] = newNumber;

      if (newNumber > maxNumber) {
        maxNumber = newNumber;

        result = i;
      }
    } else {
      data[i] = 0;
    }
  }

  return result ?? `empty`;
};
