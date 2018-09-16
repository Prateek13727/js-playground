// let x = 'outer scope';
// (function() {
//     console.log(x); // Reference error
//     let x = 'inner scope';
// }());


// var x = 5;
// function test(){
// 	console.log(x);
// 	var x = 3;
// }
// test();

const throttle = function(func, limit) {
  let throttleIn;
  return function() {
    const context = this;
    if(!throttleIn) {
      func.apply(context, arguments);
      throttleIn = true;
      setTimeout(() => {
        throttleIn = false;
      }, limit)
    }
  }
}

const throttleV2 = function(func, limit) {
	let lastRun;
	let lastFunc;
	return function(){
		const context = this;
		if(!lastRun) {
			func.apply(context, arguments)
			lastRun=Date.now();
		} else {
			if(Date.now() - lastRun > limit) {
				func.apply(context, arguments)
				lastRun=Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(()=>{
					func.apply(context, arguments);
					lastRun = Date.now();
				}, limit-(Date.now() - lastRun))	
			}
		}
	}
}

function b(){
	console.log("test");
}

const newFunc = throttleV2(b, 1000);
newFunc();
newFunc();
newFunc();
newFunc();
newFunc();


