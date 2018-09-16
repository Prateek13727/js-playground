function changeColor(totalCount, nextBox, maxBoxes) {
 let i = 1;
 let nextColor = "";
 while (i <= maxBoxes) { 	
 	totalCount++;
 	nextColor = window.getComputedStyle(document.getElementById(`box-${nextBox}`), null).getPropertyValue("background-color");
 	setDelay(i, nextColor, totalCount);
 	if (nextBox === maxBoxes) {
 		nextBox = 1;
 	} else {
 		nextBox++;	
 	}
 	i++;
 }
}

function setDelay(i, nextColor, totalCount) {
	setTimeout(() => {	
		// console.log("onScreen");
		// console.log(totalCount)
		// console.log(i);
		// console.log(nextColor)
		document.getElementById(`box-${i}`).style.backgroundColor = nextColor;
 	}, totalCount*1000)
}
	
const maxBoxes = 4;
const maxIterations = 10;
let totalCount = 0;
let j = 1;
let nextBox = maxBoxes;
while (j <= maxIterations) {
	// console.log("iterations");
	// console.log(j);
	changeColor(totalCount, nextBox, maxBoxes);
	j++;
	totalCount = totalCount+4;
	if(nextBox > 1) {
		nextBox--;
	} else {
		nextBox = 4;
	}
}

