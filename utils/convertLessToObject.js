function convertLessToObject(source) {
  function convertSourceToJsObject(sheet) {
    const lessVars = {};
    const matches = sheet.match(/@(.*:[^;]*)/g) || [];

    matches.forEach(variable => {
      const definition = variable.split(/:\s*/);

      lessVars[definition[0]] = definition[1];
    });

    return lessVars;
  }

  function transformToCamelCase() {
    function preserveCamelCase(str) {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;

      for (let i = 0; i < str.length; i++) {
        const c = str[i];

        if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
          str = `${str.substr(0, i)}-${str.substr(i)}`;
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (
          isLastCharUpper &&
          isLastLastCharUpper &&
          /[a-zA-Z]/.test(c) &&
          c.toLowerCase() === c
        ) {
          str = `${str.substr(0, i - 1)}-${str.substr(i - 1)}`;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = c.toLowerCase() === c;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = c.toUpperCase() === c;
        }
      }

      return str;
    }

    let str = Array.from(arguments)
      .map(x => x.trim())
      .filter(x => x.length)
      .join('-');

    if (str.length === 0) return '';
    else if (str.length === 1) return str.toLowerCase();

    str = preserveCamelCase(str);

    return str
      .replace(/^[_.\- ]+/, '')
      .toLowerCase()
      .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
  }

  function followVar(value) {
    // value is a variable

    if (varRgx.test(value)) return followVar(vars[value]);

    return value;
  }

  const varRgx = /^@/;
  const vars = convertSourceToJsObject(source);
  const keys = Object.keys(vars);

  if (!keys.length) this.emitWarning('Could not find any extractable less variables!');

  Object.entries(vars).map(([key, value]) => {
    vars[key] = followVar(value);
  });

  const cleanedVars = keys.reduce((prev, key) => {
    prev[transformToCamelCase(key.replace(varRgx, ''))] = vars[key];

    return prev;
  }, {});

  return cleanedVars;
}

export default convertLessToObject;
