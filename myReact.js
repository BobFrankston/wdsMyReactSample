let globalId = 0;
let globalParent;
export class mrc {
    constructor(parent, component, _props) {
        this.parent = parent;
        this.component = component;
        this._props = _props;
    }
    get props() {
        return this._props;
    }
    set props(value) {
        this._props = value;
    }
    static getmrc(parent, component, props) {
        let mymrc = mrc.mrcmap.get(parent);
        if (!mymrc)
            mrc.mrcmap.set(parent, mymrc = new mrc(parent, component, props));
        return mymrc;
    }
    render() {
        this.parent.textContent = this.component(this);
        ;
    }
}
mrc.mrcmap = new Map();
export class mrr extends mrc {
    constructor(parent, component, props) {
        super(parent, component, props);
        this.parent = parent;
        this.component = component;
    }
    get props() { return super.props; }
    ;
    static getmrr(parent, component, props) {
        let mymrr = mrc.mrcmap.get(parent);
        if (!mymrr)
            mrc.mrcmap.set(parent, mymrr = new mrr(parent, component, props));
        return mymrr;
    }
    useEffect(callback, dependencies) {
        const dependenciesChanged = !this.ueDependencies || dependencies.some((dep, i) => this.ueDependencies[i] !== dep);
        if (dependenciesChanged) {
            if (this.ueCleanup)
                this.ueCleanup();
            this.ueCleanup = callback();
            this.ueDependencies = dependencies;
        }
    }
    useState(initialState) {
        if (this.usValue == undefined) // use ??
            this.usValue = typeof initialState == "function" ? initialState(0) : initialState;
        const setState = (state) => {
            this.usValue = typeof state == 'function' ? state(this.usValue) : state;
            this.render();
        };
        return [this.usValue, setState];
    }
    useMemo(callback, dependencies) {
        try {
            const dependenciesChanged = !this.umDependencies || dependencies.some((dep, i) => this.ueDependencies[i] !== dep);
            if (dependenciesChanged) {
                this.umValue = callback();
                this.ueDependencies = dependencies;
            }
            return this.umValue;
        }
        catch (e) {
            debugger;
            throw e;
        }
    }
}
//# sourceMappingURL=MyReact.js.map