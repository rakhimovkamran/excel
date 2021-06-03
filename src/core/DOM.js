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

    text(content) {
        if (typeof content === "string") {
            this.$element.textContent = content;
            return this;
        }

        if (this.$element.tagName.toLowerCase() === "input") {
            return this.$element.value.trim();
        }

        return this.$element.textContent.trim();
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

    find(selector) {
        return $(this.$element.querySelector(selector));
    }

    css(styles = {}) {
        Object.entries(styles).map(
            ([property, value]) => (this.$element.style[property] = value)
        );
    }

    addClass(className) {
        this.$element.classList.add(className);
    }
    removeClass(className) {
        this.$element.classList.remove(className);
    }

    focus() {
        this.$element.focus();
        return this;
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(":");

            return {
                row: +parsed[0],
                col: +parsed[1],
            };
        }

        return this.data.id;
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
