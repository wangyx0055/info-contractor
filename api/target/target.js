/* 
* @Author: boxizen
* @Date:   2015-11-25 10:58:42
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-25 14:55:59
*/

'use strict';

var AV = require('avoscloud-sdk'),
    conf = require('../../conf');

AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var TestObject = AV.Object.extend('TestObject');

// 添加线索
function saveTarget(req, res) {
    var testObject = new TestObject();

    testObject.save({
        foo: 'bar'
    }, {
        success: function(object) {
            console.log('LeanCloud works!');
        }
    });
}

module.exports = [
    ['all', '/clue/saveTarget', saveTarget]
]