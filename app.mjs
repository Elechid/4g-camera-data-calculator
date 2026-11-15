import { estimate } from './calculator.mjs';

const form = document.querySelector('form');
const fields = Array.from(form.querySelectorAll('input'));
const outputs = Array.from(document.querySelectorAll('output'));
const button = document.querySelector('#language');
const error = document.querySelector('#error');
const nodes = Array.from(document.querySelectorAll('#title, #intro, form label span, #error, .results span, #notes, #guide, #source'));
const english = nodes.map(node => node.textContent);
const traditional = [
  '4G 攝影機 SIM 用量估算器',
  '估算一個帳單週期的數據用量。請填入每種流量的平均碼率及每日使用時間。',
  '每部鏡頭遙距觀看（分鐘／日）',
  '遙距觀看碼率（Mbps）',
  '每部鏡頭另行上傳片段（分鐘／日）',
  '片段上傳碼率（Mbps）',
  '共用同一數據計劃的鏡頭數',
  '帳單週期（日）',
  '預留額外用量（%）',
  '請在每一欄輸入有效數值。',
  '遙距觀看',
  '另行上傳片段',
  '估算總用量',
  '連預留用量',
  '純粹錄影到 microSD 不會用流動數據。遙距回放會用數據，碼率相近時可把回放時間計入遙距觀看。另行上傳的片段只算一次。通知、韌體更新和網絡開銷會增加用量，建議首週查 SIM 實際用量再調整。1 GB = 1,000 MB。',
  'Elechid 4G 攝影機及 SIM 指南',
  '原始碼',
];

function render() {
  const valid = fields.every(field => field.validity.valid);
  error.hidden = valid;
  const [liveMin, liveRate, uploadMin, uploadRate, cameras, days, extra] = fields.map(field => field.valueAsNumber);
  const values = valid ? Object.values(estimate([liveMin, liveRate], [uploadMin, uploadRate], cameras, days, extra)) : [];
  const format = new Intl.NumberFormat(document.documentElement.lang, { maximumFractionDigits: 3 });
  outputs.forEach((output, i) => {
    const gb = values[i];
    output.textContent = !valid ? '—' : gb > 0 && gb < 0.001 ? '<0.001 GB' : format.format(gb) + ' GB';
  });
}

function language(chinese) {
  const copy = chinese ? traditional : english;
  nodes.forEach((node, i) => { node.textContent = copy[i]; });
  document.documentElement.lang = chinese ? 'zh-Hant' : 'en';
  document.title = copy[0] + ' | Elechid 音立';
  button.textContent = chinese ? 'English' : '繁體中文';
  button.lang = chinese ? 'en' : 'zh-Hant';
  const site = 'https://elechid.com' + (chinese ? '' : '/en');
  document.querySelector('#brand').href = site + '/';
  document.querySelector('#guide').href = site + '/blogs/news/4g-camera-data-usage-sim-hong-kong';
  render();
}

button.addEventListener('click', () => {
  const chinese = document.documentElement.lang === 'en';
  const url = new URL(location.href);
  if (chinese) url.searchParams.set('lang', 'zh');
  else url.searchParams.delete('lang');
  history.replaceState(null, '', url);
  language(chinese);
});
form.addEventListener('input', render);
form.addEventListener('submit', event => event.preventDefault());
language(new URLSearchParams(location.search).get('lang') === 'zh');
