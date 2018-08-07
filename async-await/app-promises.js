const users = [{
	id: 1,
	name: 'Jim',
	schoolId: 999
},{
	id: 2,
	name: 'Jessica',
	schoolId: 888
}]

const grades = [{
	id:1,
	grades: 90,
	schoolId: 999
},{
	id:2,
	grades: 83,
	schoolId: 888
},{
	id:1,
	grades: 100,
	schoolId: 999
}];

const getUser = (id) => {
	return new Promise((resolve, reject) => {
		const user = users.find((user) => user.id === id);
		if(user) {
			resolve(user);
		} else {
			reject(`Could not find users with id ${id}`);
		}
	})
}

const getGrades = (schoolId) => {
	return new Promise((resolve, reject) => {
		resolve(grades.filter((user) => user.schoolId === schoolId))
	});
}

const getStatus = (userId) => {
	let userObj;
	return getUser(userId).then((user) => {
		userObj = user;
		return getGrades(user.schoolId)
	})
	.then((grades) => {
		let average =0;
		if(grades.length > 0) {
			average = grades.map(grade => grade.grades).reduce((a, b) => a+b)/grades.length;	
		}
		return `User with id ${userObj.id} has achieved ${average} average grades` 
	});
}

const getAltStatus = async(userId) => {
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);
	let average =0;
	if(grades.length > 0) {
		average = grades.map(grade => grade.grades).reduce((a, b) => a+b)/grades.length;	
	}
	return `User with id ${user.id} has achieved ${average} average grades`
}

getAltStatus(1).then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
})
