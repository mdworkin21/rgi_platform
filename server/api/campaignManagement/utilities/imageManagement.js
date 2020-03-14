const Client = require('ssh2-sftp-client');
const fs = require('fs');


async function uploadImage(file){
  let sftp = new Client();
  console.log("IMAGE", file)
  await sftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PW
  }).then(() => {
      sftp.put(file);
  }).then((a) => {
    console.log(a);
      console.log('file uploaded');
      sftp.end();
  }).catch((err) => {
      console.log(err, 'catch error');
      // sftp.end();
  });
}

// Ads.txt folder in Google Drive
// const folder = '../../Google Drive/Red Gobo Inc/Ads.txt/';
// array for site ads.txt files
let txtfiles = [];

// get ads.txt files from folder



module.exports = {
  uploadImage
}