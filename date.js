


module.exports.getdate=function (){
var day=new Date();
var day2;
var options ={

    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
    
}



day2=day.toLocaleDateString('en-us',options);
return day2;

}
module.exports.getday=function(){


    var day=new Date();
    var day2;
    var options ={
    
        weekday:"long"
    
        
    }
    
    
    
    day2=day.toLocaleDateString('en-us',options);
    return day2;
}


console.log(module.exports);