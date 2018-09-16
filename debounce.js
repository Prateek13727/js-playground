const debounce = function(func, delay) {
	let debounceHandler;
	return function() {
		const context = this;
		clearTimeout(debounceHandler);
		debounceHandler = setTimeout(() => {
			func.apply(context, arguments);
		}, delay);
	}
}

const dummy = function(){
	console.log("dummy");
}

const func = debounce(dummy, 5000);

//the function will execute after the mentioned delay i.e. when everything is ready.That's debounce for you;
func();
