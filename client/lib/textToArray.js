export const textToArray = (text) => {
  return text.split(" ").map((word) => {
    return {
      text: word,
    };
  });
};
