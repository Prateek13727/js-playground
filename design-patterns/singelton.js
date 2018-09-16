const singelton = (function() {
	var instance;

	function init(){
		return {
			firstName: "Prateek",
			lastName: "Pandey"	
		}
	}

	function getInstance() {
		if(!instance) {
			instance = init();
		}
		return instance;
	}
	return {
		getInstance
	}
}());

const newObj1 = singelton.getInstance();
const newObj2 = singelton.getInstance();

if(newObj2 == newObj1) {
	console.log("Both objects are same");
}
