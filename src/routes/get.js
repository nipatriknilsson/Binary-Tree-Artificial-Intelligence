var express = require('express');
var apigetRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
//    var apigetController =
//        require('../controllers/get')(apigetRouter, nav);
//        apigetRouter.use(bookController.middleware);
        apigetRouter.route('/api/get/:id', apigetRouter.getNode);

//        apigetRouter.route('/:id')
//        .get(bookController.getById);

    return apigetRouter;
};
module.exports = router;