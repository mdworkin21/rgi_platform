const Client = require('ssh2-sftp-client');
const fs = require('fs');

const file = '';

uploadToFtp();

function uploadToFtp(){
  let sftp = new Client();
  sftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PW
  }).then(() => {
      sftp.put(file, '');
  }).then((a) => {
    console.log(a);
      console.log('ads.txt files uploaded');
      //sftp.end();
  }).catch((err) => {
      console.log(err, 'catch error');
      sftp.end();
  });
}
