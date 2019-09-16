// js这种语言是单线程的
// 异步是js单线程缺点的一个解决方案
// 在执行ajax setTimeout 或者点击时间的，异步事件的一种解决办法
// callback 就是有一个参数是一个函数，在某个点执行这个函数

setTimeout(function() {
    console.log(1)
    setTimeout(function() {
        console.log(2)
    }, 1000)
}, 1000)


 // 回调地狱 在一堆的callback大家相互的嵌套

// promise 




