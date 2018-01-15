var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var uuid = require('uuid');
var sha256 = require('js-sha256');

var putNode = function (req, res, next) {
    var url = 'mongodb://localhost:27017/q20';

    mongodb.connect(url, function (err, handle) {
        if ( handle ) {
            var db = handle.db ( 'q20' );
            if ( db ) {
                var collection = db.collection('nodes');

                var parent_id = req.query.oldId;
                var parent_question = req.query.newQuestion;
                var parent_yes = req.query.oldYes != "null" ? req.query.oldYes : null;
                var parent_no = req.query.oldNo != "null" ? req.query.oldNo : null;
                var parent_isanimal = false;

                var child_yes_id = sha256 ( uuid () + Math.random() + '_' + Math.random() );
                var child_yes_Question = req.query.newAnimal;
                var child_yes_Yes = parent_id;
                var child_yes_No = null;
                var child_yes_IsAnimal = true;

                var child_no_id = sha256 ( uuid () + Math.random() + '_' + Math.random() );
                var child_no_Question = req.query.oldQuestion;
                var child_no_Yes = null;
                var child_no_No = parent_id;
                var child_no_IsAnimal = req.query.oldIsAnimal;

                var queryinsert =
                [
                    {
                        _id : parent_id,
                        question : parent_question,
                        yes: parent_yes,
                        no: parent_no,
                        isanimal: parent_isanimal
                    },
                    {
                        _id : child_yes_id,
                        question : child_yes_Question,
                        yes : child_yes_Yes,
                        no : child_yes_No,
                        isanimal: child_yes_IsAnimal
                    },
                    {
                        _id : child_no_id,
                        question : child_no_Question,
                        yes : child_no_Yes,
                        no : child_no_No,
                        isanimal : child_no_IsAnimal
                    }
                ];

                for ( var item in queryinsert ) {
                    try {
                        collection.updateMany(
                            {
                                _id : queryinsert [ item ]._id
                            },
                            {
                                $set:
                                {
                                    question : queryinsert [ item ].question,
                                    yes : queryinsert [ item ].yes,
                                    no : queryinsert [ item ].no,
                                    isanimal : queryinsert [ item ].isanimal
                                }
                            },
                            {
                            upsert : true
                            }
                        );
                    }
                    catch ( e ) {
                        print( e );
                        res.status ( 500 ).send( 'Ett fel inträffade. (1): ' + e );
                    }
                }

                handle.close();
                if ( ! res.headersSent ) {
                    res.status ( 200 ).send ( 'ok' );
                }
            }

            handle.close();
        }
    });
};

module.exports = putNode;
