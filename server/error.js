/* 
* @Author: boxizen
* @Date:   2015-11-23 18:34:02
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-23 18:34:02
*/

'use strict';

var express = require('express'),

    router = express.Router();

// 该路由使用的中间件
router.use(function (err, req, res, next) {
    if (res.status(500)) {
        res.send('Something broke!');
    } else {
        next();
    }
});

module.exports = router;