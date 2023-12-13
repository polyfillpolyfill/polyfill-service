
// Intl.PluralRules.~locale.da
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), i = s[0], t0 = Number(s[0]) == n;
  if (ord) return 'other';
  return n == 1 || !t0 && (i == 0 || i == 1) ? 'one' : 'other';
}},"locale":"da"})
}
