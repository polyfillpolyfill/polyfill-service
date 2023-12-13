
// Intl.PluralRules.~locale.ru
/* @generated */
// prettier-ignore
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === 'function') {
  Intl.PluralRules.__addLocaleData({"data":{"categories":{"cardinal":["one","few","many","other"],"ordinal":["other"]},"fn":function(n, ord) {
  var s = String(n).split('.'), i = s[0], v0 = !s[1], i10 = i.slice(-1), i100 = i.slice(-2);
  if (ord) return 'other';
  return v0 && i10 == 1 && i100 != 11 ? 'one'
    : v0 && (i10 >= 2 && i10 <= 4) && (i100 < 12 || i100 > 14) ? 'few'
    : v0 && i10 == 0 || v0 && (i10 >= 5 && i10 <= 9) || v0 && (i100 >= 11 && i100 <= 14) ? 'many'
    : 'other';
}},"locale":"ru"})
}
