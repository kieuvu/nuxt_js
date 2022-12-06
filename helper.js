export const cookieParser = (cookie) => {
  const output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    const name = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair.splice(1).join('='));
    output[name] = value;
  });

  return output;
};
