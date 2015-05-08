//function pump(){
	var names= require('./list-names')()
	var filteredNames= names.filter(require('./filter-name')('org\\.freedesktop\\.Telepathy\\.Connection\\.\\w+\\.irc\\..*'))
	var channels= filteredNames.map(require('./list-channels')()).then(require('./flatten'))
	//var filtered2= filtered1.then(require('./filter-channel')())
	var emitter= new (require('events').EventEmitter)()
	var messages= channels.map(require('./open-messages')({emitter: emitter}))
//	return messages.thenReturn(emitter)
//}


if(module === require.main){
	filteredNames.then(function(got){
		console.log('filtered', got)
	}, function(bad){
		console.error(bad)
		process.exit(1)
	})

	channels.then(function(got){
		console.log('channels '+ JSON.stringify(got))
	}, function(bad){
		console.error(bad)
		process.exit(1)
	})

	emitter.on('#node.dc', function(){
		console.log('yeah!', JSON.stringify(arguments))
	})
}
