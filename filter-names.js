var Promise= require('bluebird')

function filterNames(filterExpr){
	var filterRegexp= new RegExp(filterExpr|| process.argv[2]|| process.env.NAME_FILTER|| '')
	function filterPredicate(name){
		return filterRegexp.test(name)
	}
	return function(names){
		return Promise.resolve(names.filter(filterPredicate))
	}
}
module.exports= filterNames

if(module === require.main){
	var lines= []
	process.stdin.setEncoding('utf8')
	require('byline')(process.stdin).on('data', function(line){
		lines.push(line)
	})
	process.stdin.on('end', function(){
		filterNames()(lines).then(function(filtered){
			console.log(filtered)
		}, function(bad){
			console.error(bad)
			process.exit(1)
		})
	})
}
