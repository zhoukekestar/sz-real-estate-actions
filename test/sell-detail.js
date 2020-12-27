const sheetV2 = require('../src/sheet-v2');
const sellDetail = require('../src/tmsf/loupan-sell-detai');

const LOUPAN_ID = '33_430947781';

!(async () => {
  const d = new Date();
  const filename = `SELL_${LOUPAN_ID}_${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()}`;

  const data = await sellDetail(LOUPAN_ID);

  await sheetV2.new(filename);

  await sheetV2.append(filename, data);

  // const data = await sheetV2.read('zkk-test');
  // console.log(data);
})();
