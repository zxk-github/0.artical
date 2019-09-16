function bar() {
    return foo;
    foo = 10;
    function foo() {}
    var foo = '11';
}
// alert(typeof bar());  undefined

// 函数和变量的申明会提前，但是如果在函数使用之前进行对函数名的变量进行赋值，这时候会覆盖函数的引用
function fn() {
    return "1" - - "1"
}
// 2

function fn2 () {
    return [] + [] + 'foo'.split('')
}

// [f,o,o]

function fn3() {
    return new Array(5).toString();
} 
// ,,,,

function fn4 () {
    var myArr = ['foo', 'bar', 'baz'];
    myArr.length = 0;
    myArr.push('bin');
    console.log(myArr);
}
fn4()
// ['bin']

/**
 *  arr.length 和 arr = [] 之间有区别吗 
 *  */

function fn5() {
    return String('Hello') === 'Hello';
}
// true  ??? 

// String() 和 toString()之间区别
// false 

var x = 0;
function foo() {
    x++;
    console.log(x);
    this.x = x;
    return foo;
}
var bar1 = new foo;
// var bar = new new bar1;
// console.log('--->', bar);

// undefined

function fn6( ) {
    return "This is a string" instanceof String;
}
console.log(fn6())
// false ???

function fn7 () {
    var bar = 1,
    foo = {};

    foo: {
        bar: 2;
        baz: ++bar;
    };
    console.log(foo)
    return foo.baz + foo.bar + bar;

}
console.log(fn7())

function fn8() {
    var myArr = ['foo', 'bar', 'baz'];
    myArr[2];
    console.log('2' in myArr);
}
fn8();

function fn9() {
    var arr = [];
    arr[0]  = 'a';
    arr[1]  = 'b';
    arr.foo = 'c';
    console.log(arr.length);
}
fn9()

function fn10() {
    return 10 > 9 > 8 === true;
}
fn10();  // false 
//  逻辑运算符隐式转换

function foo(a, b) {
    arguments[1] = 2;
    alert(b);
}
foo(1);



