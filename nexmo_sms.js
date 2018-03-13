var Nexmo = require('nexmo');
 
var nexmo = new Nexmo({
    apiKey:'1cb366e7' ,
    apiSecret:'FYg3kwMQOQIUyL4a' ,
	}, {
  	debug:true
  });

nexmo.message.sendSms( '919700799223',  '919700799223', "hello",(err,data) => {
	if(err){
		console.log(err);
	}
	else{
		console.log(data);
	}
});






