export const textToArray = (text) => {
  if (!text) return [];

  return text.split(" ").map((word) => {
    return {
      text: word,
    };
  });
};
