/* 
 * @Author: boxizen
 * @Date:   2015-12-03 11:05:16
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-05 01:52:14
 */

'use strict';

var redis = require('redis'),
    conf = require('../../conf'),
    logger = console,
    client;

// 创建连接
function createConn() {
    var port = conf.redis.port,
        host = conf.redis.host;

    client = redis.createClient(port, host, {});     
    
    client.on('error', function(err) {
        console.log(err);
    })
}   
exports.createConn = createConn;

function push(key, value, callback) {
    var jsonStr = JSON.stringify(value);
    client.lpush(key, jsonStr, function(err, row) {
        callback(err);
    });
}
exports.push = push;

function pop(key, callback) {
    client.rpop(key, function(err, o) {
        callback(err,o);
    })
}
exports.pop = pop;