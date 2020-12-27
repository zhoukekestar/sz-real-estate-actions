/* 楼盘销售明细 */

// http://sz.tmsf.com/newhouse/property_33_431137829_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page=1

const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

var NUMBER_MAP = {
  numberzero: 0,
  numberone: 1,
  numbertwo: 2,
  numberthree: 3,
  numberfour: 4,
  numberfive: 5,
  numbersix: 6,
  numberseven: 7,
  numbereight: 8,
  numbernine: 9,
  numberdor: '.',
};

function parseTd(div) {
  const arr = div.innerHTML.match(/number([^"]*)/g);
  if (!arr || arr.length === 0) return '';
  return Number(arr.map(t => NUMBER_MAP[t]).join(''));
}

async function fetchDocument(url) {
  var text = await fetch(url).then(t => t.text());
  const dom = new JSDOM(text);
  return dom.window.document;
}

async function getData(LOUPAN_ID) {
  var finallyData = []

  // 找到列表中的所有链接
  for (var number = 1; number < 2000; number++) {
    const href = `http://sz.tmsf.com/newhouse/property_${LOUPAN_ID}_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=&housetype=&page=${number}`;

    const doc = await fetchDocument(href);

    var res = [];

    try {
      for (const tr of doc.querySelectorAll(
        'div.bggrey.w1000 > div:nth-child(8) > div > div.onbuildshow_contant.colordg.ft14 > div > table > tbody.qita tr'
      )) {
        res.push(
          Array.from(tr.querySelectorAll('td'))
            .map(t => `${parseTd(t)}${t.textContent}`.replace(/\s/g, ''))
            .map(t => t.replace('㎡', ''))
            .map(t => t.replace('%', ''))
            .map(t => t.trim())
        );
      }
    } catch (err) {
      console.log(err)
    }

    finallyData = finallyData.concat(res);

    if (res.length < 14) {
      break;
    }
  }

  return finallyData;
}


module.exports = getData;