// https://stackoverflow.com/a/59942031
export function getCombinations(valuesArray: string[]) {
  const combi = [];
  let temp = [];
  const slent = Math.pow(2, valuesArray.length);

  for (let i = 0; i < slent; i++) {
    temp = [];
    for (let j = 0; j < valuesArray.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(valuesArray[j]);
      }
    }
    if (temp.length > 0) {
      combi.push(temp);
    }
  }

  combi.sort((a, b) => a.length - b.length);
  return combi;
}
