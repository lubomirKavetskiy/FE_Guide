const isPalindrom = (str) => {
  const regex = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(regex, "");

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str.at(-1 - i)) {
      return false;
    }
  };

  return true;
};

console.log(isPalindrom("A man, a plan, a canal. Panama"));
