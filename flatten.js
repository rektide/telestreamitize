function flatten(inp, rv){
	rv= rv|| []
	for(var k in inp){
		var v= inp[k]
		if(v instanceof Array){
			return flatten(v, rv)
		}else if(v){
			rv.push(v)
		}
	}
	return rv
}

module.exports= function(inp){
	return flatten(inp)
}
