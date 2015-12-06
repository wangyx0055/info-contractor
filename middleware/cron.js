/* 
 * @Author: boxizen
 * @Date:   2015-12-05 00:20:54
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-05 01:35:03
 */

'use strict';

var Schedule = require('node-schedule'),
    mq = require('../components/mq/mq'),
    Clue = require('../components/clue/clue');

// 定时任务
function cronJob() {
    var rule = new Schedule.RecurrenceRule(),
        time = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    rule.second = time;
    Schedule.scheduleJob(rule, function() {
        mq.pop('clue', function(err, obj) {
            if (err || !obj) {
                console.log('从redis读任务时出错');
                console.log(err);
                console.log(obj);
            } else {
                var item = JSON.parse(obj);
                Clue.create(item, function(err, result) {});
            }
        })
    });
}
exports.cronJob = cronJob;