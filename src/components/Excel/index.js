import { $ } from "@core/DOM/DOM";
import { Observer } from "@core/observer/Observer";
import { StoreSubscriber } from "@core/store/storeSubscriber";

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.observer = new Observer();
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const $root = $.create("div", "app");

        const componentOptions = {
            observer: this.observer,
            store: this.store,
        };

        this.components = this.components.map((Component) => {
            const $el = $.create("div", Component.className);
            const component = new Component($el, componentOptions);

            $el.html(component.toHTML());
            $root.append($el);

            return component;
        });

        return $root;
    }

    init() {
        this.subscriber.subscribeComponents(this.components);

        this.components.forEach((component) => {
            component.init();
        });
    }

    destroy() {
        this.components.forEach((component) => component.destroy());
        this.subscriber.unsubscribeFromStore();
    }
}
