import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || "";

        this.observer = options.observer;
        this.store = options.store;
        this.unsubscribers = [];

        this.subscribe = options.subscribe || [];

        this.prepare();
    }

    // Setting Up Component till Initializing
    prepare() {}

    // Initialize Component
    // Add DOM Listeners
    init() {
        this.initDOMListeners();
    }

    // Returns Component Template
    toHTML() {
        return "";
    }

    storeChanged() {}

    // Notify listeners
    $dispatch(event, ...args) {
        this.observer.dispatch(event, ...args);
    }

    // Subscribe for events
    $on(event, callback) {
        const unsubscribe = this.observer.subscribe(event, callback);
        this.unsubscribers.push(unsubscribe);
    }

    $storeDispatch(action) {
        this.store.dispatch(action);
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Destroy Component
    // Clear Listeners
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    }
}
