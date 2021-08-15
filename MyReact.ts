import { format } from "path/posix";
import { compileFunction } from "vm";

let globalId = 0;
let globalParent: HTMLElement;

export type component = (mymrc: any) => string; // Any till we figure this out

export class mrc {
    public get props(): {} {
        return this._props;
    }
    public set props(value: {}) {
        this._props = value;
    }
    protected constructor(
        public parent: HTMLElement,
        public component: component,
        private _props: {}) {

    }
    protected static mrcmap = new Map<HTMLElement, mrc>();

    public static getmrc(parent: HTMLElement, component: component, props: {}) {
        let mymrc = mrc.mrcmap.get(parent);
        if (!mymrc) mrc.mrcmap.set(parent, mymrc = new mrc(parent, component, props));
        return mymrc;
    }

    render() {
        this.parent.textContent = this.component(this);;
    }
}

export class mrr extends mrc {
    private constructor(public parent: HTMLElement, public component: component, props: {}) {
        super(parent, component, props);
    }

    get props() { return super.props as { propCount: number, buttonElem: HTMLButtonElement } };

    public static getmrr(parent: HTMLElement, component: component, props: {}) {
        let mymrr: mrr = mrc.mrcmap.get(parent) as mrr;
        if (!mymrr) mrc.mrcmap.set(parent, mymrr = new mrr(parent, component, props));
        return mymrr;
    }

    ueCleanup: Function
    ueDependencies: any[];
    useEffect(callback: Function, dependencies: any[]) {
        const dependenciesChanged = !this.ueDependencies || dependencies.some((dep: any, i: number) => this.ueDependencies[i] !== dep);
        if (dependenciesChanged) {
            if (this.ueCleanup) this.ueCleanup();
            this.ueCleanup = callback();
            this.ueDependencies = dependencies
        }
    }

    usValue: number;
    useState(initialState: ((n: number) => number) | number) {
        if (this.usValue == undefined) // use ??
            this.usValue = typeof initialState == "function" ? initialState(0) : initialState;
        const setState = (state: ((n: number) => number) | number) => {
            this.usValue = typeof state == 'function' ? state(this.usValue) : state;
            this.render();
        }
        return [this.usValue, setState];
    }

    umValue: number;
    umDependencies: any[];
    useMemo(callback: Function, dependencies: any[]) {
        try {
            const dependenciesChanged = !this.umDependencies || dependencies.some((dep: any, i: number) => this.ueDependencies[i] !== dep);
            if (dependenciesChanged) {
                this.umValue = callback();
                this.ueDependencies = dependencies
            }
            return this.umValue;
        }
        catch (e) {
            debugger;
            throw e;
        }
    }
}
