var a = [];
for(var i = 0; i < 5; i++) {
    a.push(function() {
        console.log(i);
    })
}
a[1]();