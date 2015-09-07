
var ExecutorGroup = function(limit,option,executor){
    if(typeof option === 'function'){
        executor = option;
        option = {};
    } else if(typeof option != 'object'){
        option = {};
    }
    
    var state = 'IDLE';
    var runningjob = 0;
    var executorParamArray=[];
    option.errTryCnt = (undefined === option.errTryCnt)?Infinity:option.errTryCnt;
    option.name = option.name || '';
    
    var controler = function(){
        var _this=this;
        
        this.push=function(data){
            executorParamArray.push(data);
            process.nextTick(_this.run);
        };
        
        this.getState = function(){
            return state;
        };
        
        this.getName = function(){
            return option.name;
        }
        
        this.run=function(){
            if(executorParamArray.length === 0){
                return;           
            }
            if(runningjob >= limit){
                return;
            }
            var nextparam = executorParamArray.splice(0,1)[0];
            runningjob++;
            state = 'BUSY';

            var finish = function(){
                if(!--runningjob)state = 'IDLE';                
                process.nextTick(_this.run);
            }
            var work = function(errTryCnt){
                executor(nextparam,function(err){
                    if(err){
                        console.log(_this.getName(),'error:',err);
                        if(Infinity === errTryCnt){
                            return work(errTryCnt);
                        }else if(errTryCnt > 0){
                            return work(--errTryCnt);
                        }else{
                            return process.nextTick(finish);
                        }
                    }else{
                        process.nextTick(finish);
                    }
                });
            }
            work(option.errTryCnt);

        }
    }
    return new controler();
}

module.exports = ExecutorGroup;
