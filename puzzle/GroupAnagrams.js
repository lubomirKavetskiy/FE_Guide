const groupAnagrams = (str) => {
  const sortedMapItems = str.map((el) => el.split("").sort().join(""));

  const res = {};

  for (const key in sortedMapItems) {
    const currSortedMapItem = sortedMapItems[key];
    const currStrItem = str[key];

    if (!res[currSortedMapItem]) {
      res[currSortedMapItem] = [currStrItem];
    } else {
      res[currSortedMapItem].push(currStrItem);
    }
  }

  return res;
};

console.log(groupAnagrams(["bat", "tea", "crm", "eat", "tab", "aet", "atb"]));
//{abt: ['bat', 'tab', 'atb'],.....}
