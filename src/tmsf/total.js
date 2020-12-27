const sheetV2 = require('../sheet-v2');
const sellTotal = require('./loupan-sell-total');

!(async () => {
  try {
    const d = new Date();
    const filename = `SELL-TOTAL_${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()}`;

    const data = await sellTotal();

    await sheetV2.new(filename);

    await sheetV2.append(filename, data);
  } catch (err) {
    console.log(err);
  }
})();
