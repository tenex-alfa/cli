let index = 0;
const transformToYmlFriendlyString = (input: string): string => {
  return input.replace(/void/g, piece => piece + index++);
};

export default transformToYmlFriendlyString;
