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

const throttleV2 = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}



const dummy = function(){
  console.log("dummy");
}

//the function will execute once in every delay period.The V2 version 
//captures the last invocation happened within the delay period
let func = throttle(dummy, 5000);
// let func = throttleV2(dummy, 5000);

func();
func();
func();

