# sz-real-estate-actions
sz-real-estate-actions

# Google Sheet

参考：https://codingfundas.com/how-to-read-edit-google-sheets-using-node-js/index.html
接口参考：https://developers.google.com/sheets/api/quickstart/nodejs

# 本地代理测试
阿里郎：内网连接 + 加速

* `tnpm i http-proxy-to-socks`
* `tnpx hpts -s 127.0.0.1:13659 -p 8080`
* `HTTPS_PROXY=http://127.0.0.1:8080 HTTP_PROXY=http://127.0.0.1:8080 node src/sheet.js`

# 常见问题
* The incoming JSON object does not contain a client_email field
  * 未传入环境变量导致
* 无任何返回或错误提示
  * 请使用 http 代理，并确保未使用 socks 代理


## 新建文件
* 新建 sheet 文件
* 重命名第一个 sheet 为 data
* 邀请共享账号：
githubactions@quickstart-1602919096459.iam.gserviceaccount.com
* 修改 sheet 和 sheet-v2 中的 spreadsheetId