import VM from './vm';

let vm = VM({
    info: {
        name: 'niksun',
        age: undefined
    }
}, {
    container: document.body, // default is document.body
    binder: {
        'info.name': '.name-input' // vm key path -> element selector
    }
});

console.log(vm.info.name);
vm.info.name = 'candysfm';
console.log(vm.info.name);
vm.info.age = 20;
console.log(vm.info.age);
