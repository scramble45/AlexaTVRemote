var http = require('http'); // if going through a proxy that uses SSL change to "require('https');"
var net = require('net');

var local_ip = 'somewebsite';

var APP_ID = "amzn1.ask.skill.[yourIDHere]";

// Socket Connection
var HOST = local_ip;
var PORT = 6969;


/*
The AlexaSkill prototype and helper functions
*/
var AlexaSkill = require('./AlexaSkill');
   
var TVControl = function () {
    AlexaSkill.call(this, APP_ID);
};


// Extend AlexaSkill
TVControl.prototype = Object.create(AlexaSkill.prototype);
TVControl.prototype.constructor = TVControl;

//Ignore Certificate errors if using HTTPS communication
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

TVControl.prototype.intentHandlers = {
        TelevisionIntent: function (intent, session, response) {
        
        //No matter what she wants to tell you her opinion.
        
        function satisfyAlexa() {
            response.tell("Sure thing");
        };
        
        // Socket Connection
        var tcpsocketMSG = function (data) {
			var client = new net.Socket();
			var newMsg = data;

			client.connect(PORT, HOST, function() {
			    client.write(newMsg+'\r\n');
			});

			// Add a 'data' event handler for the client socket
			// data is what the server sent to this socket
			client.on('data', function(data) {

			    console.log('DATA: ' + data + '\r\n');
			    satisfyAlexa();
			    // Close the client socket completely
			    client.destroy();

			});

			// Add a 'close' event handler for the client socket
			client.on('close', function() {
			    console.log('Connection closed');
			});

		}

        // Obtain User Intent
        switch(intent.slots.Control.value) {
                
                // Same button is used
                case "power":
				case "power on":
				case "power off":
				case "off":
				case "on":
				case "turn on":
				case "turn off":
              		  tcpsocketMSG('power');
        		break;
           		
				case "volume up":
				case "turn up volume":
				case "turn up the volume":
				case "turn volume up":
				case "increase volume":
              		  tcpsocketMSG('volumeup');
        		break;
				
				case "volume down":
				case "turn down volume":
				case "turn down the volume":
				case "turn volume down":
				case "decrease volume":
              		  tcpsocketMSG('volumedown');
        		break;
				
				case "input 1":
				case "input one":
				case "source 1":
				case "source one":
				case "switch to input 1":
				case "switch to input one":
				case "switch input to 1":
				case "switch input to one":
				case "switch source to 1":
				case "switch source to one":
				case "switch to source 1":
				case "switch to source one":
                      tcpsocketMSG('source1');
        		break;
				
				case "input 2":
				case "input to":
				case "input too":
				case "source 2":
				case "source two":
				case "switch to input 2":
				case "switch to input to":
				case "switch to input too":
				case "switch to input two":
				case "switch input to 2":
				case "switch input to to":
				case "switch input to too":
				case "switch input to two":
				case "switch source to 2":
				case "switch source to to":
				case "switch source to too":
				case "switch source to two":
				case "switch to source 2":
				case "switch to source to":
				case "switch to source too":
				case "switch to source two":
              		  tcpsocketMSG('source2');
        		break;
				
				case "input 3":
				case "input three":
				case "source 3":
				case "source three":
				case "switch to input 3":
				case "switch to input three":
				case "switch input to 3":
				case "switch input to three":
				case "switch source to 3":
				case "switch source to three":
				case "switch to source 3":
				case "switch to source three":
              		  tcpsocketMSG('source3');
        		break;
				
				default:
                
                        if (intent.slots.Channel.value == null) {
                         response.tell("I didn't understand you, could you repeat that?");
                      }
						else {
                         console.log('Something else happend');
                      }		
                break;
        } 
					
    }
}


exports.handler = function (event, context) {
       
        var tvControl = new TVControl();
        tvControl.execute(event, context);
        
};
