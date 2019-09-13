function foo() { return 'global foo' };
function bar() { return 'global bar' };
function hoistMe() {
print(typeof foo); // function
print(typeof bar); // undefined
print(foo()); // local foo
print(bar()); // error
function foo() { return 'local foo' };
var bar = function() { return 'local bar' };
}
hoistMe();