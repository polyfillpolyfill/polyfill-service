
// Intl.PluralRules.~locale.mr
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["one","two","few","other"]},"fn":function(n, ord) {
  if (ord) return n == 1 ? 'one'
    : (n == 2 || n == 3) ? 'two'
    : n == 4 ? 'few'
    : 'other';
  return n == 1 ? 'one' : 'other';
}},"locale":"mr"})
}
