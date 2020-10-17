const fetch = require('node-fetch-with-proxy');
fetch('https://www.google.com', { timeout: 5000 } )
  .then(d => {
    console.log('sucess')
  })
  .catch(err => {
    console.log('network error');
  })