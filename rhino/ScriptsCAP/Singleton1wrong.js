function Universe() {
	// the cached instance
	var instance = this;
	var temp = Universe;

	// proceed as normal
	this.start_time = 0;
	this.bang = "Big";

	// rewrite the constructor
	Universe = function Universe () {
		return instance;
	};
	Universe.prototype = temp.prototype;
	temp.prototype.constructor = Universe;
}

// adding to the prototype
Universe.prototype.nothing = true;
var uni = new Universe();

// again adding to the prototype
// after the initial object is created
Universe.prototype.everything = true;
var uni2 = new Universe();

// only the original prototype was
// linked to the objects
console.log(uni.nothing);
console.log(uni2.nothing);
console.log(uni.everything);
console.log(uni2.everything);

// that sounds right:
console.log(uni.constructor.name); // "Universe"
// but that's odd:
console.log(uni.constructor === Universe); // false
