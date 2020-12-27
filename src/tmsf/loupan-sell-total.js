/* 楼盘总体销售数据 */

// // 可售
// const sellUrl = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page=`;

// // 可售并小于 50
// const sellUrl50 = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=1&housetype=&page=`;

// // 已售
// const soldUrl = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=2&housetype=&page=`;

// // 已售并小于 50
// const soldUrl50 = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=2&housetype=&page=`;

const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

async function fetchDocument(url) {
  // var text = await fetch(url).then(t => t.text());
  // var doc = document.createElement('div');
  // doc.innerHTML = text;
  // return doc;
  //
  var text = await fetch(url).then(t => t.text());
  const dom = new JSDOM(text);
  return dom.window.document;
}

async function fetchTotalNumber(url) {
  const doc = await fetchDocument(url);
  return doc
    .querySelector(
      'div.bggrey.w1000 > div:nth-child(8) > div > div.spagenext > span'
    )
    .textContent.match(/总数：(\d+)套/)[1];
}

async function transUrl(url) {
  const sellUrl = url.replace(
    '_info.htm',
    '_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page='
  );
  const sellUrl50 = url.replace(
    '_info.htm',
    '_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=1&housetype=&page='
  );
  const soldUrl = url.replace(
    '_info.htm',
    '_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=2&housetype=&page='
  );
  const soldUrl50 = url.replace(
    '_info.htm',
    '_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=2&housetype=&page='
  );

  return {
    url,
    sell: await fetchTotalNumber(sellUrl),
    sell50: await fetchTotalNumber(sellUrl50),
    sold: await fetchTotalNumber(soldUrl),
    sold50: await fetchTotalNumber(soldUrl50),
  };
}

module.exports = async function init() {
  const urls = `http://sz.tmsf.com/newhouse/property_33_133319_info.htm
http://sz.tmsf.com/newhouse/property_33_1771075_info.htm
http://sz.tmsf.com/newhouse/property_33_209800506_info.htm
http://sz.tmsf.com/newhouse/property_33_431137829_info.htm
http://sz.tmsf.com/newhouse/property_33_1770989_info.htm
http://sz.tmsf.com/newhouse/property_33_318183432_info.htm
http://sz.tmsf.com/newhouse/property_33_430947781_info.htm
http://sz.tmsf.com/newhouse/property_33_290004_info.htm
http://sz.tmsf.com/newhouse/property_33_272775_info.htm
http://sz.tmsf.com/newhouse/property_33_135424_info.htm
http://sz.tmsf.com/newhouse/property_33_133125_info.htm
http://sz.tmsf.com/newhouse/property_33_1220116_info.htm
http://sz.tmsf.com/newhouse/property_33_1694875_info.htm
http://sz.tmsf.com/newhouse/property_33_135092_info.htm
http://sz.tmsf.com/newhouse/property_33_1513345_info.htm
http://sz.tmsf.com/newhouse/property_33_136101_info.htm
http://sz.tmsf.com/newhouse/property_33_133437_info.htm
http://sz.tmsf.com/newhouse/property_33_270864_info.htm
http://sz.tmsf.com/newhouse/property_33_192814196_info.htm
http://sz.tmsf.com/newhouse/property_33_133025_info.htm
http://sz.tmsf.com/newhouse/property_33_134855_info.htm
http://sz.tmsf.com/newhouse/property_33_311217_info.htm
http://sz.tmsf.com/newhouse/property_33_134035_info.htm
http://sz.tmsf.com/newhouse/property_33_132894_info.htm
http://sz.tmsf.com/newhouse/property_33_132232_info.htm
http://sz.tmsf.com/newhouse/property_33_20228688_info.htm
http://sz.tmsf.com/newhouse/property_33_274318_info.htm
http://sz.tmsf.com/newhouse/property_33_132246_info.htm
http://sz.tmsf.com/newhouse/property_33_134186_info.htm
http://sz.tmsf.com/newhouse/property_33_134895_info.htm
http://sz.tmsf.com/newhouse/property_33_133667_info.htm
http://sz.tmsf.com/newhouse/property_33_289774_info.htm
http://sz.tmsf.com/newhouse/property_33_132646_info.htm
http://sz.tmsf.com/newhouse/property_33_311230_info.htm
http://sz.tmsf.com/newhouse/property_33_135133_info.htm
http://sz.tmsf.com/newhouse/property_33_274286_info.htm
http://sz.tmsf.com/newhouse/property_33_135043_info.htm
http://sz.tmsf.com/newhouse/property_33_135330_info.htm
http://sz.tmsf.com/newhouse/property_33_133594_info.htm
http://sz.tmsf.com/newhouse/property_33_311246_info.htm
http://sz.tmsf.com/newhouse/property_33_3158256_info.htm
http://sz.tmsf.com/newhouse/property_33_135004_info.htm
http://sz.tmsf.com/newhouse/property_33_3326423_info.htm
http://sz.tmsf.com/newhouse/property_33_292054_info.htm
http://sz.tmsf.com/newhouse/property_33_255787392_info.htm
http://sz.tmsf.com/newhouse/property_33_201740937_info.htm
http://sz.tmsf.com/newhouse/property_33_134935_info.htm
http://sz.tmsf.com/newhouse/property_33_272766_info.htm
http://sz.tmsf.com/newhouse/property_33_276261_info.htm
http://sz.tmsf.com/newhouse/property_33_289987_info.htm
http://sz.tmsf.com/newhouse/property_33_290152_info.htm
http://sz.tmsf.com/newhouse/property_33_292966_info.htm
http://sz.tmsf.com/newhouse/property_33_311176_info.htm
http://sz.tmsf.com/newhouse/property_33_290026_info.htm
http://sz.tmsf.com/newhouse/property_33_133521_info.htm
http://sz.tmsf.com/newhouse/property_33_292204_info.htm
http://sz.tmsf.com/newhouse/property_33_289879_info.htm
http://sz.tmsf.com/newhouse/property_33_134393_info.htm
http://sz.tmsf.com/newhouse/property_33_292823_info.htm
http://sz.tmsf.com/newhouse/property_33_292833_info.htm
http://sz.tmsf.com/newhouse/property_33_311163_info.htm
http://sz.tmsf.com/newhouse/property_33_311189_info.htm
http://sz.tmsf.com/newhouse/property_33_311201_info.htm
http://sz.tmsf.com/newhouse/property_33_289384_info.htm
http://sz.tmsf.com/newhouse/property_33_272572_info.htm
http://sz.tmsf.com/newhouse/property_33_132441_info.htm
http://sz.tmsf.com/newhouse/property_33_290088_info.htm
http://sz.tmsf.com/newhouse/property_33_132293_info.htm
http://sz.tmsf.com/newhouse/property_33_292067_info.htm
http://sz.tmsf.com/newhouse/property_33_314548_info.htm
http://sz.tmsf.com/newhouse/property_33_292080_info.htm
http://sz.tmsf.com/newhouse/property_33_292810_info.htm
http://sz.tmsf.com/newhouse/property_33_285286_info.htm`.split('\n');

  const result = [];
  for (let i = 0; i < urls.length; i++) {
    try {
      result.push(await transUrl(urls[i]));
    } catch(err) {
      console.log(err);
    }
  }
  // console.log(result);

  return result.map(t => [t.url, t.sell, t.sell50, t.sold, t.sold50]);
};
