const Client = require('ssh2-sftp-client');
const fs = require('fs');


  
async function uploadToFtp(file){
  let image = await fs.readdir(file)
  let sftp = new Client();
  console.log("IMAGE", image)
  sftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PW
  }).then(() => {
      sftp.put(image, 'public_html/creatives/' + 'TEST NEW');
  }).then((a) => {
    console.log(a);
      console.log('ads.txt files uploaded');
      // sftp.end();
  }).catch((err) => {
      console.log(err, 'catch error');
      sftp.end();
  });
}

// Ads.txt folder in Google Drive
// const folder = '../../Google Drive/Red Gobo Inc/Ads.txt/';
// array for site ads.txt files
let txtfiles = [];

// get ads.txt files from folder



module.export = {
  uploadToFtp
}