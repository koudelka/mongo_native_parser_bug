There seems to be a bug when using cluster in combination with node-mongodb-native's native BSON parser.

Only about half of the attempted inserts actually show up in the db, I suspect that object ids are being reused.

Turning off the native parser causes the problem to disappear.

##To reproduce:

- `git clone git://github.com/koudelka/mongo_native_parser_bug.git`
- `cd mongo_native_parser_bug`
- `git submodule init`
- `git submodule update`
- `cd node-mongodb-native && make && cd ..`
- `node server.js`
- In another terminal: `ab -n 10000 -c 4 http://127.0.0.1:3000/`
- Check the number of docs in the collection, in a mongo shell: 
    `use test`
    `db.cluster_test.count()`
- Should be far less than 10k documents.


Turn off the native parser in app.js and try again, should be 10k documents.
