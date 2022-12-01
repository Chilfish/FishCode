import { fileURLToPath } from 'url';
import path from 'path';

export const filename = (metaUrl) => fileURLToPath(metaUrl);

/**
 * @param {string}  metaUrl import.meta.url
 * @returns {string} the path
 */
export const dirname = (metaUrl) => path.dirname(fileURLToPath(metaUrl));

/**
 *
 * @param {number} timestamp 要转换的时间戳
 * @returns {string} 返回以 `Y-M-D h:m:s` 格式的时间
 */
export function timestampToTime(timestamp) {
  timestamp = Number(timestamp);
  const len = Math.ceil(Math.log10(timestamp));

  if (len === 10) {
    timestamp *= 1000; // 要转成13位的时间戳
  } else if (len !== 10 && len !== 13) {
    console.error('timestamp formate error!');
  }

  // 补前导零
  const zero = (x) => (x < 10 ? `0${x}` : `${x}`);

  const date = new Date(Number(timestamp)),
    Y = date.getFullYear() + '-',
    M = zero(date.getMonth() + 1) + '-',
    D = zero(date.getDate()) + ' ',
    h = zero(date.getHours()) + ':',
    m = zero(date.getMinutes()) + ':',
    s = zero(date.getSeconds());
  return Y + M + D + h + m + s;
}
