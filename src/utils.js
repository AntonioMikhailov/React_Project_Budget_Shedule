// вместо undefined можно 'ru'
export const currencyFormatter = new Intl.NumberFormat( undefined, {
  currency: "rub",
  style: "currency",
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
 })
// console.log(currencyFormatter.format(200)); // 200 $