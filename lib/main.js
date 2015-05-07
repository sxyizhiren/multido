var async = require('async');
var extend = require('util')._extend;


var ExecutorGroup = function(limit,optionToSet,executor){
	var executorParamArray=[];
	var state=false;
	var option = extend({}, optionToSet);
	var controler = function(){
		var _this=this;
		
		this.push=function(data){
			executorParamArray.push(data);
		};
		
		this.getState = function(){
			return state;
		};
		
		this.getName = function(){
			return option.name;
		}
		
		this.setTotalErrorTryTime= function(cnt){
			option.allowTotalErrorTime=cnt;
		}
		
		this.run=function(){
			if(state)return;
			if(executorParamArray.length===0)return;
			
			state=true;
			var arrayForExecutor = executorParamArray.splice(0,limit);
			async.mapLimit(arrayForExecutor,limit,executor,function(err){
				state=false;
				if(err){
					if(undefined === option.allowTotalErrorTime || option.allowTotalErrorTime > 0){
						for(var param in arrayForExecutor){
							executorParamArray.unshift(param);
						}
						if(undefined != option.allowTotalErrorTime)option.allowTotalErrorTime--;
					}										
					console.log(option.name,'error.',err);
				}
				process.nextTick(_this.run);

			})
		}
	}
	return new controler();
}

module.exports = ExecutorGroup;
