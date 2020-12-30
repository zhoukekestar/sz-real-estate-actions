const sheetV2 = require('../src/sheet-v2');
const sellDetail = require('../src/tmsf/loupan-sell-detai');

const LOUPAN_LIST = ['33_135092'];

!(async () => {

  for (let i = 0; i < LOUPAN_LIST.length; i++) {

    try {
      const LOUPAN_ID = LOUPAN_LIST[i];
      const d = new Date();
      const filename = `SELL_${LOUPAN_ID}_${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}`;

      const data = await sellDetail(LOUPAN_ID);

      await sheetV2.new(filename);

      await sheetV2.append(filename, data);
    } catch (err) {
      console.log(err);
    }
  }
})();
