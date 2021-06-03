class DOM {
    constructor(selector) {
        this.$element =
            typeof selector === "string"
                ? document.querySelector(selector)
                : selector;
    }

    html(markup) {
        if (typeof markup === "string") {
            this.$element.innerHTML = markup;
            return this;
        }

        return this.$element.outerHTML.trim();
    }

    clear() {
        this.html("");
        return this;
    }

    append(node) {
        node = node instanceof DOM ? node.$element : node;

        !Element.prototype.append
            ? this.$element.appendChild(node)
            : this.$element.append(node);

        return this;
    }

    on(eventType, callback) {
        this.$element.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$element.removeEventListener(eventType, callback);
    }

    get data() {
        return this.$element.dataset;
    }

    closest(selector) {
        return $(this.$element.closest(selector));
    }

    getCoords() {
        return this.$element.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$element.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.entries(styles).map(
            ([property, value]) => (this.$element.style[property] = value)
        );
    }
}

export function $(selector) {
    return new DOM(selector);
}

$.create = (tagname, classes = "") => {
    const el = document.createElement(tagname);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};
