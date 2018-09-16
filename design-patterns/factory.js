//factory
const Animal = function(name) {
	const animal = {};
	animal.name = name;
	animal.walk = function() {
		console.log("walk")
	}
	return animal;
}

//factory with mixins
const canKill = {
  kill() {
    console.log("I can kill")
  }
}

k1 = Object.assign(Animal("k1"), canKill)