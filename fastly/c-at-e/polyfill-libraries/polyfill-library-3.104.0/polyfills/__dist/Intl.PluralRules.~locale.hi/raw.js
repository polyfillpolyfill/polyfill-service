
// Intl.PluralRules.~locale.hi
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["one","two","few","many","other"]},"fn":function(n, ord) {
  if (ord) return n == 1 ? 'one'
    : (n == 2 || n == 3) ? 'two'
    : n == 4 ? 'few'
    : n == 6 ? 'many'
    : 'other';
  return n >= 0 && n <= 1 ? 'one' : 'other';
}},"locale":"hi"})
}
