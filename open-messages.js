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
					console.log(JSON.stringify(msg))
					emitter.emit(muc.room, {
						content: msg[1][0][1][1][0],
						sender: msg[0][1][1][1][0],
						room: muc.room,
						time: Date.now()
					})
				})
			})
		})
	}
}
module.exports= openMessage
