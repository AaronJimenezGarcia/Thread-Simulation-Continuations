function callcc(foo) {
    foo.cc = new Continuation;
    return foo();
}

function f() {
    this.cc;
    return 2;
}

var result = callcc(f);
print(f.cc);
print(result);
if (result === 2) f.cc(3);
