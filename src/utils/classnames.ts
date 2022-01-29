export const cs = (prefix:string, rules?: { [key:string]: boolean }):string => {
  const extra = rules ? ['', ...Object.keys(rules).filter(x => rules[x])].join(' ') : '';
  return prefix + extra
};
