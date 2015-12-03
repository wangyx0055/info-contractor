/* 
 * @Author: boxizen
 * @Date:   2015-11-23 16:58:22
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-04 00:48:30
 */

'use strict';

var express = require('express'),

    conf = require('../conf'),
    mq = require('../components/mq/mq'),

    middleware = {
        bodyParser: require('body-parser'),
        cookieParser: require('cookie-parser'),
        multer: require('multer'),
        compress: require('compression'),
        api: require('./api'),
        router: require('./router'),
        error: require('./error')
    },

    app = express();


function init() {

    // 开启配置文件
    conf.init();
    
    mq.createConn();    

    // 处理 application/json 格式请求
    app.use(middleware.bodyParser.json({
        limit: '10mb'
    }));
    // 处理 application/x-www-form-urlencoded 格式请求
    app.use(middleware.bodyParser.urlencoded({
        extended: true
    }));

    // 解析 multipart/form-data 格式请求
    //app.use(middleware.multer());

    // 解析请求中的 cookie
    app.use(middleware.cookieParser());

    // 启用压缩中间件
    app.use(middleware.compress());

    // 启用静态资源中间件
    app.use(express.static('public'));

    // 错误处理中间件
    app.use(middleware.error);

    // 启用API
    app.use('/api', middleware.api());

    // 启用路由
    app.use('/', middleware.router);

    app.listen(4000, function () {
        console.log("监听4000端口");
    })
}

init();