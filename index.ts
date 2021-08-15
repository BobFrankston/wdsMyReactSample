import { mrr } from "./MyReact.js";
import Component from "./component.js";
import { DH_CHECK_P_NOT_PRIME } from "constants";

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