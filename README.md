#multido
- [![NPM version](https://badge.fury.io/js/multido.png)](http://badge.fury.io/js/multido)
- [![Dependencies Status](https://david-dm.org/sxyizhiren/multido.png)](https://david-dm.org/sxyizhiren/multido)
- [![Build Status](https://travis-ci.org/sxyizhiren/multido.png?branch=master)](https://travis-ci.org/sxyizhiren/multido)
- [![NPM Stats](https://nodei.co/npm/multido.png?downloads=true&stars=true)](https://npmjs.org/package/multido)
- [![NPM Downloads](https://nodei.co/npm-dl/multido.png?months=6)](https://npmjs.org/package/multido)

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
// errTryCnt, if worker pass error to callback, then group will retry errTryCnt times at most. if not set, will retry forever.
// name, set a name for this group, can use group.getName() to get it back. if not set, will equal to empty string '';
var option = {errTryCnt:3,name:'test_group'};
// limit , allowed threads to run worker at the same time. 
var limit = 3;
var group = new Multido(limit,option,worker);

group.push(param1);
group.push(param2);
group.push(param3);
group.push(param4);
group.push(param5);

```
