const router = require('express').Router()
const axios = require('axios')
const {uploadToFtp, drop }= require('./utilities/imageManagement')
const fs = require('fs');


router.post('/imageDrop', async(req, res, next) => {
  try {
    console.log("REQQQQ", req.body.filePath)
    let image = '/Users/mdworkin/Downloads' + req.body.filePath  
    // let newImage = await uploadToFtp(req.body.filePath)
    let newImage = fs.readFile(image, (err, data) => {
      //filter out non-ads.txt files
      try{
        console.log('FILE IN', data, image);
        // return files
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(data);
        res.end()
      } catch(e){console.log('E', e)}
    });
    await uploadToFtp(newImage);
    // console.log("NEW", newImage)
    // uploadToFtp(req.body)
    // res.status(202).send(newImage)

  } catch(e) {}
})

module.exports = router