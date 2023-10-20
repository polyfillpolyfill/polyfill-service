
// Intl.PluralRules.~locale.is
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","other"],"ordinal":["other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), i = s[0], t0 = Number(s[0]) == n, i10 = i.slice(-1), i100 = i.slice(-2);
  if (ord) return 'other';
  return t0 && i10 == 1 && i100 != 11 || !t0 ? 'one' : 'other';
}},"locale":"is"})
}
