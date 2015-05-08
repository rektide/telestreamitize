var names= require('./get-names')()
var filtered= names.then(require('./filter-names')('org\\.freedesktop\\.Telepathy\\.Connection\\.\\w+\\.irc\\..*'))
//var messages= filtered.then(require('open-messages'))

if(module === require.main){
	filtered.then(function(got){
		console.log('filtered', got)
	}, function(bad){
		console.error(bad)
		process.exit(1)
	})
}
