import { mrr } from './MyReact.js';

export default function Component(mymrr: mrr) {
    let { propCount, buttonElem } = mymrr.props;
    const [count, setCount] = mymrr.useState(5);
    const propCountDoubled = mymrr.useMemo(() => propCount * 2, [propCount]);

    mymrr.useEffect(() => {
        // As any is my sleaze out since I can't figure out why I can't just use it
        const handler = () => (setCount as any)((currentCount: number) => currentCount + 1);
        buttonElem.addEventListener("click", handler)

        return () => buttonElem.removeEventListener("click", handler)
    }, [buttonElem]);

    return `
        State: ${count}
        Prop: ${propCount},
        Prop Doubled; ${propCountDoubled}
    `;
}
