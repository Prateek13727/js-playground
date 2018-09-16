const bind = function(context, func) {
	const newContext = context;
	const argumens = this.arguments;
	return function(){
		func.apply(newContext, arguments)
	}
}


