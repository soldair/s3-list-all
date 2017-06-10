
var S3 = require('aws-sdk/clients/s3')

module.exports = function(awsConfig){
  var s3 = new S3(awsConfig)

  return fetch
  /*
  fetch({Bucket:bucket,Prefix:'2017-'},function(err,res){
    console.log(res)
    console.log(res.length)
  })
  */

  function fetch(params,cb,_opts){

    var opts = _opts||{}

    params.ContinuationToken = opts.ContinuationToken

    s3.listObjectsV2(params,function(err,payload){
      
      if(err) return cb(err);

      res = opts.res||[]
      res.push.apply(res,payload.Contents)
      opts.res = res

      if(payload.IsTruncated) {
        opts.ContinuationToken = payload.NextContinuationToken
        fetch(params,cb,opts)
      } else {
        cb(false,opts.res)
      }
    })

  }
}

