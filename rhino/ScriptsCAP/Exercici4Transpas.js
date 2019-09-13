var o = {
	m: function() {
		var self = this;
		print(this === o); // true
		f();
		
		function f() {
			print(this);
			print(this === o); // false
			print(self === o); // true
		}
	}
}
o.m();