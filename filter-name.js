var Promise= require('bluebird')

function filterNames(filterExpr){
	var filterRegexp= new RegExp(filterExpr|| process.argv[2]|| process.env.NAME_FILTER|| '')
	return function filterNames(name){
		return filterRegexp.test(name)
	}
}
module.exports= filterNames
