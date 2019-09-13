var finalitza = new Continuation();

function foo(finalitza) {
    print("entra a la funcio i cridem a la continuacio");
    finalitza();
    print("no arribara mai");
}

foo(finalitza);