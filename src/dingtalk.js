console.log('index.js');
const fetch = require('node-fetch');
const moment = require('moment');

fetch('http://sz.tmsf.com/newhouse/property_33_431137829_price.htm')
  .then(d => d.text())
  .then(d => {
    const arr = d.match(/页数\s+\d+\/(\d+)\s?总数：\s?(\d+)/);

    pushMessage(`date: ${moment().format('YYYY-MM-DD HH:mm:ss')}\ntotal: ${arr[2]}`)
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
