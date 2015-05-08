var Promise= require('bluebird')

function getNames(bus){
	bus= bus|| require('./bus')

	return new Promise(function(resolve, reject){
		bus.getService('org.freedesktop.DBus').getInterface('/', 'org.freedesktop.DBus', function(err, dbusManager){
			if(err){
				reject(err)
				return
			}
			dbusManager.ListNames(function(err, names){
				if(!err){
					resolve(names)
				}else{
					reject(err)
				}
			})
		})
	})
}
module.exports= getNames

if(module === require.main){
	getNames().then(function(names){
		console.log(names)
	}, function(bad){
		console.warn(bad)
		process.exit(1)
	})
}
