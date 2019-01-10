/*
async function testAsync() {
    return 'hello Async'
}
const result1 = testAsync();
console.log(result1) // Promise { 'hello Async' }

// async 标记的函数 返回出来的是Promise类型 没有return 返回的是Promise { undefined }
// 因为async会直接通过Promsie.resolve()封装成Promsie对象

// 所有async函数返回的值可以通过获取
testAsync().then((res) => {
   console.log(res) 
})

// 因为Promise是无等待的，所以在没有await的情况下执行async函数，他会立即执行，返回一个Promsie对象，并且不会阻塞后面语句，这和普通返回Promise对象的函数一样

// await到底在等待啥
// await在等待一个表达式返回值，这个表达式的执行结果是一个Promise对象或者是其他值(值没有限制)
// 所以await后面可以是一个普通函数的直接调用或者是一个简单的数据也行

*/

/*
console.log('====')

async function fn1 () {
    return 'fn1'
}

async function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve('fn2')
        }, 1000)
    })
}

// 注释： 带不带return区别很大
// 没有return fn2 返回的是一个简单的undefined, 相当于Promise().resolve(undefined) 然后到达await直接就同步执行了，
// 有return，fn2返回的是一个Promise对象，这时候会等待这个Promise对象的resolve执行完成，resolve执行完成之后，await就是resolve的值，等到resolve的时候，这个过程会阻塞后面的代码执行

async function fn3() {
    let v1 = await fn1();
    console.log(v1);
    let v2 = await fn2();
    let v3 = await 'v3'
    console.log(v1, v2, v3)
}
var fnv3 = fn3();
console.log('1', fnv3)

// fn2 不执行完毕，不会执行下面的代码

// await 等待了他要等的，然后做了啥
// await 等到了他要等的东西，一个promise对象或者其他简单的值
// await 是一个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西
// 如果他等到的不是一个Promise对象，那await表达式的运算结果就是它到的东西
// 如果他等到的是一个Promise对象，await就会忙活起来，等着Promise对象resolve, 然后得到resolve的值，作为await运算的结果

*/

/*
// async/await 帮助我们干了啥

// 上面说明了async会将其后的函数的返回值封装成一个Promise，await会等待这个Promise执行完成，并将其resolve结果返回出来

function fn6 () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('fn6_long_time')
        }, 2000)
    })
}

fn6().then((value) => {
    console.log(value);
})

function fn7() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('fn7_long_time')
        }, 2000)
    }) 
}

async function test1 () {
    let v = await fn7();
    console.log(v);
}
test1();

*/

// async/await 的优势

// 单个Promise不足以体现出来async/await的好处，如果需要处理多个Promise组成的then链，这时候优势就能体现出来

/*
function lt(n) {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(n + 200)
        }, n)
    })
}



function step1(n) {
    console.log('1'+n)
    return lt(n);
}

function step2(n) {
    console.log('2' + n)
    return lt(n);
}

function step3(n) {
    console.log('3' + n)
    return lt(n)
}

function doIt() {
    const time1 = 300;
    step1(time1)
    .then((time2) => {
        return step2(time2);
    })
    .then((time3) => {
        return step3(time3)
    })
    .then((res) => {
        console.log(res);
    })
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();

*/

/* 
function fn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(1)
            resolve(1)
        }, 200)
    }).then(function(res) {
        console.log('第二个then')
        setTimeout(() => {
            console.log('2', res+1)
            return res+1
        }, 300)
        return res
        
    })
    .then(function(res) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('中间then', res+1);
                resolve(res+1)
            }, 10000)
        })
    })
    .then(function(res) {
        console.log('第三个then')
        setTimeout(() => {
            console.log('3', res+1)
            return res+1
        }, 100)
        return res;
    })
}   

fn().then(function(res) {
    console.log(4, res);
})

*/


// 自己写了一段奇怪的代码，执行晚之后，我有几个问题，能帮我解答一下吗
// 1. fn9()这个函数妹纸行完毕，为啥会执行最后一行
// 2. fn9()里面的第二个then的返回值为啥第三个拿不到
// 3. fn9()第三个then会比第二个then先执行








