function inherit(p) {
	if (p == null) throw TypeError(); 
	if (Object.create)
		return Object.create(p); 
	var t = typeof p;
	if (t !== "object" && t !== "function") throw TypeError();
	function f() {}; // fer servir una funció “de mentida”
	f.prototype = p; // per assignar-hi el prototipus
	return new f(); // i forçar-ne l’herència
}

function A() {}
A.prototype.propA = "a";
function B() {}
B.prototype = inherit(A.prototype);
B.prototype.constructor = B;
B.prototype.propB = "b";
function C() {}
C.prototype = inherit(B.prototype);
C.prototype.constructor = C;
C.prototype.propC = "c";

var c = new C();
print(c.propA);
print(c.propB);
print(c.propC);
/*function A() {
	this.a = 0;
	this.b = 1;
}
A.prototype.retornaA = function() { return this.a }
A.prototype.retornaB = function() { return this.b }

function B() {
this.a = 100;
this.c = 101;
}
B.prototype = inherit(A.prototype);
B.prototype.constructor = B;
B.prototype.retornaC = function() { return this.c }
// provem...
// provem...
var aa = new A();
aa.a = aa.a + 1;
aa.b = aa.b + 1;
print(aa.retornaA());
print(aa.retornaB());

var bb = new B();
print(bb.retornaA());
print(bb.retornaB());
print(bb.retornaC());*/