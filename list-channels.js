var Promise= require('bluebird')

var Properties = 'org.freedesktop.DBus.Properties'
var Requests = 'org.freedesktop.Telepathy.Connection.Interface.Requests'

function listChannels(bus){
	bus= bus|| require('./bus')
	return function listChannels(name){
		return new Promise(function(resolve, reject){
			var objectPath= '/' + name.replace(/\./g, '/')
			bus.getService(name).getInterface(objectPath, Properties, function(err, props){
				if(err){
					reject(err)
					return
				}
				props.Get(Requests, 'Channels', function(err, channels){
					if(err){
						reject(err)
						return
					}

					var good= []
					for(var i= 0; i< channels.length; ++i){
						var channel= channels[i]
						try{
							good.push({
								dbusName: name,
								objectPath: channel[0][0][0],
								room: channel[0][0][1][4][1][1][0],
							})
						}catch(ex){
						}
					}
					resolve(good)
				})
			})
		})
	}
}
module.exports= listChannels
