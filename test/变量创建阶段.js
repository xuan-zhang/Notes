
// 例子一
console.log(foo); // ƒ foo() { console.log('function foo') }

function foo() {
    console.log('function foo')
}

console.log(foo); // ƒ foo() { console.log('function foo') }
var foo = 20;

console.log(foo); // 20


// 例子二
console.log(foo); // undefined
var foo = 20;

console.log(foo); // 20
function f00() {
    console.log('function foo')
}
console.log(foo); // 20

// 例子三
console.log(foo);// ƒ foo() { console.log('function foo') }
var foo;
console.log(foo);// ƒ foo() { console.log('function foo') }
function foo() {
    console.log('function foo')
}
console.log(foo);// ƒ foo() { console.log('function foo') }

// 例子四
console.log(foo);

function foo() {
    console.log('function foo')
}

console.log(foo);
var foo;
console.log(foo);
