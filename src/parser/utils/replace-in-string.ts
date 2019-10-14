const replace = (object: any, string: string): string => {
  for (const key in object) {
    if (string.includes(key)) {
      string = string.split(`\${${key}}`).join(object[key]);
    }
  }
  return string;
};

export default replace;
