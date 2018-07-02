/** 
 * 将 num 自动补齐到n位，如果num的位数本来就大于n，则返回num原值
 * @param  {String/Number} num 
 * @param  {Number} n 
 */
export function PrefixInteger(num, n) {
  if ((num + '').length < n) {
    return (Array(n).join(0) + num).slice(-n);
  } else {
    return num;
  }
}