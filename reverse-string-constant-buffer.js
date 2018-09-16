function reverse(str) {
	let end = str.length;
	for(i=str.length-1; i>=0; i--) {
		if(str[i] === " ") {
			console.log(str.substring(i+1, end));
			end = i;
		}
	}
	console.log(str.substring(i+1, end));
}