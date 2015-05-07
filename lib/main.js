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
		
		this.setErrorTryCnt= function(cnt){
			option.errorTryCnt=cnt;
		}
		
		this.run=function(){
			if(state)return;
			if(executorParamArray.length===0)return;			
			
			var arrayForExecutor = executorParamArray.splice(0,limit);
			
			function work(errTryCnt){
				state=true;
				async.mapLimit(arrayForExecutor,limit,executor,function(err){
					state=false;
					if(err){
						console.log(option.name,'error.',err);
						if(undefined === errTryCnt ){
							work(option.errorTryCnt);
						}else if(errTryCnt > 0){
							errTryCnt--;
							work(errTryCnt);
						}else{
							process.nextTick(_this.run);
						}
					}else{
						process.nextTick(_this.run);
					}

				});
			}
			work(option.errorTryCnt);			

		}
	}
	return new controler();
}

module.exports = ExecutorGroup;
