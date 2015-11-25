/* 
 * @Author: boxizen
 * @Date:   2015-11-24 15:25:25
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-25 15:01:58
 */

'use strict';

var express = require('express'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),

    router = express.Router(),
    apiDir = '../api',
    apiFiles = [],

    logger = console;


// 获取文件 
function fetchApi(path) {
    // 强制同步
    var files = fs.readdirSync(path);

    files.forEach(function(item) {
        var tmpPath = path + '/' + item,
            stat = fs.statSync(tmpPath);
        if (stat.isDirectory()) {
            fetchApi(tmpPath);
        } else {
            apiFiles.push(path + '/' + item.replace(/.js/g, ''));
        }
    })
}


module.exports = function() {
    var apis = [];
    fetchApi(path.resolve(__dirname, apiDir));

    apiFiles.forEach(function(item) {
        var api = require(item);
        apis.push(api);
    })
    // 遍历api文件
    apis.forEach(function(item) {
        // 遍历每个文件中的api
        item.forEach(function(api_item) {

            var method = api_item[0],
                path = api_item[1],
                callback = api_item[2];
            router[method](path, callback);
        })
    });

    return router;
}