var Promise= require('bluebird')

var Messages = 'org.freedesktop.Telepathy.Channel.Interface.Messages'

function openMessage(opts){
	opts= opts|| {}
	var bus= opts.bus|| require('./bus')
	var emitter= opts.emitter|| new require('events').EventEmitter()
	return function(muc){
		return new Promise(function(resolve, reject){
			bus.getService(muc.dbusName).getInterface(muc.objectPath, Messages, function(err, messages){
				if(err){
					reject(err)
					return
				}
				messages.on('MessageReceived', function(msg){
					var o= {
						content: msg[1][0][1][1][0],
						sender: msg[0][1][1][1][0],
						room: muc.room,
						time: Date.now()
					}
					emitter.emit("message", o)
				})
				resolve()
			})
		})
	}
}
module.exports= openMessage
