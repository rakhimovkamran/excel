import { $ } from "@core/DOM";
import { Observer } from "../../core/Observer";

export class Excel {
    constructor(selector, options) {
        this.$element = $(selector);
        this.components = options.components || [];

        this.observer = new Observer();
    }

    getRoot() {
        const $root = $.create("div", "app");
        const componentOptions = {
            observer: this.observer,
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

    render() {
        this.$element.append(this.getRoot());
        this.components.forEach((component) => {
            component.init();
        });
    }

    destroy() {
        this.components.forEach((component) => component.destroy());
    }
}
