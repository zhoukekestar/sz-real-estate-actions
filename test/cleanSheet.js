const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fetch = require('node-fetch');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const credentials = {
  type: 'service_account',
  project_id: 'quickstart-1602919096459',
  private_key_id: process.env.SHEETS_PRIVATE_KEY_ID,
  private_key: process.env.SHEETS_PRIVATE_KEY,
  client_email: process.env.SHEETS_CLIENT_EMAIL,
  client_id: '106314866055622980154',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/githubactions%40quickstart-1602919096459.iam.gserviceaccount.com',
};

async function init() {

  console.log('使用新建文件的方式替代')
  return;

  console.log(process.env.HTTP_PROXY)
  console.log(process.env.HTTPS_PROXY)
  // const googleResult = await fetch('https://www.google.com/');
  // console.log(googleResult)

  const client = new google.auth.GoogleAuth({
    scopes,
    credentials,
  });

  const auth = await client.getClient();

  const res = await sheets.spreadsheets.values.batchClear({
    spreadsheetId: '1SnADYAtfqc0V9MczRF5QQ8s8UW-nldIJS5IS5LvkEVc',
    ranges: [
      'SELL_33_135092_2020-12-29',
      'SELL-TOTAL_2020-12-29'
    ],
    auth,
  });

  console.log(res)
};

init();
