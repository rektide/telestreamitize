function pump(){
	var names= require('./list-names')()
	var filteredNames= names.filter(require('./filter-name')('org\\.freedesktop\\.Telepathy\\.Connection\\.\\w+\\.irc\\..*'))
	var channels= filteredNames.map(require('./list-channels')()).then(require('./flatten'))
	//var filtered2= filtered1.then(require('./filter-channel')())
	var emitter= new (require('events').EventEmitter)()
	emitter.names= filteredNames
	emitter.channels= channels
	var messages= channels.map(require('./open-messages')({emitter: emitter}))
	return messages.thenReturn(emitter)
}
module.exports= pump

if(module === require.main){
	var emitter= pump()
	emitter.then(function(){
		emitter.on('#node.dc', function(){
			console.log('yeah!', JSON.stringify(arguments))
		})
	})
}
