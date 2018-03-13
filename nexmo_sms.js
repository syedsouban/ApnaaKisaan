var Nexmo = require('nexmo');
 
var nexmo = new Nexmo({
    apiKey:'1cb366e7' ,
    apiSecret:'FYg3kwMQOQIUyL4a' ,
	}, {
  	debug:true
  });



exports.send_Sms= (req,res) => {
	
		
		if(req.phoneNumber.required){
			var ph= req.phoneNumber;
			var msg=req.message;
			nexmo.message.sendSms( '919700799223', ph, msg,(err,data) => {
				if(err){
				console.log(err);
				}
				else{
				console.log(data);
				}
});




		}
}






