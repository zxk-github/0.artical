function a(){
    console.log("aaaaa")
    return new Promise((resolve, reject) => {
        console.log('promsie a')
        setTimeout(() => {
            console.log('resolve a')
            resolve('a')
        }, 10000)
    })
}

function c() {
    console.log('cccccc');
    return new Promise((resolve, reject) => {
        console.log('promsie c')
        setTimeout(() => {
            console.log('resolve c')
            resolve('c')
        }, 5000)
    })
}

function b() {
    console.log('bbbb');
}

function d() {
    console.log('dddd');
}

async function fn() {
    const resA = a();
    const resC = c();
    await resA;
    b();
    await resC;
    d();
}
fn();


