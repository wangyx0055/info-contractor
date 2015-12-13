/* 
 * @Author: boxizen
 * @Date:   2015-12-01 14:11:36
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-13 20:47:59
 */

'use strict';

var Clue = require('../clue/clue'),
    Target = require('../target/target'),
    sleep = require('../sleep/sleep'),
    logger = console;

// 创建对象
function create(task, callback) {

    var target = task.harvest.honey,
        clue = task.harvest.flower,
        author = task.harvest.author,
        tag = task.harvest.tag,
        category = task.harvest.category,
        publishAt = task.harvest.publishAt,
        oid = task.oid,
        url = task.url;
    
    if (target) {        
        var targetItem = {
            tag: tag,
            url: url,
            oid: oid,
            data: target,
            author: author,
            category: category,
            publishAt: new Date(parseInt(publishAt))
        };
        Target.create(targetItem, function(err, result) {})
    }
    if (clue) {
        clue.forEach(function(item) {
            var newItem = {
                url: item.url,
                tag: tag,
                original: url,
                author: author,
                category: category
            };
            Clue.create(newItem, function(err, result) {});
        })
    }
}
exports.create = create;

// 查找对象列表
function fetch(options, callback) {

    Target.fetch(options, callback);
}
exports.fetch = fetch;

// 查找对象
function get(options, callback) {

    Target.get(options, callback);
}
exports.get = get;