const sheetV2 = require('../src/sheet-v2');

!(async () => {
  await sheetV2.new('zkk-test');

  await sheetV2.append('zkk-test', [
    [1, 2, 3],
    ['zkk', 'pipe', 'test']
  ]);

  const data = await sheetV2.read('zkk-test');
  console.log(data);
})();