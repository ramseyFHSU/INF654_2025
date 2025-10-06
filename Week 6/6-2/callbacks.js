// Callback Example
function greeting(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  let name = prompt("Enter your name");
  callback(name);
}

processUserInput(greeting);

// Callback Hell
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log("Final result: " + finalResult);
    });
  });
});
