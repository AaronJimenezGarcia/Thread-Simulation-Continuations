function foo()
{
}
print("foo.prototype " + foo.prototype);
print("Object.getPrototypeOf(foo) " + Object.getPrototypeOf(foo));
print("Object.getPrototypeOf(new foo()) " + Object.getPrototypeOf(new foo()));
print("Function.prototype " + Function.prototype);
print("Object.getPrototypeOf(Function.prototype) " + Object.getPrototypeOf(Function.prototype));
print("Object.prototype " + Object.prototype);
print("Object.getPrototypeOf(Function)" + Object.getPrototypeOf(Function));
print("Object.getPrototypeOf(foo.prototype) " + Object.getPrototypeOf(foo.prototype));
print("Object.getPrototypeOf(Object) " + Object.getPrototypeOf(Object));
print("Object.getPrototypeOf(Object.prototype) " + Object.getPrototypeOf(Object.prototype));

print(foo.prototype === Object.getPrototypeOf(foo));
print(foo.prototype === Object.getPrototypeOf(new foo()));
print(Function.prototype === Object.getPrototypeOf(foo));
print(Object.prototype === Object.getPrototypeOf(Function.prototype));
print(Function.prototype === Object.getPrototypeOf(Function));
print(Object.prototype === Object.getPrototypeOf(foo.prototype));
print(Function.prototype === Object.getPrototypeOf(Object));
print(null === Object.getPrototypeOf(Object.prototype));

//Solució:
//false
//No fa res
//true
//true
//true
//true
//true
//true
//true