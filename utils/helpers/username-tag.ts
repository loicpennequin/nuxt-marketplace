export function getRandomValueNotInArray(arr: number[], max: number) {
  const available = [];
  for (let i = 0; i <= max; i++) {
    if (!arr.includes(i)) available.push(i);
  }

  return available[Math.floor(Math.random() * available.length)];
}

export const createUsernameTag = (usedTags: number[] = []) => {
  const tag = getRandomValueNotInArray(usedTags, 9999);

  return String(tag).padStart(4, '0');
};
