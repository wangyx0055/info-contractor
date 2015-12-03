/* 
 * @Author: boxizen
 * @Date:   2015-12-01 14:11:36
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-04 01:05:47
 */

'use strict';

var Clue = require('../clue/clue'),
    Target = require('../target/target'),
    MQ = require('../mq/mq'),
    logger = console;

// 创建对象
function create(task, callback) {

    var target = task.harvest.honey,
        clue = task.harvest.flower,
        author = task.harvest.author,
        tag = task.harvest.tag,
        oid = task.oid,
        url = task.url;

    if (target) {
        var targetItem = {
            tag: tag,
            url: url,
            data: target,
            author: author
        };
        Target.create(targetItem, function(err, result) {})
    }
    if (clue) {
        clue.forEach(function(item) {
            var newItem = {
                url: item.url,
                tag: tag,
                original: url,
                author: author
            };
            MQ.push('clue', newItem, function(err, o) {
                if(err) {
                    logger.info(err);
                }
            })
            /*Clue.create(newItem, function(err, result) {});*/
        })
    }
}
exports.create = create;

// 查找对象
function fetch(callback) {

    Target.fetch(null, callback);
}
exports.fetch = fetch;