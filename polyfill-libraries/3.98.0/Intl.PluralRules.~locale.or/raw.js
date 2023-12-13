
// Intl.PluralRules.~locale.or
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["one","two","few","many","other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), t0 = Number(s[0]) == n;
  if (ord) return (n == 1 || n == 5 || (t0 && n >= 7 && n <= 9)) ? 'one'
    : (n == 2 || n == 3) ? 'two'
    : n == 4 ? 'few'
    : n == 6 ? 'many'
    : 'other';
  return n == 1 ? 'one' : 'other';
}},"locale":"or"})
}
