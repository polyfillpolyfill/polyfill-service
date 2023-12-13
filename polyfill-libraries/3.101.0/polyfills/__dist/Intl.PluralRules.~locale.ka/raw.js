
// Intl.PluralRules.~locale.ka
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["one","many","other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), i = s[0], i100 = i.slice(-2);
  if (ord) return i == 1 ? 'one'
    : i == 0 || ((i100 >= 2 && i100 <= 20) || i100 == 40 || i100 == 60 || i100 == 80) ? 'many'
    : 'other';
  return n == 1 ? 'one' : 'other';
}},"locale":"ka"})
}
