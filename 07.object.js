function Animal() {
    this.name = 'dog'
}

Animal.prototype.age = '10';
Animal.prototype.getAge = function() {
    console.log(this.age);
}

const dog = new Animal();

Object.defineProperty(dog, 'say', {
    value: '333',
    configurable: true,
    enumerable: false,
    writable: true
})

console.log(dog.constructor === Animal);
console.log(dog.hasOwnProperty('say'));
console.log(dog.hasOwnProperty('getAge'));
console.log(dog.hasOwnProperty('age'));
console.log(dog.hasOwnProperty('name'));
console.log(dog.isPrototypeOf(Animal.prototype));
console.log(Animal.prototype.isPrototypeOf(dog));
console.log(dog.prototypeIsEnumerable('say'))
