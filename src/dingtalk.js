console.log('index.js');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

let total = null;
let sold = null;

Promise.all([
  fetch('http://sz.tmsf.com/newhouse/property_33_431137829_price.htm')
    .then(d => d.text())
    .then(d => {
      const arr = d.match(/页数\s+\d+\/(\d+)\s?总数：\s?(\d+)/);
      return arr[2];
    }),
  fetch(
    'http://sz.tmsf.com/newhouse/property_33_431137829_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=2&housetype=&page='
  )
    .then(d => d.text())
    .then(d => {
      const arr = d.match(/页数\s+\d+\/(\d+)\s?总数：\s?(\d+)/);
      return arr[2];
    }),
]).then(([total, sold]) => {
  // 北京时间
  pushMessage(
    `date: ${moment()
      .tz('Asia/Shanghai')
      .format('YYYY-MM-DD HH:mm:ss')}\ntotal: ${total}\nsold: ${sold}`
  );
});

function pushMessage(msg) {
  console.log(`push message to dingtalk: ${msg}`);
  fetch(
    `https://oapi.dingtalk.com/robot/send?access_token=81002b601e36e1ed5b22f1cd72a2e671f03af3f86124abfdf2dec9baf0ab5ce8`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        msgtype: 'text',
        text: {
          content: msg,
        },
      }),
    }
  );
}
