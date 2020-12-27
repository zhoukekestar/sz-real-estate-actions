const { google } = require('googleapis');
const sheets = google.sheets('v4');
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

const spreadsheetId = '1SnADYAtfqc0V9MczRF5QQ8s8UW-nldIJS5IS5LvkEVc';
let isInited = false;

async function init() {
  if (isInited) return;

  const client = new google.auth.GoogleAuth({
    scopes,
    credentials,
  });

  const auth = await client.getClient();
  google.options({ auth });

  isInited = true;
}

module.exports = {
  // 数据读取
  read: async (range = 'data') => {
    await init();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return res.data.values;
  },

  // 新建 sheet
  new: async range => {
    await init();
    try {

      const res = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: range,
                },
              },
            },
          ],
        },
      });

      return res;
    } catch(err) {
      console.log(err);
    }
  },

  // 添加数据
  append: async (range = 'data', values) => {
    await init();
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });
    return res;
  },
};
