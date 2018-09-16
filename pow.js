function powerFunction(number, pow){
	let res = 1;
	let i = 0;
	while(i < pow) {
		res = res*number;
		i++;
	}
	return res;
}

console.log(powerFunction(2, 9));


