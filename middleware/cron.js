/* 
 * @Author: boxizen
 * @Date:   2015-12-05 00:20:54
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-16 01:40:39
 */

'use strict';

var Schedule = require('node-schedule'),
    mq = require('../components/mq/mq'),
    Entry = require('../components/entry/entry');

// 定时任务
function cronJob() {
    var rule = new Schedule.RecurrenceRule(),
        time = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    rule.second = time;
    Schedule.scheduleJob(rule, function() {
        Entry.validate(function(err, results) {
            results.forEach(function(item) {
                var crtTime = new Date().valueOf();
                var dis = crtTime - item.get('lastUpdatedAt');
                // 更新Entry表数据
                if (dis > item.get('updateInterval')) {
                    Entry.update({
                        id: item.id,
                        active: '1'
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                    });
                }
            })
        })
    });
}
exports.cronJob = cronJob;