var Multido=require('../lib/main');
var assert=require('assert');

var worker=function(param,callback){
	assert.equal('ANY',param);
	process.nextTick(callback);
}

var workerWithErr=function(param,callback){
	assert.equal('ANY',param);
	var err=new Error('AnyError is Expected.');
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
assert.equal(group.getState(),'BUSY');
/////////////////////////////////
var errgroup=Multido(3,{name:'TESTITERR', errTryCnt:10},workerWithErr);
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.push('ANY');
errgroup.run();
assert.equal(errgroup.getState(),'BUSY');
/////////////////////////////////

setTimeout(function(){
	assert.equal(group.getState(),'IDLE');
	assert.equal(group.getName(),'TESTIT');
},10);

setTimeout(function(){
	assert.equal(errgroup.getState(),'BUSY');
	assert.equal(errgroup.getName(),'TESTITERR');
},1999);

setTimeout(function(){
	assert.equal(errgroup.getState(),'IDLE');
	assert.equal(errgroup.getName(),'TESTITERR');
},3000);




