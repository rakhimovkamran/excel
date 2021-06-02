import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || "";
    }

    // Returns Component Template
    toHTML() {
        return "";
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}
