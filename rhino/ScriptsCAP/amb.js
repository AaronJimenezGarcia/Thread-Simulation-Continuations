// Needs Rhino (https://developer.mozilla.org/es/docs/Rhino)
// *MUST* be called:
// java -cp rhino1.7.7.2/lib/rhino-1.7.7.2.jar org.mozilla.javascript.tools.shell.Main -opt -2 amb.js
// (this adds tail-call optimization, among other things)

function current_continuation() {
    return new Continuation();
}

var { amb_reset, fail, amb, assert } =
    ( function () {

      let fail_stack = [];

      function amb_reset() {
        fail_stack = [];
      }
      
      function fail() {
        if (fail_stack.length > 0) {
          let back_track_point = fail_stack.pop();
          back_track_point(back_track_point);
        } else {
          throw 'back-tracking stack exhausted!';
        }
      }
      
      function amb(choices) {
        let cc = current_continuation();
        if (choices && choices.length > 0) {
          let choice = choices.shift();
          fail_stack.push(cc);
          return choice;
        } else {
          return fail();
        }
      }
      
      // assert(condition) will cause
      // condition to be true, and if there
      // is no way to make it true, then
      // it signals and error in the program.
      
      function assert(condition) {
        if (condition) {
          return true;
        } else {
          fail();
        }
      }
      
      return { amb_reset: amb_reset, fail: fail, amb: amb, assert: assert }
    }());




// Exemple senzill (treure els comentaris per executar)

var a = amb([1,2,3,4,5,6,7]);
var b = amb([1,2,3,4,5,6,7]);
var c = amb([1,2,3,4,5,6,7]);

assert( ((c*c) === (a*a + b*b)) );

print(a,' -- ',b,' -- ', c);

assert( (b < a) );

print(a,' -- ',b,' -- ', c);

// $ java -cp rhino1.7.7.2/lib/rhino-1.7.7.2.jar org.mozilla.javascript.tools.shell.Main -opt -2 amb.js
// 3  --  4  --  5
// 4  --  3  --  5
// 4  --  3  --  5

