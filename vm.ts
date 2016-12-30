class VM {
    constructor(private __object: any, private __bind: any) {
        if (!Function.bind || !Object.defineProperty) {
            throw new Error('Required APIs not available.');
        }
        this.__object = this.bind(__object);
    }

    get proxyModel(): any{
        return this.__object;
    }

    private bind(object, path = []) {
        for (let key of Object.keys(object)) {
            let value = object[key], _path = [].slice.apply(path);
            _path.push(key);
            let _pathName = _path.join('.');
            Object.defineProperty(object, key, {
                configurable: true,
                enumerable: true,
                set: v => {
                    value = v;
                    if (this.__bind.binder.hasOwnProperty(_pathName)) {
                        let els = this.__bind.container.querySelectorAll(this.__bind.binder[_pathName]);
                        for (let el of els) {
                            if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
                                el.value = value;
                            } else {
                                el.innerHTML = value;
                            }
                        }
                    }
                    console.log(`set key ${_pathName} value ${JSON.stringify(value)}`);
                },
                get: () => value
            });

            if (Object.prototype.toString.apply(value) === '[object Object]') {
                object[key] = this.bind(value, _path);
            } else {
                object[key] = value;
            }
            if (this.__bind.binder.hasOwnProperty(_pathName)) {
                let els = this.__bind.container.querySelectorAll(this.__bind.binder[_pathName]);
                for (let el of els) {
                    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
                        el.addEventListener('input', () => {
                            object[key] = el.value;
                        });
                    }
                }
            }
        }
        return object;
    }
}

export default (object, bind) => {
    let vm = new VM(object, bind);
    return vm.proxyModel;
};
