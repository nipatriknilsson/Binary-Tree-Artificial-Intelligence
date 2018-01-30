var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

// Called when the user wants a node in the tree

var getNode = function (req, res, next) {
    var url = 'mongodb://localhost:27017/q20';

    mongodb.connect(url, function (err, handle) {
        if ( handle ) {
            var db = handle.db ( 'q20' );
            if ( db ) {
                var collection = db.collection('nodes');

                var nodeid = req.query.id;

                // select statement
                var query = 
                    {
                        $or:
                        [
                            {
                                _id: nodeid
                            },
                            {
                                yes : nodeid
                            },
                            {
                                no : nodeid
                            }
                        ]
                    };

                //What to return on empty database
                var collectionEmpty = 
                [
                    {
                        _id : "root",
                        question : "a dog",
                        yes : null,
                        no : null,
                        isanimal : true
                    },
                    {

                    },
                    {

                    }
                ];

                //Call database and return a response to the user
                collection.find( query ).toArray(
                    function (err, results) {
                        if ( err ) {
                            res.status(404).send( 'Id finns inte. (1)' );
                        }
                        else
                        {
                            if ( results == '' && nodeid == 'root' )
                            {
                                res.send ( collectionEmpty );
                            }
                            else 
                            {
                                res.send( results );
                            }
                        }

                        res.end();

                        handle.close();
                    }
                );

                handle.close();
            }

            handle.close();
        }
    });
};

module.exports = getNode;
