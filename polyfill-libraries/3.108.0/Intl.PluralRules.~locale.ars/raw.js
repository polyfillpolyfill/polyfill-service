
// Intl.PluralRules.~locale.ars
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["zero","one","two","few","many","other"],"ordinal":["other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), t0 = Number(s[0]) == n, n100 = t0 && s[0].slice(-2);
  if (ord) return 'other';
  return n == 0 ? 'zero'
    : n == 1 ? 'one'
    : n == 2 ? 'two'
    : (n100 >= 3 && n100 <= 10) ? 'few'
    : (n100 >= 11 && n100 <= 99) ? 'many'
    : 'other';
}},"locale":"ars"})
}
