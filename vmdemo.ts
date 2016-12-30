import VM from './vm';

let vm = VM({
    info: {
        name: {
            first: 'candy',
            last: 'sfm'
        },
        age: 10
    }
}, {
    container: document.body, // default is document.body
    binder: {
        'info.name.last': '.name-input' // vm key path -> element selector
    }
});

console.log(vm.info.name);
// vm.info.name = {
//     'first': 'nik',
//     'last': 'sun'
// };
vm.info.name.first = 'candy';
console.log(vm.info.name);
vm.info.age = 20;
console.log(vm.info.age);
