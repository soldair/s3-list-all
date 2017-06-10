# s3-list-all
get full list response from s3.
s3 limits listObjects responses to 1000 entries. you have to recursively call listObjects with the continuation token to get the whole result.

```js
const listAll = require('s3-list-all')({accessKeyId:key,secretAccessKey:secret})

listAll({Bucket:bucket,Prefix:'2017-'},function(err,results){
  // if any requests error we callback with err and undefined result.

  console.log(results)
  console.log(results.length)

  //results is an array of all s3 response.Contents
  /*
  [  
  { Key: '2017-01-01T07:00:00.000.log',
    LastModified: 2017-01-01T07:00:02.000Z,
    ETag: '"0000000000000000000000000000000000-37"',
    Size: 194034009,
    StorageClass: 'STANDARD' },
    ...
  ]
  */
})

```

## api

- require('s3-list-all')(awsConfig) , default export.
  - pass a config object with at least aws accessKeyId and secretAccessKey. valid config options are in the aws-sdk documentation here.
  - returns function `listAll`
- listAll(s3Config,cb)
  - s3 config options are here is the aws documentation. http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html


