/* 
 * @Author: boxizen
 * @Date:   2015-11-23 18:33:51
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-25 15:08:09
 */

'use strict';

var express = require('express'),

    router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// 定义网站主页的路由
router.get('/', function(req, res) {
    res.send('info-contractor home page');
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About Me?');
});

module.exports = router;