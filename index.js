import { mrr } from "./MyReact.js";
import Component from "./component.js";
let propCount = 0;
function renderComponent() {
    for (const rb of [1, 2]) {
        try {
            const root = document.getElementById(`root${rb}`);
            const buttonElem = document.getElementById(`btn-count${rb}`);
            const mymrr = mrr.getmrr(root, Component, { propCount, buttonElem });
            mymrr.render();
        }
        catch (e) {
            debugger;
            throw e;
        }
    }
}
renderComponent();
//# sourceMappingURL=index.js.map