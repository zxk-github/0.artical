const isFunction = variable => typeof variable === 'function';
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor (handle) {
        if(!isFunction(handle)) {
            throw new Error('MyPromise must accept a function');
        }

        // 添加状态
        this._statue = PENDING;
        this._value = undefined;

        // 因为then方法支持多个调用，所以维护两个数组，将每次then方法注册的回调函数添加到数组中，等待执行
        // 添加成功回调函数队列
        this.fulfilledQueues = [];

        // 添加失败回调函数队列
        this._rejectedQueues = [];

        // 执行的handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch {
            this._reject(err);
        }

    }

    _resolve(val) {
        if(this._statue !== FULFILLED ) {
            return ;
        }

        const runFulfilled = () => {
            this._statue = FULFILLED;
            this._value = val;
            let cb;
            while (cb = this._fulfilledQueues.shift()) {
                cb(val);
            }
        }

        const runRejected = () => {
            
        }
        
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(() => run(), 0)
    }

    _reject (err) {
        if(this._statue !== REJECTED) {
            return ;
        }
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._statue = REJECTED;
            this._value = err;
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(err);
            }
        }

        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0);

    }

    then(onFulfilled, onRejected) {
        const {_value, _status} = this;
        
        // then 返回的是一个全新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if(!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value);
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch(err) {
                    onRejectedNext(err)
                }
            }

            let rejected = error => {
                try {
                    if(!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejectedNext(error);
                        if(res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象。必须等待其状态改变后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch(err) {
                    onRejectedNext(err);
                }
            }

            switch(_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING: 
                    this._fulfilledQueues.push(onFulfilled);
                    this._rejectedQueues.push(onRejected);
                    break;
                case FULFILLED:
                    onFulfilled(_value);
                    break;
                case REJECTED: 
                    onRejected(_value);
                    break;            
            }
            
        })

    }

    
    
    
}

// handle中的resolve和reject专门用于改变promise的值和promise的状态
// 因为then方法支持多个调用，所以维护两个数组，将每次then方法注册的回调函数添加到数组中，等待执行
// then方法返回的是一个新的Promise对象。并且需要将回调函数加入到执行队列中

// 返回的新的Promise对象什么时候改变状态，改变哪种状态呢

// 返回的新的promise对象状态依赖于当前then方法回调函数执行的情况以及返回值
// then是不是函数，回调函数执行是否出错，返回值是否为Promise对象




