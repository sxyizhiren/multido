#multido

create a work group, work group can run job with same action but different parameter.

you can push new job to the group.

like a thread pool, once you push to the group, if current less than specified threads run, this job will run immediately.

if not, will wait a job finish ,then run.

##install:

npm install multido

##Usage:

```
var Multido = require('multido');
var worker=function(param,callback){
    // do some thing here
    // callback(); 
    // or
    // callback(err);
	process.nextTick(callback);
}
var option = {errTryCnt:3,name:'test_group'};
var group = new Multido(3,option,worker);

group.push(param1);
group.push(param2);
group.push(param3);
group.push(param4);
group.push(param5);

```
