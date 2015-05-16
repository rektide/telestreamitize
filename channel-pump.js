var events= require('events'),
  listNames= require('./list-names'),
  filterNames= require('./filter-name'),
  flatten= require('./flatten'),
  listChannels= require('./list-channels'),
  openMessages= require('./open-messages')

function pump(opts){
	var nameFilter= opts && opts.nameFilter|| 'org\\.freedesktop\\.Telepathy\\.Connection\\.\\w+\\.irc\\..*'
	var channelFilter= opts && opts.channelFilter|| '#node.dc'

	var names= listNames()
	var filteredNames= names.filter(filterNames(nameFilter))
	var channels= filteredNames.map(listChannels()).then(flatten)
	var filteredChannels= channels.filter(function(channel){
		return channel.room.indexOf(channelFilter) === -1
	})
	var emitter= new (events.EventEmitter)()
	emitter.names= filteredNames
	emitter.channels= channels
	var messages= channels.map(openMessages({emitter: emitter}))
	return messages.thenReturn(emitter)
}
module.exports= pump

if(module === require.main){
	var _emitter= pump()
	_emitter.then(function(emitter){
		emitter.channels.then(function(channels){
			console.log('channels', channels)
		})
		emitter.on('#node.dc', function(){
			console.log('yeah!', JSON.stringify(arguments))
		})
	}, function(err){
		console.error('error connecting', err)
	})
}
