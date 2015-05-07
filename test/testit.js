var Multido=require('../lib/main');
var assert=require('assert');

var worker=function(param,callback){
	process.nextTick(callback);
}

var workerWithErr=function(param,callback){
	var err=new Error('AnyError');
	setTimeout(callback,100,err);
}

/////////////////////////////////
var group=Multido(3,{name:'TESTIT'},worker);
group.push('ANY');
group.push('ANY');
group.push('ANY');
group.push('ANY');
group.push('ANY');
group.push('ANY');
group.run();
assert.equal(group.getState(),true);
/////////////////////////////////
var errgroup=Multido(3,{name:'TESTITERR'},workerWithErr);
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.run();
assert.equal(errgroup.getState(),true);
/////////////////////////////////

setTimeout(function(){
	assert.equal(group.getState(),false);
	assert.equal(group.getName(),'TESTIT');
},500);

setTimeout(function(){
	assert.equal(errgroup.getState(),true);
	assert.equal(errgroup.getName(),'TESTITERR');
	errgroup.setTotalErrorTryTime(1);
},500);




