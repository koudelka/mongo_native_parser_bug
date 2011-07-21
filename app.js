var http = require('http'),
    mongodb = require('./node-mongodb-native/lib/mongodb')


var collection_name = 'cluster_test'

mongo_connection = new mongodb.Db(
      'test',
      new mongodb.Server(
        'mongo',
        27017,
        {}
      ),
      {native_parser:false}
    )

mongo_connection.open(function(){
  console.log('Opened connection to MongoDB (pid: '+process.pid+')')
})

module.exports = http.createServer(function(req, res){
  mongo_connection.collection(collection_name, function(err, collection) {
    collection.insert({field:'junk'}, function(err, docs) {
      var body = 'test'
      res.writeHead(200, { 'Content-Length': body.length });
      res.end(body);
    })
  })
});
